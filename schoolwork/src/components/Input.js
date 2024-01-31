import {TextField} from '@mui/material';

export default function InputComponent(props) {
    return (
        <div>
            <TextField
                onChange={props.onChange}
                value={props.value}
                label={props.label}
                required={props.required}
                type={props.type}
                placeholder={props.placeholder}
                sx={{
                    height: '30px',
                    margin: '20px',
                    borderRadius: '5px',
                    fontSize: '0.5rem',
                }}
            />
        </div>
    );
}