import { Button } from "@mui/material";

export default function ButtonComponent(props) {
    return (
        <Button
        variant="contained"
        onClick={props.onClick}
        type={props.type}
        onSubmit={props.onSubmit}
        sx={{
            minWidth: "20%",
            height: "30px",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            outline: "none",
            fontSize: "0.75rem",
            fontFamily: "Kalam, sans-serif",
            "&:focus": {
            border: "1px solid #000",
            outline: "none",
            },
            "&:hover": {
            backgroundColor: "#000",
            color: "#fff",
            },
        }}
        >
        {props.text}
        </Button>
    );
}