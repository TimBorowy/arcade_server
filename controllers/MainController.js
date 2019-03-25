

let controller = {

    index: function (req, res) {
        res.render('index', {})
    },
    howToPlay: function (req, res) {
        res.render('buttons', {})
    }
}
module.exports = controller