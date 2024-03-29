import { CDropdown } from '../../common/CDropDown/CDropDown'
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
            <div className='homeDesign'>soy home</div>
            <CDropdown
                buttonClass={"ButtonDrop"}
                dropdownClass={"ServicesStyle"}
                title={"Confirmar"}
                items={studioServices}
                onChangeFunction={() => { }}

            />
        </>
    )
}