const weatherData = document.querySelector('form')
const place = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherData.addEventListener('submit', (e) => {

    e.preventDefault()
    const search = place.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
        // console.log(search)
    fetch('http://localhost:3000/weatherJs?address=' + search).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.placeName
                msg2.textContent = data.fdata
            }
        })
    })
})