import './Register.css'
import { useState, useEffect } from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';

export const Register = () => {

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        console.log(e.target.value)
    }


    return (
        <div className='registerDesign'>
            <CustomInput
                className={"custominputDesign"}
                type={"text"}
                name={"name"}
                value={user.name || ""}
                functionChange={(e) => inputHandler (e)}
            />
            <CustomInput
                className={"custominputDesign"}
                type={"text"}
                name={"surname"}
                value={user.surname || ""}
                functionChange={(e) => inputHandler (e)}
            />
            <CustomInput
                className={"custominputDesign"}
                type={"text"}
                name={"email"}
                value={user.email || ""}
                functionChange={(e) => inputHandler (e) }
            />
            <CustomInput
                className={"custominputDesign"}
                type={"text"}
                name={"password"}
                value={user.password || ""}
                functionChange={(e) => inputHandler (e) }
            />
               {/* <div className='loginButton' onClick={logMe}>Log in</div>
            <div>{msgError}</div> */}
        </div>
    )
}