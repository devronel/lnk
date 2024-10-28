
/*
    Null checking
*/
export const isNull = (value) => {
    if (value === null) {
        return true
    }

    return false
}

/*
    Date format to YYYY-MM-DD
*/
export const dateFormat = (value) => {
    const date = new Date(value)
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day <= 9) {
        day = '0' + day
    }

    if (month <= 9) {
        month = '0' + month
    }
    const formatted = `${date.getFullYear()}-${month}-${day}`;
    return formatted
}