var tokener = require('./token')
var filter1 = require('./filter')
class Factory{
    constructor(){
        this.objmap ={}
    }
    
    register(objname,obj){
        this.objmap[objname] = obj
    }
    // calldata = {obj:"user",action:"add",param:{name:"reco",age:18},filter:string}
    intercop(calldata){
        try{
            if(!this.objmap[calldata.obj])throw new ObjNotExists() 
            if(!(this.objmap[calldata.obj][calldata.action]))throw new ActionNotExists()         
            // var result = this.objmap[calldata.obj][calldata.action](calldata.param,tokener(calldata.filter))
            var result = this.objmap[calldata.obj][calldata.action](calldata.param)
            result = filter1(result,tokener(calldata.filter))
            return {ok:true,result}
        }catch(error){
            if (error instanceof ObjNotExists) {
                return {ok:false,error:{type:"ObjNotExists",param:calldata.obj}}
            }
            if (error instanceof ActionNotExists) {            
                return {ok:false,error:{type:"ActionNotExists",param:calldata.obj}}
            }        
        }
    }
}
class ObjNotExists extends Error{
    constructor(...params) {
        super(...params)
        // We're spreading `params` as a way to bring all of `Error`'s functionality in.
      }
}
class ActionNotExists extends Error{
    constructor(...params) {
        super(...params)
        // We're spreading `params` as a way to bring all of `Error`'s functionality in.
      }

}
module.exports = Factory