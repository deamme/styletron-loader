# styletron-loader
Webpack loader to load CSS into a [styletron](https://github.com/rtsao/styletron/) compatible CSS object by specifying a string with CSS selectors.

Very much inspired by:
- https://github.com/pl12133/css-object-loader
- https://github.com/rtsao/styletron/issues/108

## Usage
[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)
Create an entry to load `.css` files in your webpack.config:

```js
module: {
  loaders: [{
      test: /\.css$/,
      loaders: [ 'styletron' ],
      exclude: /node_modules/
    }
  ]
}
```

Requiring CSS rules:

```css
.button {
  font-size: 1.5em;
  color: fuchsia;
}
.button:hover,
.button:focus {
  color: crimson;
}
@media screen and (max-width: 768px) {
  .button {
    font-size: 2em;
  }
}
.red-bg {
  background-color: red
}
```

```js
var styles = require('./styles.css');
styles('.button .red-bg');
/*
{ 'font-size': '1.5em',
  color: 'fuchsia',
  ':hover': { color: 'crimson' },
  ':focus': { color: 'crimson' },
  'screen and (max-width: 768px)': { 'font-size': '2em' },
  'background-color': 'red' }
*/
```