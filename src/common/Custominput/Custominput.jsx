
import './Custominput.css';

export const CustomInput = ({design, type, name, value, placeholder,functionChange}) => {
    return(
        <input
            className={design}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={functionChange}
           
        />
    )
}
