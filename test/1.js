
var assert = require('assert')
var Factory = require('..')
class User{
    // {name:"reco",age:18}
    add(param,filter){        
        return param
    }
}
var filter = "{name,age,address{city}}"
var fac = new Factory()
fac.register('user',new User())
var param = [{name:"reco",age:18,address:[{city:"cd"},{city:"hz"}]}]
var r = fac.intercop({obj:"user",action:"add",param,filter})
assert.deepStrictEqual(r.result,param,"failure")
console.log("OK")