export const getRandomWord = async () => {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1');
    const data = await response.json();
    return data[0];
}