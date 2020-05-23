const page = require('../controllers/controller')

//Authentication
const { ensureAuthenticated } = require('../config/auth')

module.exports = app => {
    // Home Page
    app.get('/', page.homePage)

    // Dashboard
    app.get('/dashboard', ensureAuthenticated, page.dashboard)

}