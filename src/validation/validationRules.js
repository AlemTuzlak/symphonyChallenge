import validator from 'validator';
import { 
    checkIfThereAreAtLeastTwoWords, validateEmail, trimAllWhitespace, 
    hasOnlyLettersAndNumbers, hasOnlyLetters, checkIfPasswordsMatch, checkPasswordValidity
} from './validationMethods';

export const passwordMatch = (field, state, message) => {
    return {
        field: field,
        method: checkIfPasswordsMatch,
        args: state,
        validWhen: true,
        message: `${message}`
    }
}

export const passwordValid = (field, message) => {
    return {
        field: field,
        method: checkPasswordValidity,
        args: [],
        validWhen: true,
        message: `${message}`
    }
}
export const notEmpty = (field, message) => {
    return {
        field: field,
        method: validator.isEmpty,
        args: [{ ignore_whitespace: true}],
        validWhen: false,
        message: `${message}`
    }
}

export const validEmailFormat = (field, message) => {
    return {
        field: field,
        method: validator.isEmail,
        validWhen: true,
        message: `${message}`
    }
}

export const isAlphanumeric = (field, message) => {
    return {
        field: field,
        method: hasOnlyLettersAndNumbers,
        args: [ 'en-US' ],
        validWhen: true,
        message:  `${message}`
    }
}
export const isAlpha = (field, message) => {
    return {
        field: field,
        method: hasOnlyLetters,
        validWhen: true,
        message:  `${message}`
    }
}
export const passwordLengthContentRule = (field, message) => {
    return {
        field: field,
        method: validator.isLength,
        args: [{ min: 6 }],
        validWhen: true,
        message: `${message}`
    }
}

export const atLeastTwoWordsRule = (field, message) => {
    return {
        field: field,
        method: checkIfThereAreAtLeastTwoWords,
        validWhen: true,
        message: `${message}`
    }
}

export const notEmptyButContainsOnlyWhitespaces = (field, message) => {
    return {
        field: field,
        method: trimAllWhitespace,
        validWhen: false,
        message: message
    }
}

export const isValidEmailWhenNotEmpty = (field, message) => {
    return {
        field: field,
        method: validateEmail,
        validWhen: true,
        message: message
    }
}
export const isNumericRule =(field, message) => {
    return {
        field: field,
        method: validator.isNumeric,
        validWhen: true,
        message: message
    }
}

export const validStars = (field, message) => {
    return {
        field: field,
        method: validator.isInt,
        args: [{min: 1, max: 5}],
        validWhen: true,
        message: message
    }
}
export const isStrictlyNumericRule = (field, message) => {
    return {
        field: field,
        method: validator.isNumeric,
        args: [{no_symbols: true}],
        validWhen: true,
        message: message
    }
}
