import { Box, Button } from "@mui/material";
import MyInput from "../MyInputs/MyInput";
import { setFormData } from "../../Redux/Fetures/Formslice";
import { useDispatch, useSelector } from "react-redux";
import {useState } from "react";
import CreateUser_val from "../../Validations/CreateUser_val";

const User = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.form.formData);

    const [err, setErr] = useState();
    const [Data,setData] = useState({});
    // const token = useSelector((state) => state.auth.token);


    const onChangeEvent = ({id,value}) => {
        // dispatch(setFormData({ id,value}))
        setData((lastvalue)=>{
            lastvalue[id] = value;
            return {...lastvalue};
        })
    }

    const createUser = async (e) => {
        const { error } = CreateUser_val({ data:Data })
        if (error) {
            console.log(error)
            let errorObj = {};
            error.details.forEach(details => {
                errorObj[details.path[0]] = details.message;
            });
           return setErr(errorObj);
        }
        setErr("")
    }



    // console.log(typeof data, data);
    return (
        <Box component="form"
            className="mb-4"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off">
            <div className="form-container">
                <h4>Create User</h4>

                <MyInput
                    placeholder="Name"
                    id="Name"
                    err={err}
                    onChange={onChangeEvent}

                />
                <MyInput
                    placeholder="Email"
                    id="Email"
                    err={err}
                    onChange={onChangeEvent}

                />
                <MyInput
                    placeholder="Password"
                    id="password"
                    err={err}
                    onChange={onChangeEvent}

                />
                <MyInput
                    placeholder="confirm Password"
                    id="confirmPassword"
                    err={err}
                    onChange={onChangeEvent}

                />
                <br />
                <Button
                    variant="standard"
                    className="bg-info"
                    size="large"
                    onClick={createUser}
                >Register
                </Button>
            </div>
        </Box>

    )
}

export default User;