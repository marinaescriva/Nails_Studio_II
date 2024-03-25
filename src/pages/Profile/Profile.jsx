import { useState, useEffect } from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';

import { decodeToken } from "react-jwt"
import { CButton } from '../../common/CButton/CButton';
import { useNavigate } from "react-router-dom";

import './Profile.css';

import { loginMe } from '../../services/apiCalls';
import { validation } from '../../utils/functions';

/* dataUser */

export const Profile = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));

    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token)

    const [credentials, setCredentials] = useState({ //el array con las credenciales actuales del usuario // la funcion que actualiza ese estado
        email: "",
        password: ""
    })

    const [credentialsError, setCredentialsError] = useState({ //el array con las credenciales actuales del usuario // la funcion que actualiza ese estado
        emailError: "",
        passwordError: ""
    })

    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {
        // In the CustomInput component, there is a function called functionChange with the inputHandler object. 
        // This function triggers an onChange event in the setCredenciales field.

        setCredentials((prevState) => ({
            ...prevState, // Shallow copy of the previous state to avoid direct modification. (prevState is a placeholder)
            // (...) creates a new instance.
            [e.target.name]: e.target.value // e.target accesses the name property of the object to be modified. [] because it access to the property refeared in e.target.name
            //e.target.value access to the field "name" to modified the data.
            // if i write in email, e.target.name is .. email.
            // if i write in password, e.target.name is .. password.
        }));
    };

    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);

        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    };


    const logMe = async () => {

        const fetched = await loginMe(credentials);

        if (!fetched.success) {

            setMsgError(fetched.message)
            return;
        }

        const decodificated = decodeToken(fetched.token)


        localStorage.setItem("passport", JSON.stringify(passport))
        setMsgError(`Bienvenido ${decodificated.name}`)
        console.log("user logged")

        setTimeout(() => { navigate("/") }, 800) //redirige al home
    }

    return (
        <>
            <div className='loginDesign'>
                {/* <pre>{JSON.stringify(credenciales, null, 2)}</pre> */}
                <CustomInput
                    className={`custominputDesign ${credentialsError.emailError !== "" ? "custominputDesignError" : ""}`}
                    type="email"
                    name="email" // e.target.name ref to field name and access to "email", this means in credenciales object has email: password:.
                    // the property in credenciales should be "email" or "password" as the content in the CustomInput name="email" and name="password"
                    value={credentials.email || ""}
                    placeholder="your email"
                    disabled={""}
                    functionChange={inputHandler}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.emailError}</div>
                <CustomInput
                    className={`custominputDesign ${credentialsError.passwordError !== "" ? "custominputDesignError" : ""}`}
                    type="password"
                    name="password"
                    value={credentials.password || ""}
                    placeholder="your password"
                    disabled={""}
                    functionChange={inputHandler}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.passwordError}</div>
                <CButton
                    className={"CButtonDesign"}
                    title={"Login Me"}
                    functionEmit={logMe}
                />
                <div>{msgError}</div>
            </div>
        </>
    )
}