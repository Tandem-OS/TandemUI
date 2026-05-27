import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { FiSend, FiCheck, FiAlertCircle, FiChevronDown } from 'react-icons/fi';

// ─── Types ────────────────────────────────────────────────────────────────────

type SupportType = 'bug' | 'billing' | 'project' | 'account' | 'other';
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

interface SupportFormData {
  subject: string;
  message: string;
  type: SupportType | '';
}

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPPORT_EMAIL = 'support@trytandem.io';

const SUPPORT_TYPES: { id: SupportType; label: string }[] = [
  { id: 'bug',     label: 'Bug report'    },
  { id: 'billing', label: 'Billing'       },
  { id: 'project', label: 'Project help'  },
  { id: 'account', label: 'Account'       },
  { id: 'other',   label: 'Other'         },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getBrowserInfo = (): string => {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  return `${ua} · ${isMobile ? 'Mobile' : 'Desktop'}`;
};

const buildEmailBody = (
  data: SupportFormData,
  context: {
    userName: string;
    userEmail: string;
    role: string;
    projectName: string;
    projectId: string;
    pageUrl: string;
    timestamp: string;
    browserInfo: string;
  }
): string => {
  return `
${data.message}

──────────────────────────────
SUPPORT CONTEXT
──────────────────────────────
Name:        ${context.userName}
Email:       ${context.userEmail}
Role:        ${context.role}
Type:        ${data.type || 'Not specified'}
Project:     ${context.projectName || 'N/A'}
Project ID:  ${context.projectId || 'N/A'}
Page:        ${context.pageUrl}
Time:        ${context.timestamp}
Device:      ${context.browserInfo}
──────────────────────────────
  `.trim();
};

// ─── Component ────────────────────────────────────────────────────────────────

const SupportPage: React.FC = () => {
  const userName    = useSelector((state: RootState) => state.auth.user?.name)    ?? 'Unknown';
  const userEmail   = useSelector((state: RootState) => state.auth.user?.email)   ?? '';
  const userRole    = useSelector((state: RootState) => state.auth.user?.role)    ?? 'client';
  const projectId   = useSelector((state: RootState) => state.project?.projectId) ?? '';
  const projectName = '';  // populated via API if needed — ProjectState has no name field

  const [form, setForm] = useState<SupportFormData>({
    subject: '',
    message: '',
    type: '',
  });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [typeOpen, setTypeOpen] = useState(false);

  const isValid = form.subject.trim().length > 0 && form.message.trim().length > 0;

  const updateForm = (field: keyof SupportFormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!isValid || submitState === 'loading') return;
    setSubmitState('loading');

    const context = {
      userName,
      userEmail,
      role: userRole,
      projectName,
      projectId,
      pageUrl:     window.location.href,
      timestamp:   new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      browserInfo: getBrowserInfo(),
    };

    const body    = buildEmailBody(form, context);
    const subject = encodeURIComponent(`[Tandem Support] ${form.subject}`);
    const bodyEnc = encodeURIComponent(body);
    const replyTo = encodeURIComponent(userEmail);

    // mailto fallback — replace with API call when backend endpoint is ready
    // e.g. await api.post('/support/send', { subject: form.subject, body, reply_to: userEmail })
    try {
      const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${bodyEnc}&reply-to=${replyTo}`;
      window.location.href = mailtoUrl;

      // Brief delay then show success
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const handleReset = () => {
    setForm({ subject: '', message: '', type: '' });
    setSubmitState('idle');
  };

  const selectedTypeLabel = SUPPORT_TYPES.find(t => t.id === form.type)?.label ?? '';

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container mx-auto px-md sm:px-lg py-xl sm:py-2xl max-w-2xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2xl"
        >
          <div className="flex items-center gap-xs mb-md">
            <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">
              Tandem
            </span>
            <span className="text-text-tertiary text-para-xs">·</span>
            <span className="text-para-xs text-text-secondary font-medium">Support</span>
          </div>
          <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary leading-tight mb-sm">
            How can we help?
          </h1>
          <p className="text-para-md text-text-secondary leading-relaxed">
            Send us a message and we'll get back to you within 4 hours.
          </p>
        </motion.div>

        {/* Success state */}
        <AnimatePresence mode="wait">
          {submitState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="bg-background-primary-2 rounded-2xl border border-border-default p-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-lg"
              >
                <FiCheck className="text-emerald-500 text-icon-xl" />
              </motion.div>
              <h2 className="text-h4-sm font-bold text-text-primary mb-sm">Message sent.</h2>
              <p className="text-para-md text-text-secondary mb-xl">
                We'll get back to you soon at <span className="font-medium text-text-primary">{userEmail}</span>.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="px-lg py-sm rounded-xl border border-border-default bg-background-secondary hover:bg-background-muted text-text-secondary hover:text-text-primary text-btn-sm font-medium transition-all"
              >
                Send another message
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-background-primary-2 rounded-2xl border border-border-default p-xl sm:p-2xl space-y-lg"
            >

              {/* Auto-populated context strip */}
              <div className="flex flex-wrap items-center gap-sm p-md rounded-xl bg-background-muted border border-border-muted">
                <span className="text-para-xs text-text-tertiary">Sending as</span>
                <span className="text-para-xs font-medium text-text-secondary">{userName}</span>
                <span className="text-para-xs text-text-tertiary">·</span>
                <span className="text-para-xs font-medium text-text-secondary capitalize">{userRole}</span>
                {projectName && (
                  <>
                    <span className="text-para-xs text-text-tertiary">·</span>
                    <span className="text-para-xs font-medium text-text-secondary truncate max-w-[140px]">{projectName}</span>
                  </>
                )}
              </div>

              {/* Support type dropdown */}
              <div>
                <label className="block text-para-sm font-medium text-text-primary mb-sm">
                  Type <span className="text-text-tertiary font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTypeOpen(o => !o)}
                    className="w-full flex items-center justify-between px-md py-sm bg-background-secondary border border-border-default rounded-xl text-para-sm transition-all hover:border-border-focus focus:outline-none focus:ring-2 focus:ring-accent-default"
                  >
                    <span className={selectedTypeLabel ? 'text-text-primary' : 'text-text-tertiary'}>
                      {selectedTypeLabel || 'Select a type...'}
                    </span>
                    <motion.div animate={{ rotate: typeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown className="text-text-tertiary text-icon-sm" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {typeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-xs bg-background-primary border border-border-default rounded-xl shadow-lg z-10 overflow-hidden"
                      >
                        {SUPPORT_TYPES.map((type, i) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              updateForm('type', type.id);
                              setTypeOpen(false);
                            }}
                            className={`w-full text-left px-md py-sm text-para-sm transition-colors hover:bg-background-muted ${
                              form.type === type.id
                                ? 'text-accent-default font-medium bg-accent-subtle'
                                : 'text-text-primary'
                            } ${i !== 0 ? 'border-t border-border-muted' : ''}`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-para-sm font-medium text-text-primary mb-sm">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => updateForm('subject', e.target.value)}
                  placeholder="e.g. Scraper not loading on my project"
                  className="w-full px-md py-sm bg-background-secondary border border-border-default rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-accent-default transition-all text-para-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-para-sm font-medium text-text-primary mb-sm">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => updateForm('message', e.target.value)}
                  placeholder="Describe your issue or question in as much detail as possible..."
                  rows={6}
                  className="w-full px-md py-sm bg-background-secondary border border-border-default rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-accent-default transition-all text-para-sm resize-none"
                />
                <div className="flex justify-end mt-xs">
                  <span className={`text-para-xs ${form.message.length > 2000 ? 'text-red-500' : 'text-text-tertiary'}`}>
                    {form.message.length}/2000
                  </span>
                </div>
              </div>

              {/* What gets sent info */}
              <div className="p-md rounded-xl bg-background-muted border border-border-muted">
                <p className="text-para-xs text-text-tertiary mb-xs font-medium uppercase tracking-wide">Automatically included</p>
                <div className="flex flex-wrap gap-xs">
                  {['Your name & email', 'Account role', projectName ? 'Project name' : null, 'Page URL', 'Timestamp', 'Device info'].filter(Boolean).map(item => (
                    <span key={item!} className="px-xs py-xs rounded-md bg-background-secondary border border-border-muted text-para-xs text-text-secondary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Error state */}
              <AnimatePresence>
                {submitState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-sm p-md rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-para-sm"
                  >
                    <FiAlertCircle className="text-icon-sm flex-shrink-0" />
                    Something went wrong. Please try again or email us directly at {SUPPORT_EMAIL}.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                whileHover={isValid && submitState !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={isValid && submitState !== 'loading' ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={!isValid || submitState === 'loading'}
                className="w-full flex items-center justify-center gap-sm px-lg py-md rounded-xl bg-accent-default hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground text-btn-md font-semibold transition-all shadow-sm"
              >
                {submitState === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="text-icon-sm" />
                    Send message
                  </>
                )}
              </motion.button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-para-xs text-text-tertiary mt-xl"
        >
          You can also reach us directly at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent-default hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </motion.p>

      </div>
    </div>
  );
};

export default SupportPage;