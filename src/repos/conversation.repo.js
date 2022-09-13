import conversationModel from "../databases/models/conversation.model.js";

const updateConversation = async (currenConversationData , newConversationData) => {
    if( !currenConversationData
        || !newConversationData
        || typeof newConversationData !== 'object' 
        || typeof currenConversationData !== 'object' 
        || currenConversationData.constructor !== Object 
        || newConversationData.constructor !== Object ) throw new Error(errors.inputInvalid)
        try {
        return await conversationModel.updateOne( {
          _id : currenConversationData._id
        } , newConversationData )
      } catch (err) {
        throw err;
      }
}

const findConversationById = async (conversationId) => {
    try {
        return await conversationModel.findOne({_id : conversationId}).lean()
      } catch (err) {
        throw err;
      }
}

const storeConversation = async (conversation) => {
    if(!conversation || typeof conversation !== 'object' || conversation.constructor !== Object) throw new Error(errors.inputInvalid)
    try {
      return await conversationModel.create(conversation)
    } catch (err) {
      throw err;
    }
  };

export { storeConversation  , findConversationById , updateConversation };
