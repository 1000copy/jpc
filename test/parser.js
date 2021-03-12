class Filter{
    // {name,age,address{city}}
    constructor(str){
        this.fields = []
        this.str = str.trim()
    }
    parse(){
        var state = "ready"
        for(var i=0;i<this.str.length;i++){
            if(this.str[i] == '{'){
                state = "begin"
                continue
            }
              
        }
    }
}
class Field{
    constructor(type,name){
        this.type = type|| "simple" // compound
        this.name = name || ""
        this.fields = []//compound
    }
    isSimple(){
        return this.type == "simple"
    }
}
var filter = "{name,age}"
var ft = new Filter(filter)
var assert = require('assert')
assert.ok(ft.str == filter)
ft.parse()
assert.ok(ft.fields.length == 0)
// var filter = "{name,age,address{city}}"
/*
FieldList ::= (FieldName) + LeftParentheses + Field|FieldList + RightParentheses 

*/
