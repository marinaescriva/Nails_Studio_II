import { useEffect, useState } from "react";
import "./Admin.css";
import { getUsers } from "../../services/apiCalls";

// import { decodeToken } from "react-jwt";
// import { validation } from "../../utils/functions";


export const Admin = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [Users, setUsers] = useState([])
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token)


    useEffect(() => {
        if (Users.length === 0) {
            const allUsers = async () => {
                try {
                    const fetched = await getUsers(tokenStorage)

                    setLoadedData(true)

                    setUsers(fetched.data)
                    console.log(fetched.data)

                } catch (error) {
                    console.log(error)

                }
            }
            allUsers()
        }
        }, [Users])

    useEffect(() => {

        if (!tokenStorage) {
            navigate("/")
            /* redirect to home if you are not logged */
        }
    }, [tokenStorage])

    return (
        <>
            <div className="adminDesign">
                VISTA SUPERADMIN

            </div>
            <div>
                {
                    Users.length > 0
                        ? (Users.map(User => {
                            return (
                                <div className='studioService'>
                                    <div>{User.id}</div>
                                    <div>{User.name}</div>
                                    <div>{User.surnarme}</div>
                                    <div>{User.email}</div>
                                </div>
                            )
                        }))
                        : ("")
                }

            </div>
        </>
    )
}

