/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:util:to-string
 * @fileoverview Test suite for `mdast-util-to-string`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var toString = require('./index.js');

/*
 * Tests.
 */

test('mdast-util-to-string', function (t) {
    t.throws(
        function () {
            toString();
        },
        'should fail without node'
    );

    t.equal('foo', toString({
        'value': 'foo'
    }, 'should not fail on unrecognised nodes'));

    t.equal('foo', toString({
        'value': 'foo',
        'children': [
            {
                'value': 'foo'
            },
            {
                'alt': 'bar'
            },
            {
                'title': 'baz'
            }
        ]
    }), 'should prefer `value` over all others');

    t.equal('foo', toString({
        'value': 'foo',
        'alt': 'bar',
        'title': 'baz'
    }), 'should prefer `value` over `alt` or `title`');

    t.equal('bar', toString({
        'alt': 'bar',
        'title': 'baz'
    }), 'should prefer `alt` over `title`');

    t.equal('baz', toString({
        'title': 'baz',
        'children': [
            {
                'value': 'foo'
            },
            {
                'alt': 'bar'
            },
            {
                'title': 'baz'
            }
        ]
    }), 'should use `title` over `children`');

    t.equal('foobarbaz', toString({
        'children': [
            {
                'value': 'foo'
            },
            {
                'alt': 'bar'
            },
            {
                'title': 'baz'
            }
        ]
    }), 'should prefer `children`');

    t.equal('', toString({}), 'should fall back on an empty string');

    t.end();
});
