import { createSlice } from '@reduxjs/toolkit'

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chatMessages: {}
    },
    reducers: {
        setChatMessages: (state, action) => {
            console.log(action.payload);
            if(state.chatMessages.hasOwnProperty(action.payload.number)){
                state.chatMessages[action.payload.number] = [...state.chatMessages[action.payload.number], action.payload]
            } else{
                state.chatMessages[action.payload.number] = [action.payload]
            }
        }
    }
})

export const { setChatMessages } = chatsSlice.actions
export default chatsSlice.reducer