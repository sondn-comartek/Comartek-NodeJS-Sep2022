class customErrorAPI extends Error{
    constructor(_status,msg){
        super(msg)
        this.status=_status
    }
}
module.exports=customErrorAPI