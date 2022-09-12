import mongoose  from 'mongoose' ;

const Schema = mongoose.Schema

const user = new Schema(
    {
        email : {
            type: String ,
            require : [ true , 'EMAIL MUST BE NOT EMPTY'] , 
            unique : [ true , 'EMAIL HAVE EXISTED ALREADY']
        } , 
        password : {
            type : String ,
            require : [ true , 'PASSWORD MUST BE NOT EMPTY'] , 
        } ,
    } ,
    {
        timestamps : true
    }
);

export default mongoose.model("user", user )