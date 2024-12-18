
module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/auth/login',
            handler: 'auth.login',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/auth/logout',
            handler: 'auth.logout',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/auth/isAuthenticated',
            handler: 'auth.isAuthenticated',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};