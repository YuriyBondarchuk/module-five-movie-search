import './Input.scss';

interface InputProps {
    type?: string;
    placeholder?: string;
    name?: string; 
    emitChange: (value: string) => void;
}

function Input(props: InputProps) {
    const {type, placeholder, emitChange, name} = props;

    return ( <div className='input'>
        <input name={name} type={type} placeholder={placeholder} onChange={(e) => emitChange(e.target.value)}/>
    </div> );
}

Input.defaultProps = {
    type: 'text',
    placeholder: 'Some text',
    name: 'input'
}

export default Input;