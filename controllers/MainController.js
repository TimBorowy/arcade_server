let request = require('request')

let controller = {

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
            if (err) { return console.log(err); }

            let manifest = body

            // render template with data from manifest
            response.render('buttons', { manifest })
        })
    }
}
module.exports = controller