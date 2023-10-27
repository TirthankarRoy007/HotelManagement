import User from '../models/on-call/user.model.js';

class UserService {
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user.toJSON();
        } catch (err) {
            throw err;
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user.toJSON();
        } catch (err) {
            throw err;
        }
    }

    async updateUser(id, data) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update(data);
            return user.toJSON();
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
            return user.toJSON();
        } catch (err) {
            throw err;
        }
    }

    async listUsers() {
        try {
            const users = await User.findAll();
            return users.map(user => user.toJSON());
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();