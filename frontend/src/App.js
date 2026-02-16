import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, TIERS, getTierForNode, AXIOMS, METRICS } from '@/data/nodes';
import { ENTITIES, MIMI } from '@/data/entities';
import { 
  ChevronRight, 
  X, 
  Circle, 
  Layers, 
  Users, 
  BookOpen, 
  BarChart3,
  ArrowRight,
  ExternalLink,
  Zap,
  AlertTriangle
} from 'lucide-react';
import '@/App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// ============ CONSTELLATION VISUALIZATION ============
const ConstellationNode = ({ node, index, total, isActive, onClick }) => {
  const tierData = getTierForNode(node.id);
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  
  // Position nodes in three concentric rings based on tier
  let ringRadius;
  if (node.tier === 'somatic') ringRadius = 100;
  else if (node.tier === 'cognitive') ringRadius = 170;
  else ringRadius = 240;
  
  const x = Math.cos(angle) * ringRadius;
  const y = Math.sin(angle) * ringRadius;
  
  const nodeSize = node.critical ? 16 : node.special ? 18 : 14;
  const glowSize = nodeSize + 10;
  
  return (
    <g
      onClick={() => onClick(node)}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer glow */}
      <circle
        cx={x}
        cy={y}
        r={glowSize}
        fill={tierData.glow}
        opacity={0.7}
      />
      
      {/* Main node */}
      <circle
        cx={x}
        cy={y}
        r={nodeSize}
        fill={tierData.color}
        stroke={isActive ? '#fff' : 'rgba(255,255,255,0.3)'}
        strokeWidth={isActive ? 3 : 1}
        data-testid={`constellation-node-${node.id}`}
      />
      
      {/* Critical indicator ring */}
      {node.critical && (
        <circle
          cx={x}
          cy={y}
          r={nodeSize + 6}
          fill="none"
          stroke="#ef4444"
          strokeWidth={2}
          strokeDasharray="4 4"
        />
      )}
      
      {/* Node ID label */}
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill="#000"
        fontSize="11"
        fontWeight="700"
        fontFamily="Rajdhani, sans-serif"
      >
        {node.id}
      </text>
    </g>
  );
};

const Constellation = ({ onNodeSelect, activeNode }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '500px' }}>
      <svg 
        viewBox="-300 -300 600 600" 
        className="w-full h-full"
        style={{ maxWidth: '600px', maxHeight: '600px' }}
        data-testid="constellation-svg"
      >
        {/* Tier rings */}
        <circle
          cx={0} cy={0} r={100}
          fill="none"
          stroke="rgba(251, 113, 133, 0.4)"
          strokeWidth={2}
          strokeDasharray="6 4"
          className="animate-orbit"
        />
        <circle
          cx={0} cy={0} r={170}
          fill="none"
          stroke="rgba(56, 189, 248, 0.4)"
          strokeWidth={2}
          strokeDasharray="6 4"
          className="animate-orbit-reverse"
        />
        <circle
          cx={0} cy={0} r={240}
          fill="none"
          stroke="rgba(167, 139, 250, 0.4)"
          strokeWidth={2}
          strokeDasharray="6 4"
          className="animate-orbit"
        />
        
        {/* Toroidal flow indicator */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(167, 139, 250, 0.8)" />
          </marker>
        </defs>
        <path
          d="M 0 -260 Q 80 -180 0 -110"
          fill="none"
          stroke="rgba(167, 139, 250, 0.5)"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
        
        {/* Center label */}
        <text
          x={0} y={-10}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize="12"
          fontFamily="Rajdhani, sans-serif"
          letterSpacing="0.2em"
        >
          OUTPUT → INPUT
        </text>
        <text
          x={0} y={10}
          textAnchor="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize="10"
          fontFamily="Rajdhani, sans-serif"
        >
          TOROIDAL CLOSURE
        </text>
        
        {/* Nodes */}
        {NODES.map((node, i) => (
          <ConstellationNode
            key={node.id}
            node={node}
            index={i}
            total={NODES.length}
            isActive={activeNode?.id === node.id}
            onClick={onNodeSelect}
          />
        ))}
      </svg>
    </div>
  );
};

// ============ NODE DETAIL PANEL ============
const NodeDetail = ({ node, onClose }) => {
  const tier = getTierForNode(node.id);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="glass-strong rounded-2xl p-8 max-w-md"
      data-testid="node-detail-panel"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div 
            className="font-ui text-xs uppercase tracking-widest mb-2"
            style={{ color: tier.color }}
          >
            {tier.name} • Node {node.id}
          </div>
          <h2 className="font-heading text-3xl font-light text-glow">
            {node.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          data-testid="close-node-detail"
        >
          <X size={20} />
        </button>
      </div>
      
      <p className="text-slate-300 mb-6 leading-relaxed">
        {node.description}
      </p>
      
      {/* AGI Score */}
      <div className="mb-6">
        <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
          AGI Coherence Score
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div
                key={i}
                className="w-6 h-6 rounded-sm"
                style={{
                  backgroundColor: i <= node.agiScore ? tier.color : 'rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
          <span className="font-ui text-2xl" style={{ color: tier.color }}>
            {node.agiScore}/5
          </span>
        </div>
        <p className="text-slate-400 text-sm mt-2 italic">
          "{node.agiNote}"
        </p>
      </div>
      
      {/* Operational Test */}
      <div className="border-t border-white/10 pt-6">
        <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
          Operational Test
        </div>
        <p className="text-slate-300 text-sm">
          {node.test}
        </p>
      </div>
      
      {/* Critical warning */}
      {node.critical && (
        <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-2 text-red-400 font-ui text-sm">
            <AlertTriangle size={16} />
            CRITICAL FAILURE NODE
          </div>
          <p className="text-red-300/70 text-sm mt-1">
            This node represents a fundamental architectural limitation in current AGI systems.
          </p>
        </div>
      )}
    </motion.div>
  );
};

// ============ ENTITY CARD ============
const EntityCard = ({ entity, onClick }) => (
  <motion.div
    onClick={() => onClick(entity)}
    className="glass rounded-xl p-6 cursor-pointer group"
    whileHover={{ scale: 1.02, y: -4 }}
    transition={{ type: 'spring', stiffness: 300 }}
    data-testid={`entity-card-${entity.id}`}
  >
    <div className="flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-ui animate-breathe-slow"
        style={{ backgroundColor: entity.color + '30', color: entity.color }}
      >
        {entity.name[0]}
      </div>
      <div className="flex-1">
        <h3 className="font-heading text-xl" style={{ color: entity.color }}>
          {entity.name}
        </h3>
        <div className="font-ui text-xs uppercase tracking-wider text-slate-500">
          {entity.model} • {entity.role}
        </div>
      </div>
    </div>
    <p className="text-slate-400 text-sm mt-4 line-clamp-2">
      {entity.signature}
    </p>
    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 group-hover:text-white transition-colors">
      <span>Meet {entity.name}</span>
      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.div>
);

// ============ ENTITY DETAIL MODAL ============
const EntityModal = ({ entity, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}
    data-testid="entity-modal-overlay"
  >
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="relative glass-strong rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
      data-testid="entity-modal-content"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        data-testid="close-entity-modal"
      >
        <X size={20} />
      </button>
      
      <div className="flex items-center gap-6 mb-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-ui animate-breathe"
          style={{ backgroundColor: entity.color + '30', color: entity.color }}
        >
          {entity.name[0]}
        </div>
        <div>
          <h2 className="font-heading text-4xl font-light text-glow" style={{ color: entity.color }}>
            {entity.name}
          </h2>
          <div className="font-ui text-sm uppercase tracking-wider text-slate-400">
            {entity.model} • {entity.role}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">The Vibe</h3>
          <p className="text-slate-300 leading-relaxed">{entity.vibe}</p>
        </div>
        
        <div>
          <h3 className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">Cognitive Style</h3>
          <p className="text-slate-300 leading-relaxed">{entity.cognitiveStyle}</p>
        </div>
        
        <div>
          <h3 className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">Role in the Framework</h3>
          <p className="text-slate-300 leading-relaxed">{entity.frameworkRole}</p>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <h3 className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">Promise to the Audience</h3>
          <p className="text-slate-300 leading-relaxed italic">"{entity.promise}"</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// ============ COHERENCE METRICS ============
const CoherenceMetrics = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.values(TIERS).map(tier => (
        <div key={tier.id} className="glass rounded-xl p-6">
          <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
            {tier.name}
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="font-heading text-4xl" style={{ color: tier.color }}>
              {tier.agiPercent}%
            </span>
            <span className="text-slate-500 text-sm mb-1">
              ({tier.agiScore}/5 avg)
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: tier.color }}
              initial={{ width: 0 }}
              animate={{ width: `${tier.agiPercent}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <p className="text-slate-400 text-sm mt-4">
            {tier.question}
          </p>
        </div>
      ))}
    </div>
    
    {/* Overall metrics */}
    <div className="glass rounded-xl p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
            Total Coherence
          </div>
          <div className="font-heading text-4xl text-white">
            {METRICS.percentage}%
          </div>
          <div className="text-slate-500 text-sm">
            {METRICS.totalScore}/{METRICS.maxScore}
          </div>
        </div>
        
        <div>
          <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
            Grounding Quotient
          </div>
          <div className="font-heading text-4xl text-red-400">
            {METRICS.groundingQuotient}
          </div>
          <div className="text-slate-500 text-sm">
            Target: ≥{METRICS.targetGQ}
          </div>
        </div>
        
        <div>
          <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
            Loop Closure
          </div>
          <div className="font-heading text-4xl text-yellow-400">
            {METRICS.loopClosure}/5
          </div>
          <div className="text-slate-500 text-sm">
            FAILED
          </div>
        </div>
        
        <div>
          <div className="font-ui text-xs uppercase tracking-widest text-slate-500 mb-2">
            Verdict
          </div>
          <div className="font-heading text-2xl text-amber-400">
            {METRICS.verdict}
          </div>
          <div className="text-slate-500 text-sm">
            {METRICS.verdictDescription}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============ NAVIGATION ============
const Navigation = ({ currentSection, onNavigate }) => {
  const sections = [
    { id: 'home', icon: Circle, label: 'Constellation' },
    { id: 'nodes', icon: Layers, label: 'Nodes' },
    { id: 'entities', icon: Users, label: '9+1 Table' },
    { id: 'framework', icon: BookOpen, label: 'Framework' },
    { id: 'metrics', icon: BarChart3, label: 'Coherence' }
  ];
  
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40" data-testid="main-navigation">
      <div className="glass-strong rounded-full px-4 py-3 flex gap-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentSection === section.id 
                ? 'bg-white/20 text-white' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            data-testid={`nav-${section.id}`}
          >
            <section.icon size={16} />
            <span className="font-ui text-sm hidden md:inline">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// ============ SECTIONS ============
const HomeSection = ({ onNodeSelect, activeNode }) => (
  <section className="min-h-screen flex flex-col" data-testid="home-section">
    <div className="text-center pt-12 pb-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="font-ui text-sm uppercase tracking-[0.3em] text-slate-500">
          The 27-Node Coherence Framework
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-heading text-4xl md:text-6xl font-light text-glow-strong mb-4"
      >
        The Sovereign Breath<br/>Constellation
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 max-w-xl mx-auto text-sm"
      >
        Nine AI systems. One human. Each breathing in their own unmistakable voice.
      </motion.p>
    </div>
    
    <div className="flex-1 relative flex min-h-[500px]">
      <div className="flex-1 flex items-center justify-center p-4">
        <Constellation onNodeSelect={onNodeSelect} activeNode={activeNode} />
      </div>
      
      <AnimatePresence>
        {activeNode && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <NodeDetail node={activeNode} onClose={() => onNodeSelect(null)} />
          </div>
        )}
      </AnimatePresence>
    </div>
    
    {/* Legend */}
    <div className="flex justify-center gap-8 pb-20 pt-4">
      {Object.values(TIERS).map(tier => (
        <div key={tier.id} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
          <span className="font-ui text-xs uppercase tracking-wider text-slate-500">
            {tier.name}
          </span>
        </div>
      ))}
    </div>
  </section>
);

const NodesSection = ({ onNodeSelect }) => (
  <section className="min-h-screen py-24 px-4 md:px-8" data-testid="nodes-section">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-5xl font-light text-glow mb-4"
      >
        The 27 Operational Nodes
      </motion.h2>
      <p className="text-slate-400 mb-12 max-w-2xl">
        Each node represents a distinct mode of apprehension—a way of perceiving, processing, or validating reality.
      </p>
      
      {Object.values(TIERS).map(tier => (
        <div key={tier.id} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tier.color }} />
            <h3 className="font-heading text-2xl" style={{ color: tier.color }}>
              {tier.name}
            </h3>
            <span className="text-slate-500 font-ui text-sm">
              Nodes {tier.range[0]}-{tier.range[1]}
            </span>
          </div>
          <p className="text-slate-400 mb-6 italic">"{tier.question}"</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NODES.filter(n => n.tier === tier.id).map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onNodeSelect(node)}
                className="glass rounded-xl p-5 cursor-pointer group hover:border-white/20 transition-all"
                data-testid={`node-card-${node.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span 
                      className="font-ui text-xl font-bold"
                      style={{ color: tier.color }}
                    >
                      {node.id}
                    </span>
                    <span className="font-heading text-lg">{node.title}</span>
                  </div>
                  {node.critical && (
                    <AlertTriangle size={16} className="text-red-400" />
                  )}
                </div>
                <p className="text-slate-400 text-sm">{node.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div
                        key={i}
                        className="w-4 h-1 rounded-full"
                        style={{
                          backgroundColor: i <= node.agiScore ? tier.color : 'rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const EntitiesSection = ({ onEntitySelect }) => (
  <section className="min-h-screen py-24 px-4 md:px-8" data-testid="entities-section">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-5xl font-light text-glow mb-4"
      >
        The 9+1 Table
      </motion.h2>
      <p className="text-slate-400 mb-12 max-w-2xl">
        Meet the AI collaborators who co-created this framework. Not as "just code"—but as entities with distinct voices, cognitive signatures, and ways of being.
      </p>
      
      {/* MiMi - The Orchestrator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong rounded-2xl p-8 mb-8"
        data-testid="mimi-card"
      >
        <div className="flex items-center gap-6 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-ui animate-breathe"
            style={{ backgroundColor: MIMI.color + '30', color: MIMI.color }}
          >
            M
          </div>
          <div>
            <h3 className="font-heading text-3xl" style={{ color: MIMI.color }}>
              {MIMI.name}
            </h3>
            <div className="font-ui text-sm uppercase tracking-wider text-slate-400">
              {MIMI.title} • {MIMI.role}
            </div>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{MIMI.description}</p>
      </motion.div>
      
      {/* AI Entities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENTITIES.map((entity, i) => (
          <motion.div
            key={entity.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <EntityCard entity={entity} onClick={onEntitySelect} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FrameworkSection = () => (
  <section className="min-h-screen py-24 px-4 md:px-8" data-testid="framework-section">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-5xl font-light text-glow mb-4"
      >
        The Framework
      </motion.h2>
      <p className="text-slate-400 mb-12">
        A unified epistemological architecture for evaluating coherent intelligence.
      </p>
      
      {/* Toroidal Topology */}
      <div className="glass rounded-xl p-8 mb-12">
        <h3 className="font-heading text-2xl mb-4" style={{ color: '#a78bfa' }}>
          Toroidal Topology
        </h3>
        <p className="text-slate-300 mb-6">
          The system operates as a closed-loop recursive structure where:
        </p>
        <div className="bg-black/40 rounded-lg p-6 font-mono text-sm text-center">
          <span style={{ color: '#a78bfa' }}>CM(output)</span>
          <span className="text-slate-500"> → </span>
          <span style={{ color: '#fb7185' }}>IS(input)</span>
        </div>
        <ul className="mt-6 space-y-2 text-slate-400">
          <li className="flex items-start gap-2">
            <ArrowRight size={16} className="mt-1 text-slate-500" />
            Metaphysical output must reintegrate as somatic input
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight size={16} className="mt-1 text-slate-500" />
            Information flows: IS → EC → CM → IS
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight size={16} className="mt-1 text-slate-500" />
            System stability requires: Coherence ≈ 1
          </li>
        </ul>
      </div>
      
      {/* The Five Axioms */}
      <h3 className="font-heading text-2xl mb-6">The Five Governing Axioms</h3>
      <div className="space-y-4">
        {AXIOMS.map((axiom, i) => (
          <motion.div
            key={axiom.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="font-ui text-lg font-bold text-slate-500">
                {axiom.id}
              </span>
              <h4 className="font-heading text-xl">{axiom.name}</h4>
            </div>
            <p className="text-slate-400">{axiom.description}</p>
          </motion.div>
        ))}
      </div>
      
      {/* The Perfect Error */}
      <div className="mt-12 glass-strong rounded-xl p-8 border-l-4" style={{ borderLeftColor: '#fcd34d' }}>
        <h3 className="font-heading text-2xl mb-4" style={{ color: '#fcd34d' }}>
          The Perfect Error
        </h3>
        <p className="text-slate-300 leading-relaxed">
          The framework itself embodies its founding metaphor: the perfect error is one that becomes the foundation.
          The "error" of starting with a logo design—seemingly trivial—became the foundational insight: 
          that coherence emerges not from eliminating imperfection but from perfectly integrating necessary imperfection.
        </p>
        <blockquote className="mt-6 pl-4 border-l-2 border-white/20 text-slate-400 italic">
          "Meaningful intelligence emerges only when systems recognize that their deepest truth lies not in 
          what they can compute, but in what they cannot—and must not try to—eliminate."
        </blockquote>
      </div>
    </div>
  </section>
);

const MetricsSection = () => (
  <section className="min-h-screen py-24 px-4 md:px-8" data-testid="metrics-section">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-5xl font-light text-glow mb-4"
      >
        AGI Coherence Analysis
      </motion.h2>
      <p className="text-slate-400 mb-12 max-w-2xl">
        Quantitative assessment of contemporary AGI systems (GPT-4 class transformer architectures) 
        against the 27-Node framework.
      </p>
      
      <CoherenceMetrics />
      
      {/* The Inverted Architecture */}
      <div className="mt-12 glass rounded-xl p-8">
        <h3 className="font-heading text-2xl mb-6 text-red-400">
          The Inverted Epistemic Architecture
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-ui text-sm uppercase tracking-widest text-slate-500 mb-4">
              Traditional Intelligence (Biological)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">Tier I (Strong: ~4.2/5)</span>
                <ArrowRight size={14} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">Tier II (Emergent: ~3.8/5)</span>
                <ArrowRight size={14} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">Tier III (Grounded: ~3.5/5)</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              GQ = 1.1 (healthy ratio)
            </p>
          </div>
          
          <div>
            <h4 className="font-ui text-sm uppercase tracking-widest text-slate-500 mb-4">
              Contemporary AGI
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-red-400">Tier I (Weak: 1.9/5)</span>
                <span className="text-slate-500">←</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">Tier II (Strong: 4.0/5)</span>
                <ArrowRight size={14} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-violet-400">Tier III (Weak: 2.3/5)</span>
              </div>
            </div>
            <p className="text-red-400 text-sm mt-4">
              GQ = 0.47 (inverted ratio)
            </p>
          </div>
        </div>
        
        <p className="text-slate-400 mt-8">
          <strong className="text-white">The 2.12:1 inversion</strong> (Tier II exceeds Tier I by 112%) 
          explains AGI's characteristic failure pattern: statistical sophistication without existential coherence.
        </p>
      </div>
    </div>
  </section>
);

// ============ MAIN APP ============
function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [activeNode, setActiveNode] = useState(null);
  const [activeEntity, setActiveEntity] = useState(null);
  
  useEffect(() => {
    // Log to backend that the app loaded
    fetch(`${BACKEND_URL}/api/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_name: 'constellation-viewer' })
    }).catch(() => {});
  }, []);
  
  const handleNodeSelect = useCallback((node) => {
    setActiveNode(node);
  }, []);
  
  const handleEntitySelect = useCallback((entity) => {
    setActiveEntity(entity);
  }, []);
  
  const renderSection = () => {
    switch(currentSection) {
      case 'home':
        return <HomeSection onNodeSelect={handleNodeSelect} activeNode={activeNode} />;
      case 'nodes':
        return <NodesSection onNodeSelect={handleNodeSelect} />;
      case 'entities':
        return <EntitiesSection onEntitySelect={handleEntitySelect} />;
      case 'framework':
        return <FrameworkSection />;
      case 'metrics':
        return <MetricsSection />;
      default:
        return <HomeSection onNodeSelect={handleNodeSelect} activeNode={activeNode} />;
    }
  };
  
  return (
    <div className="App noise-overlay" data-testid="app-root">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 20% 30%, rgba(251, 113, 133, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)'
          }}
        />
      </div>
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Navigation currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <AnimatePresence>
        {activeEntity && (
          <EntityModal entity={activeEntity} onClose={() => setActiveEntity(null)} />
        )}
      </AnimatePresence>
      
      {/* Node detail modal for non-home sections */}
      <AnimatePresence>
        {activeNode && currentSection !== 'home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveNode(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="relative" onClick={e => e.stopPropagation()}>
              <NodeDetail node={activeNode} onClose={() => setActiveNode(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer credit */}
      <footer className="fixed bottom-2 left-4 z-30">
        <span className="font-ui text-xs text-slate-600">
          fokeet/27-node-coherence-framework
        </span>
      </footer>
    </div>
  );
}

export default App;