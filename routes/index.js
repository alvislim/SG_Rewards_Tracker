const page = require('../controllers/controller')

//Authentication
const { autheticationPassed } = require('../config/auth')

module.exports = app => {
    // Home Page
    app.get('/', page.homePage)

    // Dashboard
    app.get('/dashboard', autheticationPassed, page.dashboard)

    // Add new rewards
    app.post('/rewardspage', autheticationPassed, page.addRewards)

    // Rewards page
    app.get('/rewardspage', autheticationPassed, page.rewardsPage)

    // edit rewards page
    app.get('/rewardspage/:index/edit', autheticationPassed, page.editRewardsPage )

    // update rewards
    app.put('/rewardspage/:index/', autheticationPassed, page.updateRewards)

    // update checkbox
    app.put('/rewardspage/checkform/:index', autheticationPassed, page.updateCheckBox)

    // delete rewards
    app.delete('/rewardspage/:index', autheticationPassed, page.deleteRewardsEntry)
}