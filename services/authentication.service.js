import User from '../models/on-call/user.model.js';

class AuthenticationService {
     /**
     * Attempts to log in a user with the provided username and password.
     * @param {string} username - The username of the user attempting to log in.
     * @param {string} password - The password provided by the user for authentication.
     * @returns {Promise<Object>} A Promise that resolves to a JSON representation of the authenticated user.
     * @throws {Error} If the user is not found or the password is invalid.
     */
    async login(username, password) {
        try {
            const user = await User.findOne({
                where: { username }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const isValid = await user.authenticate(password);

            if (!isValid) {
                throw new Error('Invalid password');
            }

            return user.toJSON();
        } catch (err) {
            throw err;
        }
    }
}

export default new AuthenticationService();
