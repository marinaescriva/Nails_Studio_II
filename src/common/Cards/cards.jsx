import "./Cards.css"

export const Card = ({className, title}) => {
    return(
        <div className={className}>
        {title}

        </div>
    )
}