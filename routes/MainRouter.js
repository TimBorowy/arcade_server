const MainController = require('../controllers/MainController')

let router = function (express) {

    var mainRouter = express.Router()
    mainRouter.get('/', MainController.index)
    mainRouter.get('/howtoplay', MainController.howToPlay)


    return mainRouter
}

module.exports = router

