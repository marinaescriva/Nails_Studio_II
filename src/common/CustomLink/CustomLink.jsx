import { useNavigate } from 'react-router-dom';
import './CustomLink.css';

export const CustomLink = ({ title, destination}) => {
    //title y destination refieren a path y element en body
    const navigate = useNavigate();

    return (
        <div className= "navigateDesign" onClick ={() => navigate (destination)}>
            {title}
        </div>
    )
}