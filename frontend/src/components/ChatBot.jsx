import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Constants ──────────────────────────────────────────── */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const QUICK_QUESTIONS = [
  { label: '👋 Tell me about Nandini', message: 'Tell me about Nandini' },
  { label: '💼 Her skills?', message: 'What are Nandini\'s technical skills?' },
  { label: '🚀 Show projects', message: 'Tell me about her projects' },
  { label: '🏆 Achievements?', message: 'What are her key achievements?' },
  { label: '📚 Education', message: 'What is her educational background?' },
  { label: '📬 Contact info', message: 'How can I contact Nandini?' },
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi there! 👋 I'm Nandini's AI assistant. I can tell you all about her skills, projects, experience, and more. What would you like to know?",
  id: 'welcome',
};

/* ─── Utility: generate session ID ──────────────────────── */
const getSessionId = () => {
  let id = sessionStorage.getItem('nandini_chat_session');
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('nandini_chat_session', id);
  }
  return id;
};

/* ─── Typing Dots Animation ──────────────────────────────── */
const TypingIndicator = () => (
  <div className="chat-typing-indicator">
    <span className="chat-typing-dot" style={{ animationDelay: '0ms' }} />
    <span className="chat-typing-dot" style={{ animationDelay: '160ms' }} />
    <span className="chat-typing-dot" style={{ animationDelay: '320ms' }} />
  </div>
);

/* ─── Single Message Bubble ──────────────────────────────── */
const MessageBubble = ({ message, isNew }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`chat-message-row ${isUser ? 'chat-message-row--user' : 'chat-message-row--bot'}`}
      initial={isNew ? { opacity: 0, y: 12, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {!isUser && (
        <div className="chat-avatar chat-avatar--bot" aria-hidden="true">
          <span>🤖</span>
        </div>
      )}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
        {message.content.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < message.content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      {isUser && (
        <div className="chat-avatar chat-avatar--user" aria-hidden="true">
          <span>👤</span>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Main ChatBot Component ─────────────────────────────── */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [sessionId] = useState(getSessionId);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [newMessageIds, setNewMessageIds] = useState(new Set(['welcome']));

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* ── Load chat history on first open ── */
  useEffect(() => {
    if (isOpen && !historyLoaded) {
      setHistoryLoaded(true);
      loadHistory();
    }
  }, [isOpen]);

  /* ── Auto-scroll to bottom ── */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ── Load history from backend ── */
  const loadHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/history/${sessionId}`);
      const data = await res.json();
      if (data.success && data.messages.length > 0) {
        const historyMessages = data.messages.map((m, i) => ({
          ...m,
          id: `history_${i}`,
        }));
        setMessages([WELCOME_MESSAGE, ...historyMessages]);
        setShowQuickQuestions(false);
      }
    } catch {
      // Silently fail — history is a nice-to-have
    }
  };

  /* ── Send message ── */
  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsgId = `user_${Date.now()}`;
    const userMsg = { role: 'user', content: trimmed, id: userMsgId };

    setMessages(prev => [...prev, userMsg]);
    setNewMessageIds(prev => new Set([...prev, userMsgId]));
    setInputValue('');
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, sessionId }),
      });

      const data = await res.json();
      const botMsgId = `bot_${Date.now()}`;
      const botMsg = {
        role: 'assistant',
        content: data.reply || "I couldn't process that. Please try again.",
        id: botMsgId,
      };

      setMessages(prev => [...prev, botMsg]);
      setNewMessageIds(prev => new Set([...prev, botMsgId]));

      // Show notification badge if chat is closed
      if (!isOpen) setHasNewMessage(true);

    } catch {
      const errMsgId = `err_${Date.now()}`;
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Oops! I had trouble connecting. Please check your internet and try again, or reach Nandini at nandinigoel.0207@gmail.com 📬",
          id: errMsgId,
        },
      ]);
      setNewMessageIds(prev => new Set([...prev, errMsgId]));
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isLoading, sessionId, isOpen]);

  /* ── Handle form submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  /* ── Handle Enter key ── */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  /* ── Toggle open/close ── */
  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setHasNewMessage(false);
  };

  return (
    <>
      {/* ── Floating Action Button ── */}
      <motion.button
        className="chat-fab"
        onClick={handleToggle}
        id="chat-fab-btn"
        aria-label="Open AI Chat Assistant"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="chat-fab-icon"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="chat-fab-icon"
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification badge */}
        <AnimatePresence>
          {hasNewMessage && !isOpen && (
            <motion.span
              className="chat-fab-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Ripple glow ring */}
        <span className="chat-fab-ring" aria-hidden="true" />
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            id="chat-window"
            role="dialog"
            aria-label="Nandini's AI Chat Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Header ── */}
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-header-avatar">
                  <span>🤖</span>
                  <span className="chat-online-dot" aria-hidden="true" />
                </div>
                <div className="chat-header-info">
                  <span className="chat-header-name">Nandini's Assistant</span>
                  <span className="chat-header-status">● Online — Always here to help</span>
                </div>
              </div>
              <button
                className="chat-header-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="chat-messages" id="chat-messages-container" role="log" aria-live="polite">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id || `${msg.role}_${msg.content.slice(0, 10)}`}
                  message={msg}
                  isNew={newMessageIds.has(msg.id)}
                />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="chat-message-row chat-message-row--bot"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="chat-avatar chat-avatar--bot">
                      <span>🤖</span>
                    </div>
                    <div className="chat-bubble chat-bubble--bot">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Questions ── */}
            <AnimatePresence>
              {showQuickQuestions && (
                <motion.div
                  className="chat-quick-questions"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="chat-quick-title">Quick questions:</p>
                  <div className="chat-quick-grid">
                    {QUICK_QUESTIONS.map((q, i) => (
                      <motion.button
                        key={q.message}
                        className="chat-quick-btn"
                        onClick={() => sendMessage(q.message)}
                        id={`chat-quick-${i}`}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        {q.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Area ── */}
            <form className="chat-input-area" onSubmit={handleSubmit} id="chat-input-form">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                id="chat-input-field"
                placeholder="Ask me about Nandini..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                maxLength={1000}
                aria-label="Chat message input"
                autoComplete="off"
              />
              <motion.button
                type="submit"
                className="chat-send-btn"
                id="chat-send-btn"
                disabled={isLoading || !inputValue.trim()}
                whileHover={!isLoading && inputValue.trim() ? { scale: 1.08 } : {}}
                whileTap={!isLoading && inputValue.trim() ? { scale: 0.94 } : {}}
                aria-label="Send message"
              >
                {isLoading ? (
                  <span className="chat-send-spinner" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </motion.button>
            </form>

            {/* ── Footer ── */}
            <div className="chat-footer">
              <span>Powered by OpenAI · Nandini's Personal AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
