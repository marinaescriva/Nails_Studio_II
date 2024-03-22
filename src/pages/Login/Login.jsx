import { useState, useEffect } from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';
import './Login.css';

export const Login = () => {

    const [credenciales, setCredenciales] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        console.log(e.target.value);
    };
    return (
        <div className='loginDesign'>
            <CustomInput
                design="inputDesign"
                type="text"
                name="email"
                value={credenciales.email || "" }
                placeholder="your email"
                functionChange={inputHandler}
            />
            <CustomInput
                design="inputDesign"
                type="password"
                name="password"
                value={credenciales.password || "" }
                placeholder="your password"
                functionChange={inputHandler}
            />
        </div>
    )
}