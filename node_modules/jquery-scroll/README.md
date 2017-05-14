scroll-to DOM or y position
------
### Install

`npm i jquery-scroll --save`

### Usage
`scrollTo({param: value})`

* **selector/posY** *jQuery object or a Y position value*
* callback *[null] function body or name*
* offset *[0] number margin bootom to target*
* duration *[800] animate duration*
* easing *[swing/linear] animation timing function, more need plugin [official doc](http://api.jquery.com/animate/)*
* element *[html,body] default slide the document*

> NOTE:
> 1. **blod** meaning required param, else optional
> 2. Indifferent params order
> 3. need webpack && bable-loader support

### Example
1. git clone this project
2. `npm i` to install dependence
3. `npm run example` then open `http://localhost:8080/example/`

```javascript
import $ from 'jquery';
import scrollTo from 'jquery-scroll';

$('#scroll').on('click', function () {
  scrollTo({
    selector: '#about',
    callback: () => { alert('scroll end') }
  });
});
```

### Changelog
* 1.1.0 change `params[element]` to a jquery object, not jquery selector. eg: `$('#container')`, not `#container`

### What is gnpm ?
`gnpm` was private npm registry for [GeekPark](http://www.geekpark.net), [read more](https://github.com/cnpm/cnpmjs.org)
