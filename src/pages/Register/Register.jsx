
import { useState, useEffect } from 'react';
import { CustomInput } from '../../common/Custominput/Custominput';
import './Register.css'
import { CButton } from '../../common/CButton/CButton';

export const Register = () => {

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })

    const inputHandler = (e) => {

        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }


    return (
        <div className='registerDesign'>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <CustomInput
                className={"inputDesign"}
                type={"text"}
                name={"name"}
                value={user.name || ""}
                functionChange={(e) => inputHandler(e)}
            />
            <CustomInput
                className={"inputDesign"}
                type={"text"}
                name={"surname"}
                value={user.surname || ""}
                functionChange={(e) => inputHandler(e)}
            />
            <CustomInput
                className={"inputDesign"}
                type={"text"}
                name={"email"}
                value={user.email || ""}
                functionChange={(e) => inputHandler(e)}
            />
            <CustomInput
                className={"inputDesign"}
                type={"text"}
                name={"password"}
                value={user.password || ""}
                functionChange={(e) => inputHandler(e)}
            />
            <CButton
            className={"CButtonDesign"}
            title={"Log Me"}
            />
        </div>
    )
}