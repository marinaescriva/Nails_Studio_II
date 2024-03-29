import './Profile.css';
import '../../common/CButton/CButton.css';
import '../../common/Custominput/Custominput.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { myProfile, updateProfile} from '../../services/apiCalls';
import { CustomInput } from '../../common/Custominput/Custominput';
import { Header } from '../../common/Header/Header';
import { CButton } from '../../common/CButton/CButton';
import { validation } from '../../utils/functions';


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
   
    const checkError = (e) => {
        const error = validation(e.target.name, e.target.value);
    
        setUserError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error,
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
    }, [])

    const updateData = async () => {

        try {
            const fetched = await updateProfile(tokenStorage, user)
            setUser((prevState) => ({
                ...prevState,
                name: fetched.name || prevState.name,
                surname: fetched.surname || prevState.surname,
                email: fetched.email || prevState.email         
            }));

            setWrite("disabled")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
        
        <div className='profileDesign'>
            {!loadedData
            ? (<div>Wait a moment....</div>)
            : (<div>
                <CustomInput
                    className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""}`}
                    type={"name"}
                    name={"name"}
                    value={user.name || ""}
                    placeholder=""
                    disabled={write}
                    functionChange={(e) =>inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.nameError}</div>
                 <CustomInput
                    className={`custominputDesign ${userError.surnameError !== "" ? "custominputDesignError" : ""}`}
                    type={"surname"}
                    name={"surname"}
                    value={user.surname || ""}
                    placeholder=""
                    disabled={"disabled"}
                    functionChange={(e) =>inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.surnameError}</div>
                 <CustomInput
                    className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                    type={"email"}
                    name={"email"}
                    value={user.email || ""}
                    placeholder=""
                    disabled={"disabled"}
                    functionChange={(e) =>inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{userError.emailError}</div>
                <CButton
                    className={write === "" ? "CButtonDesign2 CButtonDesign" : "CButtonDesign"}
                    title={write === "" ? "Confirm" : "Edit"}
                    functionEmit={write === "" ? updateData : () => setWrite("")}
                />
               </div>)}
        </div>
       
        </>
    )
}





