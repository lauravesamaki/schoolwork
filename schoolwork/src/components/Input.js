import {TextField} from '@mui/material';

export default function InputComponent(props) {
    return (
        <div>
            <TextField
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                label={props.label}
                required={props.required}
                type={props.type}
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