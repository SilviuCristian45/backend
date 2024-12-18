// Next.js --- /api/login.js
const axios = require('axios');
export default  {

    async login(ctx, req, res) {
        console.log('Request Body:', ctx.request.body); // Log incoming data
        const { identifier, password } = ctx.request.body;

        if (!identifier || !password) {
            return ctx.badRequest('Identifier and password are required.');
        }

        const users = await strapi.plugins['users-permissions'].services.user.fetchAll()
        const user = users.filter( user => user.username === identifier)[0]

        if (!user) {
            return ctx.badRequest('User not found.');
        }

        const isValidPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(
            password,
            user.password
        );

        if (!isValidPassword) {
            return ctx.badRequest('Invalid password.');
        }

        const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
            id: user.id,
        });

        ctx.cookies.set('JWT', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });

        return ctx.send({
            user:user,
            jwt,
        });
    },
    logout: async (ctx)=> {
        ctx.cookies.set('JWT', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: 'strict',
            expires: new Date(0), // Set expiry date to past
            path: '/', // Ensure the cookie is cleared across the entire domain
        });

        // Send a response to indicate successful logout
        return ctx.send({ message: 'Logged out successfully' });
    },
    isAuthenticated: async (ctx) => {
        const token = ctx.cookies.get('JWT') || ctx.request.headers.authorization;

        if (!token)
            return ctx.unauthorized('You are not authenticated');

        try {
            // Validate JWT
            const decoded = await strapi.plugins['users-permissions'].services.jwt.verify(token);

            // If JWT is valid, return the user data
            return ctx.send({ message: 'Authenticated', user: decoded });
        } catch (error) {
            return ctx.unauthorized('Invalid or expired token');
        }
    }
}