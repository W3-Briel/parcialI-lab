/*
Dado el password alfanumérico, la longitud mínima de dicho password debe ser de 8 caracteres.
Dado el password alfanumérico, la longitud máxima de dicho password debe ser de 12 caracteres.
Dado el password alfanumérico, no puede contener espacios en blanco.
Dado el password alfanumérico, debe contener al menos uno de los siguiente caracteres !#$%&=
Dado el password alfanumérico, debe contener al menos un dígito número.
Dado el password alfanumérico, el último caracter no puede ser ninguno de los definidos en la regla 4
*/

// TRUE => se rompe la regla
let passRules = {
    "longitudMinima": (pass) => {
        return {
            "name": "longitudMinima",
            "message": "la longitud mínima de dicho password debe ser de 8 caracteres.",
            "status": pass.length < 8
        }
    },
    "longitudMaxima": (pass) => {
        return {
            "name": "longitudMaxima",
            "message": "la longitud máxima de dicho password debe ser de 12 caracteres.",
            "status": pass.length > 12
        }
    },
    "espaciosBlancos": (pass) => {
        return {
            "name": "espaciosBlancos",
            "message": "no puede contener espacios en blanco.",
            "status": pass.includes(" ")
        }
    },
    "caracterEspecial": (pass) => {
        return {
            "name": "caracterEspecial",
            "message": "debe contener al menos uno de los siguiente caracteres !#$%&=",
            "status": !pass.split("").some(caracter => "!#$%&=".includes(caracter))
        }
    },
    "numeros": (pass) => {
        return {
            "name": "numeros",
            "message": "debe contener al menos un dígito número.",
            "status": !pass.split("").some(caracter => "0123456789".includes(caracter))
        }
    },
    "ultimoCaracter": (pass) => {
        return {
            "name": "ultimoCaracter",
            "message": "el ultimo digito no puede ser ninguno de los siguientes: !#$%&=",
            "status": "!#$%&=".includes(pass[pass.length - 1])
        }
    }
}

/**
 * usuarios que no cumplen las reglas
 * @param {Array<object>} dataJson usuarios a validar
 * @param {Object} options objeto de configuracion
 * @param {boolean} options.reglas visibilidad de las reglas | default false
 * @param {boolean} options.validos solo usuarios validos | default false
 * @returns {Array<object> | [] } lista de usuarios
*/
function validador(data, options = { reglas: false, validos: false }) {
    let usuarios = []

    data.forEach((usr) => {
        let usrPass = usr.password

        const ruleNames = Object.keys(passRules);
        const nameRulesBreak = ruleNames
            .map(ruleName => ({
                ruleName,
                result: passRules[ruleName](usrPass)
            }))
            .filter(item => item.result.status)
            .map(item => ({ [item.result.name]: item.result.message }));

        if (!nameRulesBreak.length && options.validos) {
            usuarios.push({ "userName": usr.userName, "email": usr.email })
        } else if (!!nameRulesBreak.length == !options.validos) {
            let schemaUsr = {
                "userName": usr.userName,
                "email": usr.email
            }
            if (options.reglas) schemaUsr["reglasIncumplidas"] = nameRulesBreak
            usuarios.push(schemaUsr)
        }
    })

    return usuarios
}
module.exports = { validador }