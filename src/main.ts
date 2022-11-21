import App from './App';
import { createModule } from '@norce/module-adapter-react';

export const { bootstrap, mount, unmount } = createModule(App);
