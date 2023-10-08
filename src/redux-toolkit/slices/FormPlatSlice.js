import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggle:false,


}

export const FormPlatSlice = createSlice({
    name: 'EditPlat',
    initialState,
    reducers: {
        handleClose: (state) => {
            state.toggle=false;
        },
        handleShow: (state) => {
            state.toggle=true;
        },




    },
})

// Action creators are generated for each case reducer function
export const { handleClose,handleShow } = FormPlatSlice.actions

export default FormPlatSlice.reducer