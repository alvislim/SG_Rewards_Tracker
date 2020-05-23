const page = require('../controllers/controller')

module.exports = app => {
        // Login Page
        app.get('/login', page.login)

        // Register Page
        app.get('/register', page.register)

        // Register Handler
        app.post('/register', page.registerHandler)

        // Login Handler
        app.post('/login', page.loginHandler)

        // Logout Handler
        app.get('/logout', page.logoutHandler)
    
    }