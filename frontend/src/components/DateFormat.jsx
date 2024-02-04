export default function FormatDate(props) {
    const inputDate = new Date(props.date);

    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const year = inputDate.getFullYear();

    let newDate;

    if(props.language === 'fin') {
        newDate = `${day}.${month}.${year}`;
    }
    else {
        newDate = `${year}-${month}-${day}`;
    }

    return newDate;
};