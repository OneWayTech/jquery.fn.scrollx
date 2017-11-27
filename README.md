[![npm version][npm-v-img]][npm-url]
[![npm download][npm-dl-img]][npm-url]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## § Installation

### ⊙ npm
`npm i -S jquery.fn.scrollx`

### ⊙ CDN
```html
<script src="//unpkg.com/kenberkeley/jquery.fn.scrollx"></script>
```

## § Usage
```js
var listener = function () { ... }

var unlistener
var unlistenerReceiver = function (f) {
  unlistener = f
} 

$('#div').scrollup(listener, unlistenerReceiver)
```

## § [Demo](https://kenberkeley.github.io/jquery.fn.scrollx/test.html)
> [Source code of demo](https://github.com/kenberkeley/jquery.fn.scrollx/blob/master/test.html)

## § Reference
* https://stackoverflow.com/a/7076832/5172890
* https://stackoverflow.com/a/4326907/5172890

[npm-url]: https://www.npmjs.com/package/jquery.fn.scrollx
[npm-v-img]: http://img.shields.io/npm/v/jquery.fn.scrollx.svg
[npm-dl-img]: http://img.shields.io/npm/dm/jquery.fn.scrollx.svg
