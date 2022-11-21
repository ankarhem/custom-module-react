import type { Checkout, CheckoutEventEmitter } from '@norce/checkout-lib';
import React from 'react';
import ReactDOM from 'react-dom/client';

export type MountProps = {
  Checkout: Checkout;
  EventEmitter: typeof CheckoutEventEmitter;
};

export interface ModuleMethods {
  bootstrap: () => void;
  mount: (el: ShadowRoot, props: MountProps) => void;
  unmount: (el: ShadowRoot) => void;
}

type Instances = Record<string, ReactDOM.Root>;

export const createModule = (App: React.FC<MountProps>): ModuleMethods => {
  let instances: Instances = {};
  return {
    bootstrap,
    mount: mount.bind(null, instances, App),
    unmount: unmount.bind(null, instances),
  };
};

const bootstrap = () => {
  return;
};

const mount = (
  instances: Instances,
  App: React.FC<MountProps>,
  el: ShadowRoot,
  props: MountProps
) => {
  if (!instances[0]) {
    const reactRoot = ReactDOM.createRoot(el);
    reactRoot.render(<App {...props} />);
    instances[0] = reactRoot;
  } else {
    console.log('Tried to mount an already mounted instance');
  }
};

const unmount = (instances: Instances, el: ShadowRoot) => {
  if (instances[0]) {
    instances[0].unmount();
    delete instances[0];
  } else {
    console.log('Tried to unmount an already unmounted instance');
  }
};