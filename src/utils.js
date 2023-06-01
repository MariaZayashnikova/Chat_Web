import moment from 'moment'

function createDisplayedFilterResults(
    allResultFilter,
    displayedFilterResults,
    valueActiveCases
) {
    let i = 0
    allResultFilter.forEach((elem) => {
        i++
        if (i > valueActiveCases) {
            return
        } else {
            displayedFilterResults.push(elem)
        }
    })
}

export { createDisplayedFilterResults }

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