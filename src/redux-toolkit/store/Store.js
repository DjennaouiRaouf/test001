import { configureStore } from '@reduxjs/toolkit';

import EditPlatReducer from "../slices/EditPlatSlice";
import FormPlatReducer from "../slices/FormPlatSlice";
export default configureStore({
    reducer: {
        editplat:EditPlatReducer,
        fplat:FormPlatReducer,
    },
});
