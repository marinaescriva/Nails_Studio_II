import { useState, useEffect } from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';
import './Login.css';

export const Login = () => {

    const [credenciales, setCredenciales] = useState({ //el array con las credenciales actuales del usuario // la funcion que actualiza ese estado
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        // In the CustomInput component, there is a function called functionChange with the inputHandler object. 
        // This function triggers an onChange event in the setCredenciales field.
        
        setCredenciales((prevState) => ({
            ...prevState, // Shallow copy of the previous state to avoid direct modification. (prevState is a placeholder)
                          // (...) creates a new instance.
            [e.target.name]: e.target.value // e.target accesses the name property of the object to be modified. [] because it access to the property refeared in e.target.name
            //e.target.value access to the field "name" to modified the data.
            // if i write in email, e.target.name is .. email.
            // if i write in password, e.target.name is .. password.
        }));
    };
    
    return (
        <div className='loginDesign'>
            <pre>{JSON.stringify(credenciales, null, 2)}</pre>
            <CustomInput
                design="inputDesign"
                type="text"
                name="email" // e.target.name ref to field name and access to "email", this means in credenciales object has email: password:.
                // the property in credenciales should be "email" or "password" as the content in the CustomInput name="email" and name="password"
                value={credenciales.email || "" }
                placeholder="your email"
                functionChange={inputHandler}
            />
            <CustomInput
                design={credenciales.errors ? "inputDesign inputError" : "inputDesign"} 
                type="password"
                name="password"
                value={credenciales.password || "" }
                placeholder="your password"
                functionChange={inputHandler}
            />
        </div>
    )
}