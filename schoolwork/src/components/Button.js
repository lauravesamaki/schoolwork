import { Button } from "@mui/material";

export default function ButtonComponent(props) {
    return (
        <Button
        variant="contained"
        onClick={props.onClick}
        sx={{
            minWidth: "20%",
            height: "30px",
            margin: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#000",
            outline: "none",
            fontSize: "0.75rem",
            "&:focus": {
            border: "1px solid #000",
            outline: "none",
            },
            "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
            },
        }}
        >
        {props.text}
        </Button>
    );
}