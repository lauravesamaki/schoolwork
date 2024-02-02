export default function CourseDiv(props) {
    return (
        <div>
            <h3>{props.courseName}</h3>
            <p>{props.code}</p>
            <p>{props.teacher}</p>
        </div>
    );
}