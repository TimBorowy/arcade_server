const MainController = require('../controllers/MainController')
const MenuController = require('../controllers/MenuController')

let router = function (express) {

    var mainRouter = express.Router()

    mainRouter.get('/', MenuController.index)
    mainRouter.get('/:encodedGameTitle/instructions', MenuController.gameInstructions)

    return mainRouter
}

module.exports = router

