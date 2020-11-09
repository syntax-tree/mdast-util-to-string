// Minimum TypeScript Version: 3.0
import {Node} from 'unist'

declare namespace mdastToString {}

declare function mdastToString(node: Node): string

export = mdastToString
