import {configureStore} from '@reduxjs/toolkit'
import contactsReducer from './slices/contactSlice'
import chatsReducer from './slices/chatSlice'

export const store = configureStore({
    reducer:{
        contacts: contactsReducer,
        chats: chatsReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})