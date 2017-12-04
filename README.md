# Add `scrollup / scrolldown / scrollleft / scrollright` to `jQuery.prototype` (debounce integrated)

[![npm version][npm-v-img]][npm-url]
[![npm download][npm-dl-img]][npm-url]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## § Demo
[Demo](https://onewaytech.github.io/jquery.fn.scrollx/test.html) ([source code of demo](https://github.com/onewaytech/jquery.fn.scrollx/blob/master/test.html))

## § Installation

### ⊙ npm
`npm i -S jquery.fn.scrollx`

### ⊙ CDN
```html
<script src="//unpkg.com/jquery.fn.scrollx"></script>
```

## § Usage

```js
import $ from 'jquery'
require('jquery.fn.scrollx')($)

const period = 200 // for debounce

const listener = (delta, currentOffset, lastOffset) => { ... }
let unlistener
const unlistenerReceiver = f => { unlistener = f }

$('#foo').scrollup(listener, period, unlistenerReceiver)
$('#bar').on('click', unlistener)
```
  
`listener` is required  
`period` (defaults to `100` ms) and `unlistenerReceiver` are optional

e.g.

```js
$('#foo').scrolldown(listener)
$('#foo').scrollleft(listener, 300)
$('#foo').scrollright(listener, unlistenerReceiver)
```

## § Reference
* https://stackoverflow.com/a/7076832/5172890
* https://stackoverflow.com/a/4326907/5172890

[npm-url]: https://www.npmjs.com/package/jquery.fn.scrollx
[npm-v-img]: http://img.shields.io/npm/v/jquery.fn.scrollx.svg
[npm-dl-img]: http://img.shields.io/npm/dm/jquery.fn.scrollx.svg
