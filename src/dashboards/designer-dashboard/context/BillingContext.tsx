import React, { createContext, useContext } from 'react';
import { useBillingGate } from '@/hooks/useBillingGate';

// ─── Types 

type BillingContextValue = ReturnType<typeof useBillingGate>;

// ─── Context 

const BillingContext = createContext<BillingContextValue | null>(null);

// ─── Provider 

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const billing = useBillingGate();
    
    return (
        <BillingContext.Provider value={billing}>
            {children}
        </BillingContext.Provider>
    );
};

// ─── Hook 

export const useBilling = (): BillingContextValue => {
    const ctx = useContext(BillingContext);
    if (!ctx) {
        throw new Error('useBilling must be used within a BillingProvider');
    }
    return ctx;
};
