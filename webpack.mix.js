// eslint-disable-next-line no-undef
let mix = require('laravel-mix');
// eslint-disable-next-line no-undef
require('laravel-mix-eslint');

mix.sass('src/sass/style.scss', 'css/min.style.css').browserSync({
  proxy: false,
  server: {
    baseDir: './'
  },
  files: [
    'js/*.js',
    'src/sass/**/*.scss',
    '**/*.html',
    '**/*.php'
  ]
}).options({
  processCssUrls: false
});
