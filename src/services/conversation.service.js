import { storeConversation  , findConversationById , updateConversation } from "../repos/conversation.repo.js";
import { errors } from "../utils/constants.js";

const modifyConversation = (conversation) => {
  return {
    pushOneMoreMember(member) {
      return conversation?.members.push(member);
    },
  };
};

const createConversationService = async (email) => {
  try {
    const conversation = {
        members : []
    };
    modifyConversation(conversation).pushOneMoreMember(email);
    await storeConversation(conversation);
    return;
  } catch (err) {
    throw err;
  }
};

const joinConversationService = async ( conversationId , email) => {
    try {
      const conversation = await findConversationById(conversationId)
      if(!conversation) throw new Error(errors.conversationNotFound)
      modifyConversation(conversation).pushOneMoreMember(email);
      await updateConversation(conversation);
      return;
    } catch (err) {
      throw err;
    }
  };



export { createConversationService , joinConversationService };
