import { useEffect, useState } from 'react';
import './Studio.css'
import { getStudioServices } from '../../services/apiCalls';


export const Studio = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [studioServices, setStudioServices] = useState([])

    useEffect(() => {

        if (studioServices.length === 0) {
            const StudioServices = async () => {
                try {
                    const fetched = await getStudioServices()
                    setStudioServices(fetched.data);
                    console.log(getStudioServices)
                    console.log(fetched)

                } catch (error) {
                    console.log(error)

                }
            }
            StudioServices()
        }

    }, [studioServices])

    return (
        //header?
        <div className='studioDesign'>
            <div className='studioServiceDesign'>
                <div>
                    {
                        studioServices.length > 0
                            ? (studioServices.map(studioService => {
                                return (
                                    <div className='studioService'>
                                        <div className='studio1'>{studioService.id}</div>
                                        <div className='studio1'>{studioService.name}</div>
                                        <div className='studio1'>{studioService.description}</div>
                                    </div>
                                )
                            }))
                            : ("")
                    }
                    
                </div>
            </div>
        </div>
    )
}