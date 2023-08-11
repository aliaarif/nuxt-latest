// utilities/bcrypt.js
const bcrypt = import('bcryptjs');

export default async () => {
    async function hashPassword(password) {
        try {
            const saltRounds = 10; // Salt rounds determine the complexity of the hash.
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


