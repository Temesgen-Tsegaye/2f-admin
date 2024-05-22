import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string |undefined> {
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
    }

    
}
