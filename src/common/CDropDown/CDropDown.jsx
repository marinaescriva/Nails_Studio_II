export const CDropdown = ({ buttonClass, dropdownClass, title, items, onChangeFunction }) => {


    return (
        <select className={buttonClass} onChange={onChangeFunction} name={title}>
            <option value="" disabled selected> {title} </option>
            {items.map((item, index) => (
                <option key={index} value={item.id} className={dropdownClass}>{item.name}</option>
            ))}
        </select>
    );
};