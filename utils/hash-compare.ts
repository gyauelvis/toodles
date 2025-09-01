import bcrypt from 'bcryptjs'

export const hashCode = async (code: string) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(code, salt);
    return hash;
}

export const compare = async (code: string, hash: string) => {
    try {
        const comp = await bcrypt.compare(code, hash);
        return comp;
    } catch (e) {
        console.log(e)
        throw new Error('Error comparing')
    }
}
