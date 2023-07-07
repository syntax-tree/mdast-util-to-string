import assert from 'node:assert/strict'
import test from 'node:test'
import {toString} from 'mdast-util-to-string'

test('toString', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('mdast-util-to-string')).sort(), [
      'toString'
    ])
  })

  await t.test('should not fail on a missing node', async function () {
    assert.equal(toString(), '')
  })

  await t.test('should not fail on `null` missing node', async function () {
    assert.equal(toString(null), '')
  })

  await t.test('should not fail on nodes w/o type', async function () {
    assert.equal(toString({value: 'foo'}), 'foo')
  })

  await t.test('should prefer `value` over all others', async function () {
    assert.equal(
      toString({
        value: 'foo',
        alt: 'bar',
        title: 'baz',
        children: [{value: 'qux'}]
      }),
      'foo'
    )
  })

  await t.test('should prefer `alt` over all others', async function () {
    assert.equal(
      toString({alt: 'bar', title: 'baz', children: [{value: 'qux'}]}),
      'bar'
    )
  })

  await t.test(
    'should *not* prefer `title` over all others',
    async function () {
      assert.equal(toString({title: 'baz', children: [{value: 'qux'}]}), 'qux')
    }
  )

  await t.test(
    'should *not* include `alt` w/ `includeImageAlt: false`',
    async function () {
      assert.equal(toString({alt: 'bar'}, {includeImageAlt: false}), '')
    }
  )

  await t.test(
    'should *not* include `html` w/ `includeHtml: false`',
    async function () {
      assert.equal(
        toString({type: 'html', value: 'a'}, {includeHtml: false}),
        ''
      )
    }
  )

  await t.test('should serialize children', async function () {
    assert.equal(
      toString({children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]}),
      'foobar'
    )
  })

  await t.test('should serialize a list of nodes', async function () {
    assert.equal(
      toString([{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]),
      'foobar'
    )
  })

  await t.test('should produce an empty string otherwise', async function () {
    assert.equal(toString({}), '')
  })
})
