'use strict'

module.exports = toString

// Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children.
function toString(node) {
  return (
    (node &&
      (node.value ||
        node.alt ||
        node.title ||
        ('children' in node && all(node.children)))) ||
    ''
  )
}

function all(values) {
  var result = []
  var length = values.length
  var index = -1

  while (++index < length) {
    result[index] = toString(values[index])
  }

  return result.join('')
}
