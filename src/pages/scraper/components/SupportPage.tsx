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

interface FieldError {
  subject?: string;
  message?: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPPORT_EMAIL = 'support@trytandem.io';

const SUPPORT_TYPES: { id: SupportType; label: string }[] = [
  { id: 'bug',     label: 'Bug report'   },
  { id: 'billing', label: 'Billing'      },
  { id: 'project', label: 'Project help' },
  { id: 'account', label: 'Account'      },
  { id: 'other',   label: 'Other'        },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getBrowserInfo = (): string => {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  return `${ua} · ${isMobile ? 'Mobile' : 'Desktop'}`;
};

const buildEmailBody = (
  data: SupportFormData,
  ctx: {
    userName: string;
    userEmail: string;
    role: string;
    projectName: string;
    projectId: string;
    pageUrl: string;
    timestamp: string;
    browserInfo: string;
  }
): string => `${data.message}

──────────────────────────────
SUPPORT CONTEXT
──────────────────────────────
Name:        ${ctx.userName}
Email:       ${ctx.userEmail}
Role:        ${ctx.role}
Type:        ${data.type || 'Not specified'}
Project:     ${ctx.projectName || 'N/A'}
Project ID:  ${ctx.projectId  || 'N/A'}
Page:        ${ctx.pageUrl}
Time:        ${ctx.timestamp}
Device:      ${ctx.browserInfo}
──────────────────────────────`.trim();

// ─── Identity pill ────────────────────────────────────────────────────────────

const IdentityPill: React.FC<{
  userName: string;
  userEmail: string;
  role: string;
  projectName: string;
}> = ({ userName, userEmail, role, projectName }) => (
  <div className="flex items-center gap-md p-md rounded-xl bg-background-muted border border-border-muted">
    <div className="w-9 h-9 rounded-full bg-accent-default flex items-center justify-center flex-shrink-0">
      <span className="text-accent-foreground text-para-sm font-semibold">
        {userName.charAt(0).toUpperCase()}
      </span>
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-para-sm font-semibold text-text-primary truncate">{userName}</p>
      <div className="flex items-center gap-xs flex-wrap">
        <span className="text-para-xs text-text-tertiary truncate">{userEmail}</span>
        <span className="text-para-xs text-text-tertiary">·</span>
        <span className="text-para-xs text-text-secondary capitalize">{role}</span>
        {projectName && (
          <>
            <span className="text-para-xs text-text-tertiary">·</span>
            <span className="text-para-xs text-text-secondary truncate max-w-[120px]">{projectName}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const SupportPage: React.FC = () => {
  const userName  = useSelector((state: RootState) => state.auth.user?.name)    ?? 'Unknown';
  const userEmail = useSelector((state: RootState) => state.auth.user?.email)   ?? '';
  const userRole  = useSelector((state: RootState) => state.auth.user?.role)    ?? 'client';
  const projectId = useSelector((state: RootState) => state.project?.projectId) ?? '';
  const projectName = '';

  const [form, setForm]               = useState<SupportFormData>({ subject: '', message: '', type: '' });
  const [errors, setErrors]           = useState<FieldError>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [typeOpen, setTypeOpen]       = useState(false);
  const [focused, setFocused]         = useState<string | null>(null);

  const updateForm = (field: keyof SupportFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldError]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FieldError = {};
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isFormFilled = form.subject.trim().length > 0 && form.message.trim().length > 0;

  const handleSubmit = async () => {
    if (!validate() || submitState === 'loading') return;
    setSubmitState('loading');

    const ctx = {
      userName,
      userEmail,
      role:        userRole,
      projectName,
      projectId,
      pageUrl:     window.location.href,
      timestamp:   new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      browserInfo: getBrowserInfo(),
    };

    const body    = buildEmailBody(form, ctx);
    const subject = encodeURIComponent(`[Tandem Support] ${form.subject}`);
    const bodyEnc = encodeURIComponent(body);

    // Replace with: await api.post('/support/send', { subject: form.subject, body, reply_to: userEmail })
    try {
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${bodyEnc}`;
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const handleReset = () => {
    setForm({ subject: '', message: '', type: '' });
    setErrors({});
    setSubmitState('idle');
  };

  const selectedTypeLabel = SUPPORT_TYPES.find(t => t.id === form.type)?.label ?? '';

  const inputClass = (field: string, hasError: boolean) =>
    `w-full px-md py-sm bg-background-secondary border rounded-xl text-text-primary placeholder-text-tertiary outline-none transition-all duration-200 text-para-sm ${
      hasError
        ? 'border-red-500 ring-2 ring-red-500/20'
        : focused === field
          ? 'border-accent-default ring-2 ring-accent-default/20'
          : 'border-border-default hover:border-border-focus'
    }`;

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container mx-auto px-md sm:px-lg py-xl sm:py-2xl max-w-xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2xl"
        >
          <div className="flex items-center gap-xs mb-lg">
            <span className="px-sm py-xs rounded-full border border-border-default bg-background-primary-2 text-para-xs font-semibold text-accent-default uppercase tracking-wide">
              Tandem
            </span>
            <span className="text-text-tertiary text-para-xs">·</span>
            <span className="text-para-xs text-text-secondary font-medium">Support</span>
          </div>
          <h1 className="text-h2-sm sm:text-h1-sm font-bold text-text-primary leading-tight mb-sm">
            Contact support
          </h1>
          <p className="text-para-md text-text-secondary leading-relaxed">
            Tell us what's going on and we'll get back to you as soon as we can.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Success state */}
          {submitState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-background-primary-2 rounded-2xl border border-border-default shadow-sm p-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-lg"
              >
                <FiCheck className="text-emerald-500 text-icon-xl" />
              </motion.div>
              <h2 className="text-h4-sm font-bold text-text-primary mb-sm">Message sent.</h2>
              <p className="text-para-md text-text-secondary mb-xl leading-relaxed">
                We'll get back to you soon at{' '}
                <span className="font-medium text-text-primary">{userEmail}</span>.
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

            /* Form state */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-background-primary-2 rounded-2xl border border-border-default shadow-sm p-xl sm:p-2xl space-y-xl"
            >
              {/* Identity pill */}
              <IdentityPill
                userName={userName}
                userEmail={userEmail}
                role={userRole}
                projectName={projectName}
              />

              {/* Type dropdown */}
              <div>
                <label className="block text-para-sm font-medium text-text-primary mb-sm">
                  Type{' '}
                  <span className="text-text-tertiary font-normal text-para-xs">(optional)</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTypeOpen(o => !o)}
                    className={`w-full flex items-center justify-between px-md py-sm bg-background-secondary border rounded-xl text-para-sm transition-all duration-200 outline-none ${
                      typeOpen
                        ? 'border-accent-default ring-2 ring-accent-default/20'
                        : 'border-border-default hover:border-border-focus'
                    }`}
                  >
                    <span className={selectedTypeLabel ? 'text-text-primary' : 'text-text-tertiary'}>
                      {selectedTypeLabel || 'Select a category...'}
                    </span>
                    <motion.div animate={{ rotate: typeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown className="text-text-tertiary text-icon-sm" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {typeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-xs bg-background-primary border border-border-default rounded-xl shadow-lg z-10 overflow-hidden"
                      >
                        {SUPPORT_TYPES.map((type, i) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => { updateForm('type', type.id); setTypeOpen(false); }}
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
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Scraper not loading on my project"
                  className={inputClass('subject', !!errors.subject)}
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-xs text-para-xs text-red-500 flex items-center gap-xs"
                    >
                      <FiAlertCircle className="text-icon-xs flex-shrink-0" />
                      {errors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <label className="block text-para-sm font-medium text-text-primary mb-sm">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => updateForm('message', e.target.value)}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Describe your issue or question in as much detail as possible..."
                  rows={6}
                  className={`${inputClass('message', !!errors.message)} resize-none`}
                />
                <div className="flex items-center justify-between mt-xs">
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-para-xs text-red-500 flex items-center gap-xs"
                      >
                        <FiAlertCircle className="text-icon-xs flex-shrink-0" />
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <span className={`text-para-xs ml-auto ${form.message.length > 2000 ? 'text-red-500' : 'text-text-tertiary'}`}>
                    {form.message.length}/2000
                  </span>
                </div>
              </div>

              {/* Auto-included context — quiet */}
              <div className="flex flex-wrap items-center gap-xs pt-xs border-t border-border-muted">
                <span className="text-para-xs text-text-tertiary">Auto-included:</span>
                {['Name & email', 'Role', 'Page URL', 'Timestamp', 'Device'].map(item => (
                  <span key={item} className="px-xs py-xs rounded-md bg-background-muted text-para-xs text-text-tertiary border border-border-muted">
                    {item}
                  </span>
                ))}
              </div>

              {/* Error banner */}
              <AnimatePresence>
                {submitState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-sm p-md rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-para-sm"
                  >
                    <FiAlertCircle className="text-icon-sm flex-shrink-0 mt-xs" />
                    <span>
                      Something went wrong. Please try again or email us at{' '}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="underline font-medium">{SUPPORT_EMAIL}</a>.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit — full purple when active, pale when disabled */}
              <motion.button
                whileHover={isFormFilled && submitState !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={isFormFilled && submitState !== 'loading' ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={submitState === 'loading'}
                className={`w-full flex items-center justify-center gap-sm px-lg py-md rounded-xl text-btn-md font-semibold transition-all duration-200 shadow-sm ${
                  isFormFilled && submitState !== 'loading'
                    ? 'bg-accent-default hover:bg-accent-hover text-accent-foreground cursor-pointer'
                    : 'bg-accent-default/30 text-accent-foreground/50 cursor-not-allowed'
                }`}
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

        {/* Footer direct email */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-para-xs text-text-tertiary mt-xl"
        >
          Or email us directly at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent-default hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </motion.p>

      </div>
    </div>
  );
};

export default SupportPage;