import { createConversationService, joinConversationService } from "../services/conversation.service.js"
import { messages } from "../utils/constants.js"

const create = async (req,res,next) => {
    try {
        await createConversationService(req.user) ;
        res.status(201).json({
            success : true , 
            message : messages.createConversationSuccess
        })
    }catch(err){
        next({
            error : err ,
            status : 500
        })
    }
}

const join = async (req,res,next) => {
    try {
        await joinConversationService(req.body.conversationId, req.user) ;
        res.status(201).json({
            success : true , 
            message : messages.createConversationSuccess
        })
    }catch(err){
        next({
            error : err ,
            status : 500
        })
    }
}

export { create , join }