
import './Custominput.css';

export const CustomInput = ({className, type, name, value, placeholder, disabled, functionChange, functionBlur}) => {
    return(
        <input
            className={className}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={functionChange}
            onBlur={functionBlur}
           
        />
    )
}
