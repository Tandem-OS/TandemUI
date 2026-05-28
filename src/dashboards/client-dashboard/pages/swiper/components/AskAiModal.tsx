import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiX, FiSend } from 'react-icons/fi';
import {
  callDesignAssistant,
  type DesignAssistantMessage,
} from '@/lib/requests/SwiperRequest';

// ── Click-outside hook ────────────────────────────────────────────────────────
const useOnClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// ── Typewriter for AI response streaming effect ───────────────────────────────
const Typewriter = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(id);
        onComplete();
      }
    }, 18);
    return () => clearInterval(id);
  }, [text, onComplete]);

  return (
    <>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-3 sm:h-3.5 bg-accent-default ml-xs align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </>
  );
};

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ComponentMeta {
  component_id?: string;
  title?: string;
  category?: string;
  tags?: string[];
  tone?: string[];
  layout_structure?: string;
  description?: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  isTyping?: boolean;
}

interface AskAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: ComponentMeta;
}

// ── Modal inner content ───────────────────────────────────────────────────────
const ModalContent = memo(({ onClose, component }: AskAiModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Conversation history for multi-turn context — sent to backend each call
  const historyRef = useRef<DesignAssistantMessage[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTypingActive, setIsTypingActive] = useState(false);

  useOnClickOutside(modalRef, onClose);

  // Fetch initial analysis when modal opens
  useEffect(() => {
    let cancelled = false;
    historyRef.current = [];

    const fetchInitial = async () => {
      setIsLoading(true);
      try {
        const result = await callDesignAssistant({
          component_id: component.component_id,
          component_title: component.title ?? undefined,
          component_category: component.category ?? undefined,
          component_tags: component.tags,
          component_tone: component.tone,
          component_layout_structure: component.layout_structure ?? undefined,
          component_description: component.description ?? undefined,
          conversation_history: [],
          user_message: 'Analyze this component. What makes it work or not work for a landing page?',
        });

        if (cancelled) return;

        const aiText = result.response ?? '';
        // Record the exchange in history
        historyRef.current = [
          { role: 'user', content: 'Analyze this component. What makes it work or not work for a landing page?' },
          { role: 'assistant', content: aiText },
        ];

        setMessages([{ id: Date.now(), text: aiText, sender: 'ai', isTyping: true }]);
        setIsTypingActive(true);
      } catch {
        if (cancelled) return;
        setMessages([{
          id: Date.now(),
          text: 'Unable to connect to AI assistant right now.',
          sender: 'ai',
          isTyping: false,
        }]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchInitial();
    return () => { cancelled = true; };
  }, [component.component_id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = userInput.trim();
      if (!text || isLoading || isTypingActive) return;

      setUserInput('');

      // Append user message to UI immediately
      const userMsg: Message = { id: Date.now(), text, sender: 'user' };
      setMessages(prev => [...prev, userMsg]);

      // Add to history
      historyRef.current = [...historyRef.current, { role: 'user', content: text }];

      setIsLoading(true);
      try {
        const result = await callDesignAssistant({
          component_id: component.component_id,
          component_title: component.title ?? undefined,
          component_category: component.category ?? undefined,
          component_tags: component.tags,
          component_tone: component.tone,
          component_layout_structure: component.layout_structure ?? undefined,
          component_description: component.description ?? undefined,
          conversation_history: historyRef.current.slice(0, -1), // exclude the user msg just added — backend appends user_message
          user_message: text,
        });

        const aiText = result.response ?? '';
        historyRef.current = [...historyRef.current, { role: 'assistant', content: aiText }];

        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: aiText, sender: 'ai', isTyping: true },
        ]);
        setIsTypingActive(true);
      } catch {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: 'Could not reach AI assistant.', sender: 'ai', isTyping: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [userInput, isLoading, isTypingActive, component]
  );

  const handleTypingComplete = useCallback(() => {
    setIsTypingActive(false);
    // Mark last message as no longer typing
    setMessages(prev =>
      prev.map((m, i) => (i === prev.length - 1 ? { ...m, isTyping: false } : m))
    );
  }, []);

  return (
    <motion.div
      ref={modalRef}
      className="absolute bottom-full mb-sm -left-[220px] w-[85vw] max-w-[300px] sm:w-72 md:left-0 md:translate-x-0 md:w-80 bg-background-primary text-text-primary rounded-lg md:rounded-xl shadow-2xl border border-border-default z-50 flex flex-col"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-sm border-b border-border-default flex-shrink-0">
        <div className="flex items-center gap-sm">
          <FiCpu className="text-accent-default" />
          <h4 className="text-para-sm font-medium">AI Analysis</h4>
        </div>
        <button
          onClick={onClose}
          className="p-xs text-text-tertiary hover:text-text-primary rounded-full transition-colors"
          aria-label="Close"
        >
          <FiX className="text-icon-sm" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-sm md:p-md space-y-md overflow-y-auto h-40 lg:h-56">
        {isLoading && messages.length === 0 && (
          <div className="flex items-center gap-sm">
            <div className="flex-shrink-0 w-6 h-6 bg-accent-subtle text-accent-default rounded-full flex items-center justify-center">
              <FiCpu className="text-para-xs" />
            </div>
            <div className="flex gap-xs items-center p-sm bg-background-secondary rounded-md">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-text-tertiary rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex items-start gap-sm ${msg.sender === 'user' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 w-6 h-6 bg-accent-subtle text-accent-default rounded-full flex items-center justify-center">
                <FiCpu className="text-para-xs" />
              </div>
            )}
            <div
              className={`p-sm rounded-md max-w-[85%] text-para-xs sm:text-para-sm leading-relaxed ${
                msg.sender === 'ai'
                  ? 'bg-background-secondary text-text-secondary'
                  : 'bg-accent-default text-accent-foreground'
              }`}
            >
              {msg.sender === 'ai' && msg.isTyping && index === messages.length - 1 ? (
                <Typewriter text={msg.text} onComplete={handleTypingComplete} />
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-sm border-t border-border-default flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-sm">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Ask a follow-up..."
            disabled={isLoading || isTypingActive}
            className="w-full bg-background-secondary text-text-primary text-para-sm px-sm py-xs rounded-md border border-border-default focus:border-accent-default focus:ring-1 focus:ring-accent-default transition disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!userInput.trim() || isLoading || isTypingActive}
            className="p-sm bg-accent-default text-accent-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <FiSend />
          </button>
        </form>
      </div>

      {/* Tooltip caret */}
      <div className="hidden md:block absolute bottom-[-6px] left-lg w-3 h-3 bg-background-primary border-r border-b border-border-default transform rotate-45" />
    </motion.div>
  );
});

ModalContent.displayName = 'ModalContent';

export const AskAiModal: React.FC<AskAiModalProps> = ({ isOpen, onClose, component }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContent isOpen={isOpen} onClose={onClose} component={component} />
      )}
    </AnimatePresence>
  );
};