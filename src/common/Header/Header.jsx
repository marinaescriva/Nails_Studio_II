
import { useNavigate } from "react-router-dom";
import { CustomLink } from "../CustomLink/CustomLink";
import { LogOutLink } from "../LogOutLink/LogOutLink";
import "./Header.css";

export const Header = () => {

    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"));

    const logOut = () => {

        localStorage.removeItem("passport")
        navigate("/login");

    }

    const admin = () => {
        navigate("/admin")
    }

    return (
        <div className='headerDesign'>
            <CustomLink
                title="Home"
                destination="/"
            />
            <CustomLink
                title="Studio"
                destination="/studio"
            />
            {passport?.token ? (

                <div className="menu">
                    <CustomLink
                        title={passport?.decoded?.name}
                        destination="/profile"
                    />
                    <CustomLink
                        title="Appointments"
                        destination="/appointments"
                    />

                    {passport?.token && passport?.decodificated?.role === "super_admin" ? (

                        <div onClick={admin}>
                            <CustomLink title={"SuperAdmin"} destination={"/admin"} />
                        </div>

                    ) : (null)
                    }
                    <div onClick={logOut}>
                        <CustomLink
                            title={"logOut"}
                            destination="/"
                        />
                    </div>


                </div>
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

            )}
        </div>
    );
};