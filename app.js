const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
;

// middleware
app.use(express.json())
// Add headers
app.use(function (req, res, next) {
    const allowedOrigins = ['https://hungry-goodall-28f444.netlify.app', 'http://localhost:3001'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    res.setHeader('set-cookie', 'samesite=None; secure');

    // Pass to next layer of middleware
    next();
});

// initialise routes
const LOTRRoutes = require("./routes/LOTRRoutes")

// use LOTR routes for base URL endpoint
app.use('/', LOTRRoutes)


app.listen(port, () => {
    console.log(`Example app listening at ${port}`) 
})


// for hostorical dadt api thing - might n it be used for hthis project
const fetchHISTData = async (res) =>{
    try {
        const json = await fetch("http://history.muffinlabs.com/date")
        const data = await json.json();
        res.send(data.data.Events)
 
    } catch (error) {
        console.log(`error is : ${error}`);
    }
}


// just to stop errors when testing Heroku app
app.get('/hist', (req, res)=>{
    fetchHISTData(res)
})