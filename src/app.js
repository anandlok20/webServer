const express = require('express')
const path = require('path')
const bd = require('./data')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


//for express to set for using the api
const com = express()


//path to render
const apath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//to set for handelbars
com.set('view engine', 'hbs')
com.set('views', viewPath)
hbs.registerPartials(partialPath)

//to setup static dir
com.use(express.static(apath))


com.get('', (req, res) => {
    res.render('index', {
        title: 'HF4',
        author: 'Akshay'
    })
})

com.get('/about', (req, res) => {
        const x = JSON.stringify(bd.book[1].data.name)
        res.render('about', { x, title: 'FG4' })
            // console.log(bd.book)
    })
    //weather-----------------------------------
com.get('/weather', (req, res) => {
    res.render('weather')
})

com.get('/weatherJs', (req, res) => {
    const rq = req.query
    if (!rq.address) {
        return res.send({ error: "Pleae provide the address.." })
    }
    //calling of the function
    geocode(rq.address, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.send({ error })
        }
        weather(latitude, longitude, (err, fdata) => {
            if (err) {
                return res.send({ error })
            }
            res.send({
                fdata,
                placeName,
                address: rq.address
            })

        })

    })

})


com.get('/help', (req, res) => {
    res.render('help', { title: 'EGF4' })
})

com.get('/json', (req, res) => {
    res.send({ bd })
})

com.get('*', (req, res) => {
    res.render('error', { title: 'EGF4' })
})

com.listen(3000, () => {
    console.log("server is running at port no 3000...")
})