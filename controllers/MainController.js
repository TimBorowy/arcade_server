let request = require('request')
let fs = require('fs');
let http = require('http');

let controller = {}

index: function (req, res) {
    res.render('index', {})
},
howToPlay: function (req, res) {

    // get game title from url params
    let gameTitle = req.param('game')
    let response = res



    // make get request to manifest.json
    // Todo: make url less hardcoded
    request('http://localhost:8080/' + gameTitle + '/manifest.json', { json: true }, (err, res, body) => {
        let errors = ''

        if (err) {
            errors += err
            return console.log(err)
        }

        let manifest = body

        if (!typeof manifest == "object") {
            errors += "Manifest is empty or not found"
        }

        // render template with data from manifest
        response.render('buttons', { manifest, errors })
    })
}
}
module.exports = controller
