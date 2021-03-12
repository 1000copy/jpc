var Tokenizr= require("tokenizr")
module.exports = function tokenlize(cfg){
    var root = []
    var current = []
    var stack = []    
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
    lexer.input(cfg)
    lexer.tokens().forEach((token) => {
        // console.log(token.toString())
    })
    if (bracketcount != 0){
        throw new Error('bracket not match',bracketcount)        
    }        
    return root
}    