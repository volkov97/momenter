import serve from 'rollup-plugin-serve';

import commonConfig from './tools/rollup/rollup.config.common';

export default {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins,
    serve({
        contentBase: 'public',
        port: 3000,
    })
  ]
};
