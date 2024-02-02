import Alert from "@mui/material/Alert";

export default function PopUp(props) {
    return (
        <Alert 
            variant='filled'
            severity={props.severity}
            sx={{
                position: 'absolute',
                }}>
                {props.message}
        </Alert>
    );
}