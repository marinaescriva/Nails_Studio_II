import './Appointments.css'
import { useEffect, useState } from 'react';
import { getAppointments, createAppointment } from '../../services/apiCalls';
import { getStudioServices } from '../../services/apiCalls';
import { CDropdown } from '../../common/CDropDown/CDropDown';
import { CustomInput } from '../../common/Custominput/Custominput';
import { CButton } from '../../common/CButton/CButton';

const dataUser = JSON.parse(localStorage.getItem("passport"));


export const Appointments = () => {


    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(dataUser?.token)
    const [loadedData, setLoadedData] = useState(false);
    const [studioServices, setStudioServices] = useState([])

    const [appointments, setAppointments] = useState([])
    const [appointmentsData, setAppointmentsData] = useState({

        appointment_date: "",
        service_id: ""

    });

    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {

        setAppointmentsData(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const newAppointment = async () => {
        try {
            const response = await createAppointment(tokenStorage, appointmentsData)
    
            console.log(response)
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {

        if (studioServices.length === 0) {
            const StudioServices = async () => {
                try {
                    const fetched = await getStudioServices()
                    setStudioServices(fetched.data);

                } catch (error) {
                    console.log(error)

                }
            }
            StudioServices()
        }

    }, [studioServices])

    useEffect(() => {
        const getAppointmentsInfo = async () => {
            try {

                const fetched = await getAppointments(tokenStorage)
                setAppointments(fetched.data);
                setLoadedData(true)
                console.log(fetched.data)


            } catch (error) {
                console.log(error.message)
            }
        }
        if (!loadedData) {
            getAppointmentsInfo()
        }

    }, [loadedData, tokenStorage])


    return (
        <>
            <div className='appointmentsDesign'>
                <div className='appointmentForm'>
                <div className='appointmentForm2'>
                    <h4>Book an appointment</h4>
                    <CustomInput
                        className={"inputDesign"}
                        type="date"
                        name="appointment_date"
                        value={appointmentsData.appointment_date || ""}
                        placeholder="DD/MM/YYYY"
                        disabled={""}
                        functionChange={(e) => inputHandler(e)}

                    />
                    <CDropdown
                        buttonClass={""}
                        dropdownClass={""}
                        title={"service_id"}
                        items={studioServices}
                        onChangeFunction={(e) => {inputHandler(e)}}
                    />
                    </div>
                    <CButton
                            className={"CButtonDesign"}
                            title={"New appointment"}
                            functionEmit={newAppointment}
                        />
                    <div className='appointmentForm2'>

                        <h4>Your appointments</h4>
                        {
                            loadedData && appointments.length > 0
                                ? (appointments.map(appointment => {
                                    {/*devuelve los appointments del usuario*/ }
                                    return (
                                        <div key={appointment.id} className='appointStyle'>
                                            <div>{appointment.service.id}</div>
                                            <div>{appointment.service && appointment.service.name}</div>
                                            <div>{appointment.appointmentDate}</div>
                                            <div className='CButton' id={appointment.id} onClick={() => { }}> OK</div> {/*deleteFunction*/}
                                        </div>
                                    )
                                })
                                ) : ("null")
                        }
                    </div>

                </div>
            </div>
        </>
    )
}