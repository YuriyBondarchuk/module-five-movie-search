import './Button.scss';

interface ButtonProps {
    text?: string;
    classAdd?: string;
    emmitClick: () => void;
}

function Button({ text, classAdd, emmitClick }: ButtonProps) {
    return (
        <button className={classAdd ? classAdd + " button" : "button"} onClick={emmitClick}>
            {text}
        </button>
    );
}

export default Button;
