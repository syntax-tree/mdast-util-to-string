/**
 * Get the text content of a node.
 * Prefer the node’s plain-text fields, otherwise serialize its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} node
 * @returns {string}
 */
export function toString(node) {
  return (
    (node &&
      typeof node === 'object' &&
      // @ts-ignore looks like a literal.
      (node.value ||
        // @ts-ignore looks like an image.
        node.alt ||
        // @ts-ignore looks like an image/link.
        node.title ||
        // @ts-ignore looks like a parent.
        ('children' in node && all(node.children)) ||
        (Array.isArray(node) && all(node)))) ||
    ''
  )
}

/**
 * @param {Array.<unknown>} values
 * @returns {string}
 */
function all(values) {
  /** @type {Array.<string>} */
  var result = []
  var index = -1

  while (++index < values.length) {
    result[index] = toString(values[index])
  }

  return result.join('')
}
