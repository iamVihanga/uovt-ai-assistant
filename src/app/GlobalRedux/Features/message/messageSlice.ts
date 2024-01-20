'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface MessagesState {
  messages: ConversationType[]
}

const initialState: MessagesState = {
  messages: []
}

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addToMessages: (state, action) => {
      state.messages.push(action.payload)
    },
    removeFromMessage: (state, action) => {
      const filteredList = state.messages.filter(message => message.message !== action.payload)
      state.messages = filteredList;
    }
  }
})

export const { addToMessages, removeFromMessage } = messageSlice.actions

export default messageSlice.reducer