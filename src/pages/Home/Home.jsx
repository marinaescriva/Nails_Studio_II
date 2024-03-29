import { CDropdown } from '../../common/CDropDown/CDropDown'
import {CButton} from '../../common/CButton/CButton'
import { getStudioServices } from '../../services/apiCalls'
import './Home.css'
import '../../common/CDropDown/CDropDown.css'
import { useEffect, useState } from 'react'

export const Home = () => {

    // const [services, setServices] = useState([])
    const [loadedData, setLoadedData] = useState(false);

    const [studioServices, setStudioServices] = useState([])

    // const newAppointment = async () => {
    //     try {
    //         const createNew = await CreateAppointment ()
    //     } catch (error) {
    //         console.log(error)
            
    //     }
    // }

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
            <div className='homeDesign'>soy home</div>
            <select className={"a"} onChange={()=>{}} name={"a"}>
            <option value="" disabled selected> {"b"} </option>
            {studioServices.map((item, index) => (
                <option key={index} value={item.id} className={"c"}>{item.name}</option>
            ))}
        </select>
            {/* <CButton
            className={"ButtonDrop"}
            title={"view1"}
            functionEmit={newAppointment}

            /> */}
        </>
    )
}