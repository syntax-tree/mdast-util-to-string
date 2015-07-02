'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var toString = require('./index.js');
var assert = require('assert');

/*
 * Tests.
 */

describe('mdast-util-visit', function () {
    it('should fail without node', function () {
        assert.throws(function () {
            toString();
        });
    });

    it('should not fail on unrecognised nodes', function () {
        assert.equal('foo', toString({
            'value': 'foo'
        }));
    });

    it('should prefer `value`', function () {
        assert.equal('foo', toString({
            'value': 'foo',
            'alt': 'bar',
            'title': 'baz'
        }));
    });

    it('should then prefer `alt`', function () {
        assert.equal('bar', toString({
            'alt': 'bar',
            'title': 'baz'
        }));
    });

    it('should then prefer `title`', function () {
        assert.equal('baz', toString({
            'title': 'baz'
        }));
    });

    it('should then prefer `children`', function () {
        assert.equal('foobarbaz', toString({
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
        assert.equal('', toString({}));
    });
});
