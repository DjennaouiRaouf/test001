import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal:false,
    idpl:null,
    nom:"",
    photo:null,
    recette:"",
    idpays:0,

}

export const EditPlatSlice = createSlice({
    name: 'EditPlat',
    initialState,
    reducers: {
        update_modal: (state) => {
            state.modal=!state.modal;
        },
        setId:(state,action)=> {
            state.idpl=action.payload;
        },
        setPhoto:(state,action)=> {
            state.photo=action.payload;
        },
        setRecette:(state,action)=> {
            state.recette=action.payload;
        },
        setNom:(state,action)=> {
            state.nom=action.payload;
        },
        setIdPays:(state,action)=> {
            state.idpays=action.payload;
        },

        clearForm: (state) => initialState,



    },
})

// Action creators are generated for each case reducer function
export const { update_modal,setIdPays,setId,setPhoto,setRecette,setNom,clearForm } = EditPlatSlice.actions

export default EditPlatSlice.reducer