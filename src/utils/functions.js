
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

/*
    Check every error in array to display in every input
*/
export const errorExist = (errors, pathName) => {
    if (errors.length > 0) {
        return errors.find(value => value.path === pathName)
    }
}
