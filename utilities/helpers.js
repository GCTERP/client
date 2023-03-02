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