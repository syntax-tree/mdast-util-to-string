'use strict'

var test = require('tape')
var toString = require('.')

test('mdast-util-to-string', function(t) {
  t.equal(toString(), '', 'should not fail on a missing node')
  t.equal(toString(null), '', 'should not fail on `null` missing node')

  t.equal(toString({value: 'foo'}), 'foo', 'should not fail on nodes w/o type')

  t.equal(
    toString({
      value: 'foo',
      alt: 'bar',
      title: 'baz',
      children: [{value: 'qux'}]
    }),
    'foo',
    'should prefer `value` over all others'
  )

  t.equal(
    toString({alt: 'bar', title: 'baz', children: [{value: 'qux'}]}),
    'bar',
    'should prefer `alt` over all others'
  )

  t.equal(
    toString({title: 'baz', children: [{value: 'qux'}]}),
    'baz',
    'should prefer `title` over all others'
  )

  t.equal(
    toString({children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]}),
    'foobarbaz',
    'should serialize children'
  )

  t.equal(
    toString([{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]),
    'foobarbaz',
    'should serialize a list of nodes'
  )

  t.equal(toString({}), '', 'should produce an empty string otherwise')

  t.end()
})
