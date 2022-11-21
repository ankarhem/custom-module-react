import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import * as cp from 'child_process';
import livereload from 'rollup-plugin-livereload';

// Small plugin to serve js assets from the dist folder
function serve(): Plugin {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    name: 'server',
    writeBundle() {
      if (server) return;
      server = cp.spawn('pnpm', ['start'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

const SERVE = process.env.SERVE === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      plugins: [
        SERVE && serve(),
        SERVE &&
          livereload({
            clientUrl: 'http://localhost:35729/livereload.js?snipver=1',
            watch: 'dist',
            delay: 150,
          }),
      ],
      input: './src/main.ts',
      preserveEntrySignatures: 'strict',
      output: {
        entryFileNames: '[name].js',
        format: 'systemjs',
        name: null, // ensure anonymous System.register
        dir: 'dist',
      },
    },
  },
});
