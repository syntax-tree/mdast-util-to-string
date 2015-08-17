# mdast-util-to-string [![Build Status](https://img.shields.io/travis/wooorm/mdast-mdast-util-to-string.svg)](https://travis-ci.org/wooorm/mdast-mdast-util-to-string) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/mdast-mdast-util-to-string.svg)](https://codecov.io/github/wooorm/mdast-mdast-util-to-string)

[**mdast**](https://github.com/wooorm/mdast) utility to get the plain text
content of a node.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-util-to-string
```

**mdast-util-to-string** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](mdast-util-to-string.js) and
[compressed](mdast-util-to-string.min.js).

## Usage

```js
/*
 * Dependencies.
 */

var mdast = require('mdast');
var toString = require('mdast-util-to-string');

/*
 * AST.
 */

var ast = mdast.parse('Some *emphasis*, **strongness**, and `code`.');

toString(ast);
// 'Some emphasis, strongness, and code.'
```

## API

### toString(node)

Get the text content of a node.

The algorithm checks the value of `node`, then its `alt`, and then
its `title`, in that order. If no value is found, the algorithm checks
the children of `node` and joins them (without spaces or newlines).

> This is not a markdown to plain-text library.
> Use [strip-markdown](https://github.com/wooorm/strip-markdown) for that.

Parameters:

*   `node` (`Node`) — [**mdast** node](https://github.com/wooorm/mdast/blob/master/doc/nodes.md);

Returns: `string` — text representation of `node`.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
