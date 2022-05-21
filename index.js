/**
 * @typedef {import('mdast').Root|import('mdast').Content} Node
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean} [includeImageAlt=true]
 *   Whether to use `alt` for `image`s.
 */

/**
 * Get the text content of a node or list of nodes.
 * Prefers the node’s plain-text fields, otherwise serializes its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} value
 * @param {Options} [options]
 * @returns {string}
 */
export function toString(value, options = {}) {
  const {includeImageAlt = true} = options
  return one(value, includeImageAlt)
}

/**
 * @param {unknown} value
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function one(value, includeImageAlt) {
  return (
    (node(value) &&
      (('value' in value && value.value) ||
        (includeImageAlt && 'alt' in value && value.alt) ||
        ('children' in value && all(value.children, includeImageAlt)))) ||
    (Array.isArray(value) && all(value, includeImageAlt)) ||
    ''
  )
}

/**
 * @param {Array<unknown>} values
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function all(values, includeImageAlt) {
  /** @type {Array<string>} */
  const result = []
  let index = -1

  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt)
  }

  return result.join('')
}

/**
 * @param {unknown} value
 * @returns {value is Node}
 */
function node(value) {
  return Boolean(value && typeof value === 'object')
}
