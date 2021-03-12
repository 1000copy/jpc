
var assert = require('assert')
var Factory = require('../src/intercepor')
var filter1 = require('../src/filter')
class User{
    // {name:"reco",age:18}
    add(param,filter){
        // return filter1(param,filter)
        return param
    }
}
var filter = "{name,age,address{city}}"
var fac = new Factory()
fac.register('user',new User())
var param = [{name:"reco",age:18,address:[{city:"cd"},{city:"hz"}]}]
var r = fac.intercop({obj:"user",action:"add",param,filter})
assert.deepStrictEqual(r.result,param,"failure")
var r = fac.intercop({obj:"user1",action:"add",param,filter})
assert.deepStrictEqual(r.ok,false)
assert.deepStrictEqual(r.error.type ,"ObjNotExists")
var r = fac.intercop({obj:"user",action:"add1",param,filter})
assert.deepStrictEqual(r.ok,false)
assert.deepStrictEqual(r.error.type ,"ActionNotExists")
var r = fac.intercop({obj:"user",action:"add",param,filter})
assert.deepStrictEqual(r.ok,true)
assert.deepStrictEqual(r.result,param,"failure")

console.log("OK")