(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdastUtilToString = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module mdast-util-to-string
 * @fileoverview Utility to get the text value of a node.
 */

'use strict';

/**
 * Get the value of `node`.  Checks, `value`,
 * `alt`, and `title`, in that order.
 *
 * @param {Node} node - Node to get the internal value of.
 * @return {string} - Textual representation.
 */
function valueOf(node) {
    return node &&
        (node.value ? node.value :
        (node.alt ? node.alt : node.title)) || '';
}

/**
 * Returns the text content of a node.  If the node itself
 * does not expose plain-text fields, `toString` will
 * recursivly try its children.
 *
 * @param {Node} node - Node to transform to a string.
 * @return {string} - Textual representation.
 */
function toString(node) {
    return valueOf(node) ||
        (node.children && node.children.map(toString).join('')) ||
        '';
}

/*
 * Expose.
 */

module.exports = toString;

},{}]},{},[1])(1)
});