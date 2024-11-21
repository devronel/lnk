import moment from "moment"

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
    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: '%d seconds',
            ss: '%d seconds',
            m: "%d minute",
            mm: "%d minutes",
            h: "%d hour",
            hh: "%d hours",
            d: "%d day",
            dd: "%d days",
            w: "%d week",
            ww: "%d weeks",
            M: "%d month",
            MM: "%d months",
            y: "%d year",
            yy: "%d years"
        }
    })
    return moment(date).startOf(getTime(date)).fromNow();

}

/*
    Functions for parse JSON to Javascript Object
*/
export const parseJson = (value) => {
    let jsonToObject = JSON.parse(value)
    return jsonToObject
}


/*
    Get time in the data
*/
export const getTime = (value) => {
    let dt = new Date(value)
    let hours = dt.getHours()
    let minutes = dt.getMinutes()
    let seconds = dt.getSeconds()
    return `${hours}:${minutes}:${seconds}`
}