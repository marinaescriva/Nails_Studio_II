import './Appointments.css'
import { useEffect, useState } from 'react';
import { getAppointments, createAppointment, deleteAppointment  } from '../../services/apiCalls';
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

        appointmentDate: "",
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
            const appointmentsOld = appointments
            appointmentsOld.push(response.data)
            setAppointments(appointmentsOld)

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

            } catch (error) {
                console.log(error.message)
            }
        }
        // if (!loadedData) {
            getAppointmentsInfo()
        // }

    }, [appointments])

    const deletingAppointment = async (appointmentId) => {
        try {
            const fetched = await deleteAppointment(tokenStorage , appointmentId)
            console.log(fetched)
            if (fetched.success){
            setAppointments(appointments.filter(items => items.id !== appointmentId))

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='appointmentsDesign'>
                <div className='appointmentForm'>
                    <div className='appointmentForm2'>
                        <h4 className='appointmentsText'>Book an appointment</h4>
                        <CustomInput
                            className={"inputDesign"}
                            type="date"
                            name="appointmentDate"
                            value={appointmentsData.appointmentDate || ""}
                            placeholder="DD/MM/YYYY"
                            disabled={""}
                            functionChange={(e) => inputHandler(e)}
                        />

                        <CDropdown
                            buttonClass={""}
                            dropdownClass={""}
                            title={"service_id"}
                            items={studioServices}
                            onChangeFunction={(e) => { inputHandler(e) }}
                        />
                    </div>
                    <CButton
                        className={"CButtonDesign"}
                        title={"New appointment"}
                        functionEmit={() => newAppointment(appointments)}
                    />
                    <div className='appointmentForm2'>

                        <h4 className='appointmentsText'>Your appointments</h4>
                     
                        {
                           
                            loadedData && appointments.length > 0
                                ? (appointments.map(appointment => {
                                    {/*devuelve los appointments del usuario*/ }
                                    return (
                                        <div key={appointment.id} className='appointStyle'>
                                            <div className='appointmentsInfo'>{appointment.service.id}</div>
                                            <div className='appointmentsInfo'>{appointment.service && appointment.service.name}</div>
                                            <div className='appointmentsInfo'>{appointment.appointmentDate}</div>
                                            <div className='CButton' id={appointment.id} onClick={() => { }}> OK</div> {/*deleteFunction*/}
                                            <CButton
                                                className={"CButtonDesign"}
                                                title={"Delete appointment"}
                                                functionEmit={() => deletingAppointment(appointment.id)}
                                            />
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