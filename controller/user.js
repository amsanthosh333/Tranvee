const userModel=require("../model/user");
const errorHandler=require("./../util/error.handler");
const { Aggregate } = require("mongoose");


class UserController {

     async add(users){
                
          try{
          let userInfo=await userModel.create(users);
          return{
              status:"sucess",
              result:userInfo 
          };
          }catch(error)
          {
          console.log(error);
          return{
              status:"error",
              error:errorHandler.parseMongoError(error)
              };
            }
    }

    async update(id,update){
                
        try{
        let userInfo=await userModel.update({_id:id},update);
        return{
            status:"sucess",
            result:userInfo 
        };
        }catch(error)
        {
        console.log(error);
        return{
            status:"error",
            error:errorHandler.parseMongoError(error)
            };
          }
  }
  async fetch(){
  try{
    let userInfo=await userModel.find({});
    return{
        status:"sucess",
        result:userInfo 
    };
    }catch(error)
    {
    console.log(error);
    return{
        status:"error",
        error:errorHandler.parseMongoError(error)
        };
      }
}

async delete(id){        
    try{
    let userInfo=await userModel.deleteOne({_id:id});
    return{
        status:"sucess",
        result:userInfo 
    };
    }catch(error)
    {
    console.log(error);
    return{
        status:"error",
        error:errorHandler.parseMongoError(error)
        };
      }
}

async aggregation(){
    try{
// return await userModel.count([{

//         $match:{
//       city:"salam"
//     }
// },
//     {
//     $group:{
//         _id:'$city',
//         count:{$sum:1}
//     }
// }
// ])
//let result= await userModel.count({city:'tirupur'});

let result= await userModel.distinct('city');
return {result:result};
    }catch{
        return{
            status:"error",
            error:errorHandler.parseMongoError(error)
            }
    }
}

}

       

module.exports=new UserController();