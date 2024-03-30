import { getUsers } from "../../services/apiCalls";
import "./Admin.css";







export const Admin = () => {

    const dataUser = JSON.parse(localStorage.getItem("super"));
    const [Users, setUsers] = useState([])


    useEffect (()=> {
        if ( Users.length === 0){
            const allUsers = async () => {
                try {
                    const fetched  = await getUsers()
                    setUsers(fetched.data); {/*ES con data?*/}
                }catch (error){
                    console.log(error.message)
                }
            }
            allUsers()
        }
    })

}