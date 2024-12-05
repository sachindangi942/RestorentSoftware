import { createSlice }  from "@reduxjs/toolkit";

const FormSlice = createSlice({
    name: "form",
    initialState: {
        formData: {}
    },
    reducers: {
        setFormData: ((state, actions) => {
            state.formData = actions.payload
        })
    }
});

export const {setFormData} = FormSlice.actions;
export default FormSlice.reducer;