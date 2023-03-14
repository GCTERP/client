import validator from "validator"

const keys = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ]

export const numberToRoman = (num) => {
    
    if (isNaN(num)) return NaN;
    
    let digits = String(+num).split(""), roman = "", idx = 3

    while(idx--)
        roman = (keys[+digits.pop() + (idx * 10)] || "") + roman;
        
    return Array(+digits.join("") + 1).join("M") + roman;
}

export const setSize = (value) => {
    
    let len = 0;
    
    if (typeof value == typeof '') 
        len = value.length > 0 ? value.length : 1
    else 
        len = value.toString().length > 0 ? value.toString().length : 1;
    
        return len.toString();
}

// Sanitizers
export const sanitizeName = (value) => {

    if(typeof(value) != typeof(""))
        return value

    value = value.trim()
    
    let shrinked = "", space = false
    for(let i = 0; i < value.length; i++) {

        let char = value.charAt(i)
        if(char.match(/[A-Za-z ]/))
            if(char != " ") {
                shrinked += space ? " " + char : char
                space = false
            }   else space = true
    }

    let words = shrinked.trim().split(' ')

    for(let i = 0; i < words.length; i++) {

        if(words[i].length == 1) {
            words[i] = words[i].toUpperCase()
            continue
        }

        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()
    }

    return words.join(' ')
}

// Validators
export const isName = (value) => {

    if(typeof(value) != typeof(""))
        return false
    
    return validator.isAlpha(value)
}

export const isEmail = (value) => {

    return validator.isEmail(value)
}