import { useEffect, useState } from 'react';
import './Studio.css'
import { getStudioServices } from '../../services/apiCalls';
import { CDropdown } from '../../common/CDropDown/CDropDown';

export const Studio = () => {

    const dataUser = JSON.parse(localStorage.getItem("passport"));
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
        //header?
        <div className='studioDesign'>
            <div className='studioServiceDesign'>
                <div>
                    {
                        studioServices.length > 0
                            ? (studioServices.map(studioService => {
                                return (
                                    <div className='studioService'>
                                        <div>{studioService.id}</div>
                                        <div>{studioService.name}</div>
                                        <div>{studioService.description}</div>
                                    </div>
                                )
                            }))
                            : ("")
                    }
                    {/* <CDropdown
                        buttonClass={"a"}
                        dropdownClass={"b"}
                        title={"patata"}
                        items={studioServices}
                        onChangeFunction= { () => {}}
                    /> */}
                    {/* <select className={"a"} onChange={() => { }} name={"a"}>
                        <option value="" disabled selected> {"b"} </option>
                        {studioServices.map((item, index) => (
                            <option key={index} value={item.id} className={"c"}>{item.name}</option>
                        ))}
                    </select> */}
                </div>
            </div>
        </div>
    )
}