import './Appointments.css'
import { useEffect, useState } from 'react';
import { getAppointments } from '../../services/apiCalls';
import { CButton } from '../../common/CButton/CButton';
import dayjs from 'dayjs';
import { CustomInput } from '../../common/Custominput/Custominput';

export const Appointments = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [appointments, setAppointments] = useState([]);
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token)

    const [appointmentsData, setAppointmentsData] = useState({
        appointment_date: "",
        service_id: ""
    })

    const appointmentInputHandler = (e) => {
        setAppointmentsData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const getAppointmentInfo = async () => {
            try {
                const fetched = await getAppointmentInfo(tokenStorage)
                setAppointments(fetched.data)

            } catch (error) {
                console.log(error)

            }
        }

    }, [appointments])

    const [msgError, setMsgError] = useState("");
    const doAppointment = async () => {

        try {

            for (let element in credentials) {
                if (credentials[element] === "") {
                    throw new Error("All fields should be completed")
                }
            }
            const fetched = await registerMe(credentials);
            setMsgError(fetched.message);
            setTimeout(() => { navigate("/login") }, 820)


        } catch (error) {
            setMsgError(error.message)
            return;
        }

    }

    const newAppointment = async () => {

        try {

            for (let element in credentials) {
                if (credentials[element] === "") {
                    throw new Error("All fields should be completed")
                }
            }
            const fetched = await registerMe(credentials);
            setMsgError(fetched.message);
            setTimeout(() => { navigate("/profile") }, 820) 


        } catch (error) {
            setMsgError(error.message)
            return;
        }

    }

    return (
        <>
            <div className='appointmentsDesign'> 
            <CustomInput
                    className={`custominputDesign`}
                    type={"text"}
                    name={"name"}
                    value={dayjs || ""}
                    placeholder={"date"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <CButton
                    className={"CButtonDesign"}
                    title={"New appointment"}
                    functionEmit={newAppointment}
                />
            </div>
        </>
    )
}