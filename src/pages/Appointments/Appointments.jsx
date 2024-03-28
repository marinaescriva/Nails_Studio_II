import './Appointments.css'
import { useEffect, useState } from 'react';
import { getAppointments } from '../../services/apiCalls';
import { CButton } from '../../common/CButton/CButton';

export const Appointments = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [appointments, setAppointments] = useState([])

    useEffect(() => {

        if (appointments.length === 0) {
            const Appoint = async () => {
                try {
                    const fetched = await getAppointments()
                    setAppointments(fetched.data);

                } catch (error) {
                    console.log(error)

                }
            }
            Appoint()
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


    return (
        //header?
        <div className='appointmentsDesign'>
            <div className=''>
                <div>
                    {
                        appointments.length > 0
                            ? (appointments.map(appointment => {
                                return (
                                    <div className='inputDesign'>
                                        <div>{appointment.id} </div>
                                        <div>{appointment.appointment_date}</div>
                                        <div>{appointment.service_id}</div>
                                    </div>
                                )
                            }))
                            : ("")
                    }
                </div>
                <CButton
                    className={"CButtonDesign"}
                    title={"Register Me"}
                    functionEmit={doAppointment}
                />
                <div className='error'>{msgError}</div>
            </div>
        </div>
    )

}