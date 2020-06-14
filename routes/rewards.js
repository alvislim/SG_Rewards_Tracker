const pages = require('../controllers/reward')
const page = require('../controllers/users')

//Authentication
const { autheticationPassed } = require('../config/auth')

module.exports = app => {
    // Home Page
    app.get('/', page.homePage)

    // Dashboard
    app.get('/dashboard', autheticationPassed, page.dashboard)

    // Add new rewards
    app.post('/rewardspage', autheticationPassed, pages.addRewards)

    // Rewards page
    app.get('/rewardspage', autheticationPassed, pages.rewardsPage)

    // edit rewards page
    app.get('/rewardspage/:index/edit', autheticationPassed, pages.editRewardsPage )

    // update rewards
    app.put('/rewardspage/:index/', autheticationPassed, pages.updateRewards)

    // update checkbox
    app.put('/rewardspage/checkform/:index', autheticationPassed, pages.updateCheckBox)

    // delete rewards
    app.delete('/rewardspage/:index', autheticationPassed, pages.deleteRewardsEntry)

}