export const generateRandomName = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomWords = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];

    let hash = '';
    for (const i of randomNumber.toString()) {
        hash += String.fromCharCode(97 + parseInt(i));
    }
    return randomWords[randomNumber % randomWords.length] + hash;
}