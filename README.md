# Jpc

使用json 做调用协议,协议包括字段obj，action，params，return。

比如:

    var callobj = {obj:"user",action:"add",params:[{name:"reco",age:18}],return:"{name}"}

注册用户对象：

    class User{
        add(param,filter){        
            return param
        }
    }
    var fac = new Factory()
    fac.register('user',new User())

那么当`fac.intercepor(callobj)`时,应该返回值为：

    [{name:"reco"}]

ObjectRPC允许开发者注册对象和js对象的关系，并且讲action匹配到对于的method，提取输出结果并返回

TODO: Jpc 应提供和express对接的能力。