var tokenlize = require('../lib/token')
cfg ="{name,age,address{city,street{s1,s2}}}"
// cfg ="{name,age}"
var root= tokenlize(cfg)
var assert = require('assert')
assert.ok(root.length == 3)
assert.ok(root[2].fields.length == 2)
assert.ok(root[2].fields[1].fields.length == 2)
console.log("ok")
cfg ="{name,age,address{city{n1,n2},street{s1,s2}}}"
// cfg ="{name,age}"
var root= tokenlize(cfg)
var assert = require('assert')
assert.ok(root.length == 3)
assert.ok(root[2].fields.length == 2)
assert.ok(root[2].fields[1].fields.length == 2)
assert.ok(root[2].fields[0].fields.length == 2)
console.log("ok")