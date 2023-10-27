import User from '../models/on-call/user.model.js';

class AuthenticationService {
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
