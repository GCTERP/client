const keys = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ]

export const numberToRoman = (num) => {
    
    if (isNaN(num)) return NaN;
    
    let digits = String(+num).split(""), roman = "", idx = 3

    while(idx--)
        roman = (keys[+digits.pop() + (idx * 10)] || "") + roman;
        
    return Array(+digits.join("") + 1).join("M") + roman;
}