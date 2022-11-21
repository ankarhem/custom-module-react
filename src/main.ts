import App from './App';
import { createModule } from './module';

export const { bootstrap, mount, unmount } = createModule(App);
