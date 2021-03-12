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

var root = []
var current = []
var stack = []
var Tokenizr= require("tokenizr")
var bracketcount = 0 
let lexer = new Tokenizr()
lexer.rule(/\{/, (ctx, match) => {
    ctx.accept("begin")    
    if(bracketcount == 0){
        current = root
    }else{
        stack.push(current)
        current = []
    }    
    bracketcount++
})
lexer.rule(/\}/, (ctx, match) => {
     ctx.accept("end")
    var t = current
    if(bracketcount != 1){
        current = stack.pop()
        var obj = {name:current[current.length-1],fields:t}
        current[current.length-1] = obj
    }else{
        root = t
    }
    bracketcount--   
})
lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
    ctx.accept("field")
    // console.log(match[0])
    current.push(match[0])
})
lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
    ctx.ignore()
})
lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
    ctx.ignore()
})
lexer.rule(/,/, (ctx, match) => {
    // ctx.accept("sep")
    ctx.ignore()
})

cfg ="{name,age,address{city,street{s1,s2}}}"
cfg ="{name,age}"
lexer.input(cfg)
// lexer.debug(true)
lexer.tokens().forEach((token) => {
    console.log(token.toString())
})
if (bracketcount != 0){
    console.log('bracket not match',bracketcount)
    return
}
var assert = require('assert')
assert.ok(root.length == 3)
assert.ok(root[2].fields.length == 2)
assert.ok(root[2].fields[1].fields.length == 2)
console.log("ok")