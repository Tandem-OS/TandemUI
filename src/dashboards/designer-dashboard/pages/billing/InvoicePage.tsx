import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiArrowLeftLine,
  RiDownloadLine,
  RiExternalLinkLine,
  RiFileTextLine,
  RiCheckLine,
  RiTimeLine,
  RiCloseLine,
} from 'react-icons/ri';
import { getInvoices, type InvoiceItem } from '@/lib/requests/BillingRequest';

const formatUnixDate = (ts: number): string =>
  new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

const formatAmount = (cents: number, currency: string): string =>
  `$${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;

const StatusBadge = ({ status }: { status: InvoiceItem['status'] }) => {
  const config = {
    paid: {
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <RiCheckLine className="text-[10px]" />,
      label: 'Paid',
    },
    open: {
      className: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <RiTimeLine className="text-[10px]" />,
      label: 'Open',
    },
    void: {
      className: 'bg-background-muted text-text-tertiary border-border-default',
      icon: <RiCloseLine className="text-[10px]" />,
      label: 'Void',
    },
    uncollectible: {
      className: 'bg-red-50 text-red-700 border-red-200',
      icon: <RiCloseLine className="text-[10px]" />,
      label: 'Uncollectible',
    },
  };

  const { className, icon, label } = config[status] ?? config.void;

  return (
    <span className={`inline-flex items-center gap-xs px-sm py-xs border rounded-full text-para-xs font-medium ${className}`}>
      {icon}
      {label}
    </span>
  );
};

const InvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch {
        setFetchError('Unable to load invoices. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-xl py-xl">

          {/* Back */}
          <button
            onClick={() => navigate('/dashboard/designer')}
            className="flex items-center gap-xs text-para-sm text-text-secondary hover:text-text-primary transition-colors mb-xl"
          >
            <RiArrowLeftLine className="text-icon-sm" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-xl">
            <h1 className="text-h3-sm font-bold text-text-primary">Invoices</h1>
            <p className="text-text-secondary text-para-sm mt-xs">
              Download and review your billing invoices.
            </p>
          </div>

          {/* Fetch error */}
          {!isLoading && fetchError && (
            <div className="px-md py-sm bg-red-50 border border-red-200 rounded-xl text-para-sm text-red-700 mb-lg">
              {fetchError}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="bg-background-primary-2 border border-border-default rounded-2xl overflow-hidden animate-pulse">
              <div className="px-xl py-md border-b border-border-default">
                <div className="h-4 bg-background-muted rounded w-1/4" />
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="px-xl py-lg border-b border-border-default last:border-0 flex items-center justify-between gap-md">
                  <div className="space-y-sm flex-1">
                    <div className="h-4 bg-background-muted rounded w-1/3" />
                    <div className="h-3 bg-background-muted rounded w-1/4" />
                  </div>
                  <div className="h-4 bg-background-muted rounded w-16" />
                  <div className="h-6 bg-background-muted rounded-full w-14" />
                  <div className="h-4 bg-background-muted rounded w-8" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !fetchError && invoices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-background-primary-2 border border-border-default rounded-2xl p-xl flex flex-col items-center justify-center text-center py-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-[#F5F3FF] flex items-center justify-center mb-md">
                <RiFileTextLine className="text-[#7C3AED] text-icon-md" />
              </div>
              <p className="text-para-sm font-medium text-text-primary mb-xs">No invoices yet</p>
              <p className="text-para-xs text-text-secondary max-w-xs">
                Invoices will appear here once you have an active Pro subscription.
              </p>
            </motion.div>
          )}

          {/* Invoice table */}
          {!isLoading && !fetchError && invoices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-background-primary-2 border border-border-default rounded-2xl overflow-hidden"
            >
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-md px-xl py-md border-b border-border-default">
                <span className="text-para-xs font-semibold text-text-tertiary uppercase tracking-wide">Invoice</span>
                <span className="text-para-xs font-semibold text-text-tertiary uppercase tracking-wide text-right">Amount</span>
                <span className="text-para-xs font-semibold text-text-tertiary uppercase tracking-wide text-center">Status</span>
                <span className="text-para-xs font-semibold text-text-tertiary uppercase tracking-wide text-right">Download</span>
              </div>

              {/* Rows */}
              {invoices.map((invoice, i) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-sm md:gap-md items-center px-xl py-lg border-b border-border-default last:border-0 hover:bg-background-muted/40 transition-colors"
                >
                  {/* Description + date */}
                  <div>
                    <p className="text-para-sm font-medium text-text-primary">{invoice.description}</p>
                    <p className="text-para-xs text-text-secondary mt-xs">{formatUnixDate(invoice.date)}</p>
                  </div>

                  {/* Amount */}
                  <div className="text-para-sm font-semibold text-text-primary md:text-right">
                    {formatAmount(invoice.amount, invoice.currency)}
                  </div>

                  {/* Status */}
                  <div className="md:text-center">
                    <StatusBadge status={invoice.status} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-sm md:justify-end">
                    {invoice.pdf_url && (
                      <a
                        href={invoice.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-xs text-para-xs text-[#7C3AED] hover:underline font-medium"
                      >
                        <RiDownloadLine className="text-icon-xs" />
                        PDF
                      </a>
                    )}
                    {invoice.hosted_invoice_url && (
                      <a
                        href={invoice.hosted_invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-xs text-para-xs text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <RiExternalLinkLine className="text-icon-xs" />
                        View
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Footer note */}
          {!isLoading && !fetchError && invoices.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-para-xs text-text-tertiary mt-md text-center"
            >
              Showing last {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}. For full billing history, visit the{' '}
              <button
                onClick={() => navigate('/dashboard/designer/billing/history')}
                className="text-[#7C3AED] hover:underline"
              >
                Billing history
              </button>{' '}
              page.
            </motion.p>
          )}

        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;