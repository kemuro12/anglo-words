export const requiredField = value => {
    if(value) return undefined;

    return 'Обязательное поле!';
}

export const maxLengthCreator = (maxLength) => value => {
    if (value.length < maxLength) return `Длинна не меньше ${maxLength} символов.`

    return undefined;
}