
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
export const concatName = (firstName, lastName, username) => {

    if (isNull(firstName) || isNull(lastName)) {
        return username;
    }

    return firstName + ' ' + lastName

}


/*
    Convert date into relative date
*/
export const diffInDays = (date) => {
    let timeStamp = new Date(date);
    let now = new Date()
    let secondsPast = (now.getTime() - timeStamp) / 1000;

    if (secondsPast < 60) {
        return parseInt(secondsPast) + 's';
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + 'm';
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + 'h';
    }
    if (secondsPast > 86400) {
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
        return day + " " + month + year;
    }
}