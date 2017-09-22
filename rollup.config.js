import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/enum.min.js',
    format: 'umd',
    name: 'Enum',
  },
  sourcemap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify({
    })
  ]
};
