import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}

export const comparePassword = async (
    password: string,
    hashed: string,
)=> {
    return bcrypt.compare(password, hashed);
}