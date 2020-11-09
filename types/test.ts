import mdastUtilToString = require('mdast-util-to-string')

mdastUtilToString() // $ExpectError
mdastUtilToString({type: 'root'}) // $ExpectType string
