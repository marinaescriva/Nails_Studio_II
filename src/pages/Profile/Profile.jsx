import './Profile.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { myProfile } from '../../services/apiCalls';
import { CustomInput } from '../../common/Custominput/Custominput';
import { CButton } from '../../common/CButton/CButton';


const dataUser = JSON.parse(localStorage.getItem("passport")); ///??????

/* dataUser */

export const Profile = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const navigate = useNavigate()
    const [write, setWrite] = useState("disabled");
    const [loadedData, setLoadedData] = useState(false);
    const [tokenStorage, setTokenStorage] = useState (dataUser?.token)

    const [user, setUser] = useState ({
        name: "",
        surname: "",
        email:""
    })

    const [userError, setUserError] = useState ({
        nameError: "",
        surnameError: "",
        emailError:""
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        
        if(!tokenStorage){
            navigate("/")
        /* redirect to home if you are not logged */
        }
    }, [tokenStorage])

    useEffect (()=> {

        const getmyProfile = async() => {
            try {
                const fetched = await myProfile(tokenStorage)

                setLoadedData(true)

                setUser({
                    name: fetched.data.name,
                    surname: fetched.data.surname,
                    email: fetched.data.email,
                })

            } catch (error) {
                console.log(error)
                
            }
        }
        getmyProfile ()

    }, [user])





    return (
        <>
        
        <div className='profileDesign'>
            {!loadedData
            ? (<div>Wait a moment....</div>)
            : (<div>
                <CustomInput
                    className={`custominputDesign ${userError.nameError !== "" ? "custominputDesignError" : ""}`}
                    type="text"
                    name="name"
                    value={user.name || ""}
                    placeholder="your name is"
                    disabled={write}
                    functionChange={inputHandler}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.nameError}</div>
                 <CustomInput
                    className={`custominputDesign ${userError.surnameError !== "" ? "custominputDesignError" : ""}`}
                    type="text"
                    name="surname"
                    value={user.surname || ""}
                    placeholder="your surname is"
                    disabled={write}
                    functionChange={inputHandler}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.surnameError}</div>
                 <CustomInput
                    className={`custominputDesign ${userError.emailError !== "" ? "custominputDesignError" : ""}`}
                    type="email"
                    name="email"
                    value={user.email || ""}
                    placeholder="your email is"
                    disabled={write}
                    functionChange={inputHandler}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.emailError}</div>
                <CButton
                    className={write === "" ? "CButtonDesign2 CButtonDesign" : "CButtonDesign"}
                    title={write === "" ? "Confirm" : "Edit"}
                    functionEmit={write === "" ? () => updateData() : () => setWrite("")}
                />
               </div>)}
        </div>
       
        </>
    )
}





