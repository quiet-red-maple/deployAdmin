import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  proxy: {
    '/scf-front': {
      target: 'http://39.104.136.10:6233',
      secure: false,
      changeOrigin: true,
    },
    '/edi/api': {
      target: 'http://192.168.50.74:9011',
      secure: false,
      changeOrigin: true,
      // "pathRewrite": { "^/sys" : "/sys" }
    },
  },
});
