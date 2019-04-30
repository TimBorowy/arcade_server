let request = require('request')
let fs = require('fs');

let controller = {

    encodeGameTitle: function (gameTitle) {
        return Buffer.from(gameTitle).toString('base64')
    },

    decodeGameTitle: function (gameTitle) {
        return Buffer.from(gameTitle, 'base64').toString('utf8')
    },

    fetchManifest: async function (url) {

        // Create new promise to wait for.
        let promise = new Promise((resolve, reject) => {
            request({
                url: url + 'manifest.json',
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {

                    // Resolve promise when we have result from our fetch.
                    resolve(body)

                }
            })
        })

        return await promise
    },

    loadGames: function () {
        return JSON.parse(fs.readFileSync('data/games.json'));
    },

    index: function (req, res) {

        let games = controller.loadGames()

        // Loop through games and add an instruction url.
        games.forEach(game => {
            game.instruction_url = '/' + controller.encodeGameTitle(game.title) + "/instructions"
        })

        // Render our template with our games array.
        res.render('index', {
            games: games
        })

    },

    gameInstructions: function (req, res) {

        let selectedGame = null

        controller.loadGames().some(game => {

            // look if url game title is found in our game list
            if (req.params.encodedGameTitle == controller.encodeGameTitle(game.title)) {
                
                selectedGame = game

                // Get the details from the manifest file in the game directory.
                controller.fetchManifest(game.url).then((manifest) => {
                    game.manifest = manifest

                    // Render template with game details.
                    res.render('instructions', { game: selectedGame })
                })

                // Break the loop, we have found our game
                return true
            } else {
                // Continue the loop
                return false
            }
        })

        // Only used when game is not found.
        if (selectedGame == null) {
            res.end("Item not found")
        }
    }
}

module.exports = controller
