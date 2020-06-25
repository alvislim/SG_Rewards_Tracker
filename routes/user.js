const page = require('../controllers/users')

module.exports = app => {
        // Login Page
        app.get('/login', page.login)

        // Register Page
        app.get('/register', page.register)

        // forgot password page
        app.get('/forgotpw', page.forgotpw)

        // reset password page
        app.get('/reset/:id?', page.resetpwpage)

        // Register Handler
        app.post('/register', page.registerHandler)

        // Login Handler
        app.post('/login', page.loginHandler)

        // Logout Handler
        app.get('/logout', page.logoutHandler) 

        // reset password email request trigger
        app.post('/forgotpw', page.resetpwemail)

        // change the new reset pw in DB
        app.put('/reset/:id', page.resetpw)
    }