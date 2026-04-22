import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, PenTool, Link2, CheckCircle } from 'lucide-react';

const LOADING_STEPS = [
  { icon: Zap, text: 'Analyzing search intent...', color: '#f59e0b' },
  { icon: Brain, text: 'Scouting top competitors...', color: '#8b5cf6' },
  { icon: PenTool, text: 'Crafting your outline...', color: '#06b6d4' },
  { icon: PenTool, text: 'Writing engaging content...', color: '#22c55e' },
  { icon: Link2, text: 'Building link strategy...', color: '#ec4899' },
  { icon: CheckCircle, text: 'Polishing for publication...', color: '#10b981' },
];

const SkeletonLine: React.FC<{ width?: string; height?: string; delay?: number }> = ({ 
  width = '100%', 
  height = '1rem',
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="skeleton"
    style={{ width, height, marginBottom: '0.75rem' }}
  />
);

export const LoadingView: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % LOADING_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentStep = LOADING_STEPS[step];
  const Icon = currentStep.icon;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Loading Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ 
          padding: '3rem 2rem', 
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        {/* Animated Icon */}
        <motion.div
          key={step}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${currentStep.color}20 0%, ${currentStep.color}10 100%)`,
            border: `1px solid ${currentStep.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Icon size={36} style={{ color: currentStep.color }} />
          </motion.div>
        </motion.div>

        {/* Status Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {currentStep.text}
            </h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
              ContentPilot is working on your article...
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          {LOADING_STEPS.map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: i === step ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === step ? LOADING_STEPS[i].color : 'var(--border-primary)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Skeleton Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel"
        style={{ padding: '2rem', opacity: 0.6 }}
      >
        {/* Skeleton Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1, 2, 3, 4].map(i => (
            <SkeletonLine key={i} width="100px" height="40px" delay={i * 0.1} />
          ))}
        </div>

        {/* Skeleton Content */}
        <SkeletonLine width="70%" height="2rem" delay={0.5} />
        <SkeletonLine width="100%" delay={0.6} />
        <SkeletonLine width="95%" delay={0.7} />
        <SkeletonLine width="98%" delay={0.8} />
        <div style={{ height: '1rem' }} />
        <SkeletonLine width="45%" height="1.5rem" delay={0.9} />
        <SkeletonLine width="100%" delay={1} />
        <SkeletonLine width="92%" delay={1.1} />
      </motion.div>
    </div>
  );
};
