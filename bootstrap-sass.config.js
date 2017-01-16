module.exports = {
  mainSass: "./src/theme/main.scss", // path to your main SASS file (optional)
  verbose: true, // print out your custom files used
  debug: false, // print out the full generated scss file
  styleLoader: "style-loader!css-loader!sass-loader", // see example for the ExtractTextPlugin
  scripts: {
    // add every bootstrap script you need
    'transition': true
  },
  styles: {
    'mixins': true,
    'normalize': true,
    'print': true,
    'glyphicons': true,
    'scaffolding': true,
    'type': true,
    'code': true,
    'grid': true,
    'tables': true,
    'forms': true,
    'buttons': true,
    'navs': true,
    'navbar': true,
    'jumbotron': true,
    'input-groups': true,
    'dropdowns': true,
    'button-groups': true,
  }
};