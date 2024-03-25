
import { CustomLink } from "../CustomLink/CustomLink";
import { LogOutLink } from "../LogOutLink/LogOutLink";
import "./Header.css";

export const Header = () => {


    const logOut = () => {

    }

    return (
        <div className='headerDesign'>
            {sessionStorage.getItem("token") === "true"
                ? (<>

                    <CustomLink
                        title="Home"
                        destination="/"
                    />
                    <CustomLink
                        title={sessionStorage.getItem("name")}
                        destination="/profile"
                    />
                    <LogOutLink title="Log Out" onClick={() => logOut()} />
                    
                </>
                ) : (
                            <div className="menu">
                                <CustomLink
                                    title="Register"
                                    destination="/register"
                                />
                                <CustomLink
                                    title="Login"
                                    destination="/login"
                                />
                            </div>
                        )
                }
        </div>
    )
}
