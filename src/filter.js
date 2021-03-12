function map1(list,filter){
    var answer = []
    for(var i = 0 ;i<list.length;i++){
        var obj = dofilter(list[i],filter)
        answer.push(obj)
    }
    return answer
}
function dofilter(item,filter){
    var answer = {}
    var filters = Object.values(filter)
    for(var i = 0 ;i<filters.length;i++){
        var key = filters[i]
        if(typeof key == 'string')
            answer[key] = item[key]
        else
            answer[key.name] = map1(item[key.name],key.fields)
    }
    return answer
}

module.exports = map1