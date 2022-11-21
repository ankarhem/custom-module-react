import type { Checkout, CheckoutEventEmitter } from '@norce/checkout-lib';
import React, { createContext } from 'react';
import { useReadable } from './module';

export type CheckoutProviderState = {
  Checkout: typeof Checkout;
  EventEmitter: typeof CheckoutEventEmitter;
};

const CheckoutContext = createContext<CheckoutProviderState | null>(null);

export const useCheckoutContext = () => {
  const context = React.useContext(CheckoutContext);
  const order = useReadable(context?.Checkout.order!);
  const config = useReadable(context?.Checkout.config!);

  if (!context) {
    throw new Error(
      'useCheckoutContext must be used within a CheckoutProvider'
    );
  }

  return {
    Checkout: {
      ...context?.Checkout,
      order,
      config,
    },
    EventEmitter: context?.EventEmitter,
  };
};

export const CheckoutProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CheckoutProviderState;
}) => {
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
