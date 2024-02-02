import PopUp from "./PopUp";

export default function Alert(props) {
    return (
        <div className="Alerts">
            <div className='Alert'>                     
                    <PopUp severity='success' message={props.message} />
                </div>
                <div className='Alert-error'>
                    <PopUp severity='error' message='Something went wrong!' />
                </div>
        </div>
    );
}