import { EventPayload, Events } from '@norce/checkout-lib';
import { useEffect } from 'react';
import { CheckoutProvider, useCheckoutContext } from './CheckoutProvider';
import { MountProps } from '@norce/module-adapter-react';

function App() {
  const { Checkout, EventEmitter } = useCheckoutContext();

  useEffect(() => {
    const shippingChangedCallback = async (
      payload: EventPayload<typeof Events.ShippingChanged>
    ) => {
      console.log('shipping_changed from custom module', payload);
    };

    EventEmitter.subscribe({
      event: Events.ShippingChanged,
      callback: shippingChangedCallback,
    });

    return () => {
      EventEmitter.unsubscribe({
        event: Events.ShippingChanged,
        callback: shippingChangedCallback,
      });
    };
  }, []);

  return (
    <div className="container mx-auto bg-[#f1d0d1]">{Checkout.order.id}</div>
  );
}

function AppWrapper(props: MountProps) {
  return (
    <CheckoutProvider value={props}>
      <App />
    </CheckoutProvider>
  );
}

export default AppWrapper;
