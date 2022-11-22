export function verifyPassword(password: string) {
    const errorMessage = {
        length: '',
        upperCase: '',
        lowerCase: '',
        number: ''
    }
    const passwordLength = password.length < 8
    passwordLength ? errorMessage.length = "Senha precisa ter no mínimo de 8 caracteres" : errorMessage.length = '';

    const passwordUpper = password.match("^(?=.*?[A-Z])")
    !passwordUpper ? errorMessage.upperCase = "Senha precisa ter no mínimo uma letra MAIÚSCULA" : errorMessage.upperCase = '';

    const passwordNumber = password.match("^(?=.*?[0-9])")
    !passwordNumber ? errorMessage.number = "Senha precisa ter no mínimo um número" : errorMessage.number = '';

    return errorMessage
}

