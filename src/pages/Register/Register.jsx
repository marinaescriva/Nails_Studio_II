
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';
import { CButton } from '../../common/CButton/CButton';

import './Register.css'

import { registerMe } from '../../services/apiCalls';
import { validation } from '../../utils/functions';

export const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    })
    const [userError, setUserError] = useState({
        nameError: "",
        surnameError: "",
        emailError: "",
        passwordError: "",

    })


    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {

        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }
    const checkError = (e) => {

        const error = validation(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))

    }

    const RegisterUser = async () => {

        try {

            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("All fields should be completed")
                }
            }
            const fetched = await registerMe(user);
            setMsgError(fetched.message);
            setTimeout(() => { navigate("/login") }, 820) 


        } catch (error) {
            setMsgError(error.message)
            return;
        }

    }

    return (
        <>
            <div className='registerDesign'>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <CustomInput
                    className={`custominputDesign ${userError.nameError !== "" ? "custominputDesignError" : ""}`}
                    type={"text"}
                    name={"name"}
                    value={user.name || ""}
                    placeholder={"name"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.nameError}</div>
                <CustomInput
                    className={`custominputDesign ${userError.surnameError !== "" ? "custominputDesignError" : ""}`}
                    type={"text"}
                    name={"surname"}
                    value={user.surname || ""}
                    placeholder={"surname"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.surnameError}</div>
                <CustomInput
                    className={`custominputDesign ${userError.emailError !== "" ? "custominputDesignError" : ""}`}
                    type={"email"}
                    name={"email"}
                    value={user.email || ""}
                    placeholder={"email"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.emailError}</div>

                <CustomInput
                    className={`custominputDesign ${userError.passwordError !== "" ? "custominputDesignError" : ""}`}
                    type={"password"}
                    name={"password"}
                    value={user.password || ""}
                    placeholder={"password"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.passwordError}</div>

                <CButton
                    className={"CButtonDesign"}
                    title={"Register Me"}
                    functionEmit={RegisterUser}
                />
                <div className='error'>{msgError}</div>
            </div>
        </>
    )
}