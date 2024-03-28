import './Appointments.css'
import { useEffect, useState } from 'react';
import { getAppointments } from '../../services/apiCalls';


export const Appointments = () => {


    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token)
    const [loadedData , setLoadedData] = useState (false);

    const [appointments, setAppointments] = useState([])
    const [appointmentsData, setAppointmentsData] = useState({

        appointment_date: "",
        service_id: ""

    });

    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {

        setCredentials(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    useEffect(() => {
        const getAppointmentsInfo = async () => {
            try {
                const fetched = await getAppointments(tokenStorage)
                setAppointments(fetched.data.appointments);
                setLoadedData(true)

            } catch (error) {
                console.log(error)
            }
        }
        if(!loadedData){
        getAppointmentsInfo()
    }

    }, [loadedData , tokenStorage])


return (
    <>
        <div className='appointmentsDesign'>
            <div>
                {
                    loadedData && appointments.length > 0 
                    ? (appointments.map(appointment => {
                         return (
                                <div key={appointment.id} className='appointStyle'>
                                <div>{appointment.service_id}</div>
                                <div>{appointment.service && appointment.service.name}</div>
                                <div>{appointment.appointment_date}</div>
                            </div>
                        )
                    })
                    ): ("null")
                }
            </div>
        </div>
    </>
)
}