import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, FileText, Globe, Hash } from 'lucide-react';

interface InputFormProps {
  onSubmit: (topic: string, language: string, wordCount: number) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
];

const WORD_COUNT_OPTIONS = [
  { value: 1000, label: 'Short', desc: '~1000 words' },
  { value: 1500, label: 'Medium', desc: '~1500 words' },
  { value: 2000, label: 'Long', desc: '~2000 words' },
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('en');
  const [wordCount, setWordCount] = useState(1500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit(topic, language, wordCount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ maxWidth: '720px', margin: '0 auto' }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span 
            className="badge badge-primary"
            style={{ marginBottom: '1rem', display: 'inline-block' }}
          >
            <Sparkles size={12} style={{ marginRight: '0.25rem' }} />
            AI-Powered Content Generation
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}
        >
          Create <span className="gradient-text">SEO-Optimized</span> Articles
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-tertiary)',
            maxWidth: '500px',
            margin: '0 auto'
          }}
        >
          Enter your topic and let ContentPilot handle the research, writing, and optimization.
        </motion.p>
      </div>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-panel"
        style={{ padding: '2rem' }}
      >
        {/* Topic Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="topic">
            <FileText size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Article Topic or Primary Keyword
          </label>
          <div className="form-input-icon">
            <Search size={18} />
            <input
              id="topic"
              type="text"
              className="form-input"
              placeholder="e.g., Best practices for remote team management"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Language and Word Count Grid */}
        <div className="grid-cols-2" style={{ marginBottom: '1.5rem' }}>
          {/* Language Select */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="language">
              <Globe size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Language
            </label>
            <select
              id="language"
              className="form-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isLoading}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="wordCount">
              <Hash size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Article Length
            </label>
            <select
              id="wordCount"
              className="form-input"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              disabled={isLoading}
            >
              {WORD_COUNT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.desc})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !topic.trim()}
          style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%'
                }}
              />
              Generating Your Article...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Article
            </>
          )}
        </motion.button>

        {/* Feature Tags */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          {['SEO Optimized', 'Human-like Writing', 'FAQ Included', 'Link Strategy'].map((feature, i) => (
            <span 
              key={i}
              style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span style={{ color: 'var(--success)' }}>✓</span>
              {feature}
            </span>
          ))}
        </div>
      </motion.form>
    </motion.div>
  );
};
