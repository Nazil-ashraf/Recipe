import './atomStyle.scss';

export const Button = ({ handleClick, title, className }) => {

    return (
        <div
            onClick={handleClick}
            className={`button ${className}`}
        >
            {title}
        </div>
    )
}


export default Button;