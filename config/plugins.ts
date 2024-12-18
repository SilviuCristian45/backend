module.exports = {
    'users-permissions': {
        config: {
            jwt: {
                // Disable JWT if you want cookie-based auth
                expiresIn: '1d', // Token expiration (you can adjust this as needed)
            },
            cookie: {
                enabled: true,
                name: 'strapi_jwt', // Cookie name
                maxAge: 60 * 60 * 24, // Cookie expiration in seconds (1 day)
                httpOnly: true, // Make cookie accessible only via HTTP
                secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
                sameSite: 'Strict', // You can set this based on your needs
            },
        },
    },
};