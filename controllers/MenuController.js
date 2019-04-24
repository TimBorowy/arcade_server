let request = require('request')
let fs = require('fs');
let http = require('http');

let controller = {

    encodeGameTitle: function (gameTitle) {
        return Buffer.from(gameTitle).toString('base64')
    },

    decodeGameTitle: function (gameTitle) {
        return Buffer.from(gameTitle, 'base64').toString('utf8')
    },

    fetchManifest: async function (url) {

        // create new promise to wait for
        let promise = new Promise((resolve, reject) => {
            request({
                url: url + 'manifest.json',
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {

                    // resolve promise when we have result from our fetch
                    resolve(body)

                }
            })
        })

        return await promise
    },

    loadGames: function () {
        return JSON.parse(fs.readFileSync('games.json'));
    },

    index: function (req, res) {

        let games = controller.loadGames()

        /* let manifests = games.map(game => {
            //console.log(game.url)
            return controller.fetchManifest(game.url)
        }) */


        games.forEach(game => {

            controller.fetchManifest(game.url).then((manifest) => {
                game.manifest = manifest
                game.url = '/' + controller.encodeGameTitle(game.manifest.title) + '/instructions'
            })


        })

        res.render('index', {
            games: games
        })
    },

    gameInstructions: function (req, res) {

        let selectedGame = []

        controller.getGames().forEach(game => {
            if (req.param('encodedGameTitle') == controller.encodeGameTitle(game.title)) {
                selectedGame = game
            }

            // fetchManifest(selectedGame.)
        })

        res.render('instructions', { game: selectedGame })
    }
}

module.exports = controller
