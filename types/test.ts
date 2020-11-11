import * as mdastUtilToString from 'mdast-util-to-string'

mdastUtilToString() // $ExpectError
mdastUtilToString({type: 'root'}) // $ExpectType string
mdastUtilToString([{type: 'root'}]) // $ExpectType string
