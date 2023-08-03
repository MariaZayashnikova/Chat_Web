import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const validate = (values) => {
    const errors = {}

    if (!values.password) {
        errors.password = true
    } else if (
        !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/i.test(
            values.password
        )
    ) {
        errors.password =
            'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков'
    }

    if (!values.email) {
        errors.email = true
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }

    return errors
}

export { validate }

function createDisplayedChats(result, displayedChats, valueActiveCases) {
    let i = 0
    result.forEach((elem) => {
        i++
        if (i > valueActiveCases) return
        else displayedChats.push(elem)
    })
}

export { createDisplayedChats }

function calculateDate(timestamp) {
    let time

    let dayNow = new Date().getDate()
    let monthNow = new Date().getMonth()
    let yearNow = new Date().getFullYear()

    let date = new Date(timestamp)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    if (dayNow === day && monthNow === month && yearNow === year) {
        time = moment(timestamp).fromNow()
    } else {
        time = moment(timestamp).format('DD MMMM YYYY, HH:mm')
    }

    return time
}

export { calculateDate }

function CalcStars({ element, property, iconSize }) {
    let result = [],
        size = iconSize + 'x'
    for (let i = 0; i < element[property]; i++) {
        result.push(<FontAwesomeIcon icon={['fas', 'star']} key={i} color="yellow" size={size} />)
    }
    return result
}

export { CalcStars }