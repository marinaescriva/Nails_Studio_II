import "./LogOutLink.css";
import { useNavigate } from "react-router-dom";

/* to do */

export const LogOutLink = ({ title, destination}) => {
    //title y destination refieren a path y element en body
    const navigate = useNavigate();

    return (
        <div className= "navigateDesign" onClick ={() => navigate (destination)}>
            {title}
        </div>
    )
}