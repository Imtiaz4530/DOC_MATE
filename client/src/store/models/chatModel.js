import { action } from "easy-peasy";

const chatModel = {
  messages: [],
  selectedConversation: null,

  setMessages: action((state, payload) => {
    state.messages = payload;
  }),

  setSelectedConversation: action((state, payload) => {
    state.selectedConversation = payload;
  }),
};

export default chatModel;
