
import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';
import { CButton } from '../../common/CButton/CButton';

import './Register.css'

import { registerMe } from '../../services/apiCalls';
import { validation } from '../../utils/functions';

export const Register = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    })

    const [credentialsError, setCredentialsError] = useState({
        nameError: "",
        surnameError: "",
        emailError: "",
        passwordError: "",

    })


    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {

        setCredentials(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }
    
    const checkError = (e) => {

        const error = validation(e.target.name, e.target.value);

        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))

    }
    
    const RegisterUser = async () => {

        try {

            for (let element in credentials) {
                if (credentials[element] === "") {
                    throw new Error("All fields should be completed")
                }
            }
            const fetched = await registerMe(credentials);
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
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
                <CustomInput
                    className={`custominputDesign ${credentialsError.nameError !== "" ? "custominputDesignError" : ""}`}
                    type={"text"}
                    name={"name"}
                    value={credentials.name || ""}
                    placeholder={"name"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.nameError}</div>
                <CustomInput
                    className={`custominputDesign ${credentialsError.surnameError !== "" ? "custominputDesignError" : ""}`}
                    type={"text"}
                    name={"surname"}
                    value={credentials.surname || ""}
                    placeholder={"surname"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.surnameError}</div>
                <CustomInput
                    className={`custominputDesign ${credentialsError.emailError !== "" ? "custominputDesignError" : ""}`}
                    type={"email"}
                    name={"email"}
                    value={credentials.email || ""}
                    placeholder={"email"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.emailError}</div>

                <CustomInput
                    className={`custominputDesign ${credentialsError.passwordError !== "" ? "custominputDesignError" : ""}`}
                    type={"password"}
                    name={"password"}
                    value={credentials.password || ""}
                    placeholder={"password"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.passwordError}</div>

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