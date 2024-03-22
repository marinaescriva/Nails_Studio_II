
import './CustomImput.css';
export const CustomImput = ({design, type, name, value, placeholder,functionChange, onBlur}) => {
    return(
        <input
            className={design}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={functionChange}
            onBlur={onBlur}
        
        />
    )
}
