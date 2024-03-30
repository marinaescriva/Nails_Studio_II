import { useEffect, useState } from "react";
import "./Admin.css";
import { getUsers , deleteUser } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { useNavigate } from "react-router-dom";

export const Admin = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [Users, setUsers] = useState([])
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token);
    const navigate = useNavigate()

    const allUsers = async () => {
        try {
            const fetched = await getUsers(tokenStorage)
            setUsers(fetched.data)

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if (Users.length === 0) {
           
            allUsers()
        }
    }, [Users, tokenStorage])

    useEffect(() => {

        if (!tokenStorage) {
            navigate("/")
            /* redirect to home if you are not logged */
        }
    }, [tokenStorage , navigate])

    const deletingUsers = async (UserId) => {
        try {
            const fetched = await deleteUser(tokenStorage, UserId)
            
            if (!fetched.success) {
                setUsers(Users.filter(items => items.id !== UserId))
            }
            allUsers();
        } catch (error) {
            console.log(error.message)

        }
    }

return (
    <>
        <div className="adminDesign">
            {
                Users.length > 0
                    ? (Users.map(User => {
                        return (
                            <div className='userDesign'>
                                <div>{User.name}</div>
                                <div>{User.surname}</div>
                                <div>{User.email}</div>

                                <CButton
                                className={'CButtonDesign'}
                                title={`Delete ${User.name} `}
                                functionEmit={() => deletingUsers(User.id)}
                                />
                            </div>
                        )
                    }))
                    : ("")
            }

        </div>
    </>
)
}

