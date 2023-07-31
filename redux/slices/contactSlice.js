import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        allContacts: []
    },
    reducers: {
        setAllContacts: (state, action) => {
            state.allContacts = action.payload
        }
    }
})

export const { setAllContacts } = contactSlice.actions
export default contactSlice.reducer