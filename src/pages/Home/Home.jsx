import { CDropdown } from '../../common/CDropDown/CDropDown'
import { CButton } from '../../common/CButton/CButton'
import { getStudioServices } from '../../services/apiCalls'
import './Home.css'
import '../../common/CDropDown/CDropDown.css'
import { useEffect, useState } from 'react'

export const Home = () => {

    // const [services, setServices] = useState([])
    const [loadedData, setLoadedData] = useState(false);

    const [studioServices, setStudioServices] = useState([])

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


    return (
        <>
            <div className='homeDesign'>
                <div><h2>Conócenos</h2>
                    <div>
                        <h5>Nos encargamos de hacerte una manicura y perfecta con preciosos diseños, siempre cuidando la seguridad de cada clienta. </h5>
                        <h5> Disponemos de las mejores técnicas y creamos los diseños más modernos del mundo de las uñas.</h5>


                        <h4>Condiciones de reserva </h4>
                        <h5>
                            Anticipo de reserva: Se piden 15€ de anticipo a la hora de hacer la reserva. La reserva se  aplicará al precio total del coste de la manicura.
                        </h5>
                        <h5>Cancelación de cita : Se puede cancelar la cita con 48 horas de antelación sin ningún coste. Cancelar dentro de las 48 horas previas a la cita, los 15€ de la reserva se cobrarán sin posibilidad de devolución.
                        </h5>
                        <h5>Cambio de cita: Es posible cambiar la cita reservada, siempre con 48 horas de antelación. Pasadas las 48 horas, no será posible cambiar el día y fecha de la cita.
                            Rogamos asistir a tiempo a su cita, porque dejamos el tiempo exacto para cada servicio, por lo tanto si el retraso es mas de 15 minutos se realizara lo que deje el tiempo hasta acabar el servicio por respecto a la siguente clienta.</h5>
                    </div></div>
            </div>
        </>
    )
}