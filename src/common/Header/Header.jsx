
import { CustomLink } from "../CustomLink/CustomLink";
import "./Header.css";

export const Header = () => {
    const token = true;
    return (
        <div className='headerDesign'>
            <CustomLink
                title="Home"
                destination="/"
            />
            {
                token 
                    ? (<div>
                          <CustomLink
                            title="name"
                            destination="/profile"
                        />
                        <CustomLink
                            title="Log-out"
                            destination="/"
                        />

                    </div>)

                    : (<div>
                        <CustomLink
                            title="Login"
                            destination="/login"
                        />
                        <CustomLink
                            title="Register"
                            destination="/register"
                        />

                    </div>)

            }
        </div>
    )
}
