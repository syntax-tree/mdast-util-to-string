import assert from 'node:assert/strict'
import test from 'node:test'
import {toString} from './index.js'
import * as mod from './index.js'

test('toString', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['toString'],
    'should expose the public api'
  )

  // @ts-expect-error: runtime.
  assert.equal(toString(), '', 'should not fail on a missing node')
  assert.equal(toString(null), '', 'should not fail on `null` missing node')

  assert.equal(
    toString({value: 'foo'}),
    'foo',
    'should not fail on nodes w/o type'
  )

  assert.equal(
    toString({
      value: 'foo',
      alt: 'bar',
      title: 'baz',
      children: [{value: 'qux'}]
    }),
    'foo',
    'should prefer `value` over all others'
  )

  assert.equal(
    toString({alt: 'bar', title: 'baz', children: [{value: 'qux'}]}),
    'bar',
    'should prefer `alt` over all others'
  )

  assert.equal(
    toString({title: 'baz', children: [{value: 'qux'}]}),
    'qux',
    'should *not* prefer `title` over all others'
  )

  assert.equal(
    toString({alt: 'bar'}, {includeImageAlt: false}),
    '',
    'should *not* include `alt` w/ `includeImageAlt: false`'
  )

  assert.equal(
    toString({type: 'html', value: 'a'}, {includeHtml: false}),
    '',
    'should *not* include `html` w/ `includeHtml: false`'
  )

  assert.equal(
    toString({children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]}),
    'foobar',
    'should serialize children'
  )

  assert.equal(
    toString([{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]),
    'foobar',
    'should serialize a list of nodes'
  )

  assert.equal(toString({}), '', 'should produce an empty string otherwise')
})
