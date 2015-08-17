'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var toString = require('./index.js');

/*
 * Methods.
 */

var equal = assert.strictEqual;
var throws = assert.throws;

/*
 * Tests.
 */

describe('mdast-util-visit', function () {
    it('should fail without node', function () {
        throws(function () {
            toString();
        });
    });

    it('should not fail on unrecognised nodes', function () {
        equal('foo', toString({
            'value': 'foo'
        }));
    });

    it('should prefer `value`', function () {
        equal('foo', toString({
            'value': 'foo',
            'alt': 'bar',
            'title': 'baz'
        }));
    });

    it('should then prefer `alt`', function () {
        equal('bar', toString({
            'alt': 'bar',
            'title': 'baz'
        }));
    });

    it('should then prefer `title`', function () {
        equal('baz', toString({
            'title': 'baz'
        }));
    });

    it('should then prefer `children`', function () {
        equal('foobarbaz', toString({
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
        }));
    });

    it('should fall back on an empty string', function () {
        equal('', toString({}));
    });
});
