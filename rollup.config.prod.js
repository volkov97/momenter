import commonConfig from './tools/rollup/rollup.config.common';

import { terser } from "rollup-plugin-terser";

export default {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins,
    terser(),
  ]
};
