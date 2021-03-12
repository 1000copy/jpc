var tokenlize = require('../src/token')
var filter1 = require('../src/filter')
cfg ="{name,age,address{city,street{s1}}}"
var filter= tokenlize(cfg)
var assert = require('assert')
var person = [{name:'rec1o',age:18,address:[{city:'hz',street:[{s1:'wc',s2:'f'}]}]},{name:'rec1o',age:18,address:[{city:'cd',street:{}}]}]
var r = filter1(person,filter)
assert.ok(r[0].address[0].street[0].s1 =='wc')
console.log('OK')
