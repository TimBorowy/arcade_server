let request = require('request')
let fs      = require('fs');
let http    = require('http');

let controller = {

    getGames: function () {
        return JSON.parse(fs.readFileSync('games.json'));
    },

    index: function (req, res) {

        let games = controller.getGames()

        games.forEach(game => {
            game.instruction_url = '/' + controller.encodeGameTitle(game.title) + '/instructions'
        })

        console.log(games)

        res.render('index', {
            games: games
        })
    },

    encodeGameTitle: function (gameTitle) {
        return Buffer.from(gameTitle).toString('base64')
    },

    decodeGameTitle: function (gameTitle) {
        return Buffer.from(gameTitle, 'base64').toString('utf8')
    },

    gameInstructions: function (req, res) {

        let selectedGame = []

        controller.getGames().forEach(game => {
            if (req.param('encodedGameTitle') == controller.encodeGameTitle(game.title)) {
                selectedGame = game
            }
        })

        console.log(selectedGame)

        // controller.getGames().map(game => {
        //     if (encodeGameTitle(game.title))
        // })

        res.render('instructions', {})
    }
}

module.exports = controller
