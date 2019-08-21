import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import html from 'rollup-plugin-bundle-html';

const extensions = [".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: {
    file: "public/bundle.js",
    format: "cjs"
  },
  plugins: [
    resolve({ extensions }),
    babel({
        include: ["src/**/*"],
        extensions,
    }),
    html({
        template: 'src/index.html',
        dest: "public",
        filename: 'index.html'
    })
  ]
};