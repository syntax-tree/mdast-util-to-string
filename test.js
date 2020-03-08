'use strict'

var test = require('tape')
var toString = require('.')

test('mdast-util-to-string', function(t) {
  t.equal(toString(), '', 'should not fail on a missing node')
  t.equal(toString(null), '', 'should not fail on `null` missing node')

  t.equal(
    toString({value: 'foo'}),
    'foo',
    'should not fail on unrecognised nodes'
  )

  t.equal(
    toString({
      value: 'foo',
      children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]
    }),
    'foo',
    'should prefer `value` over all others'
  )

  t.equal(
    toString({value: 'foo', alt: 'bar', title: 'baz'}),
    'foo',
    'should prefer `value` over `alt` or `title`'
  )

  t.equal(
    toString({alt: 'bar', title: 'baz'}),
    'bar',
    'should prefer `alt` over `title`'
  )

  t.equal(
    toString({
      title: 'baz',
      children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]
    }),
    'baz',
    'should use `title` over `children`'
  )

  t.equal(
    toString({children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]}),
    'foobarbaz',
    'should prefer `children`'
  )

  t.equal(toString({}), '', 'should fall back on an empty string')

  t.end()
})
