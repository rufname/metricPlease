function checkChildren(node) {
    let children = node.childNodes;
    for(let idx = 0; idx < children.length; idx++) {
        if (children[idx].nodeType === 3) {
            let str = children[idx].nodeValue;
            let newStr = checkString(str);
            if (str !== newStr) {
                children[idx].nodeValue = newStr;
            }
        } else {
            //Do not recurse over script elements:
            if (children[idx].tagName !== "SCRIPT") checkChildren(children[idx]);
        }
    }
}

function buildReplacer(regExp, unitLength, factor, newUnit) {
    return function (str) {
        let newStr = str;
        let match;
        while ((match = regExp.exec(str)) != null) {
            //let startIndex = match.index;
            //let matchedString = match[0];
            let numericValue = match[0]
                .substr(0, match[0].length - unitLength)
                .replace(",", "")
                .replace("-", "")
                .trim();
            //todo: round to 3 significant digits: 30480 m = 30500 m = 30.5 km
            //simple rounding:
            let convertedValue = Math.round(numericValue * factor * 10) / 10;
            if (!isNaN(convertedValue)) {   //only replace if conversion resulted in numeric value
                newStr = newStr.replace(match[0], " " + convertedValue + " " + newUnit);
            }
            //console.log("match found at " + startIndex + " matchedString: " + matchedString + " numericValue: " + numericValue + " convertedValue: " + convertedValue);
        }
        return newStr;
    }
}

//TODO: how to handle "two feet"? (two|three) feet => numeric word replacer?
//TODO: how to handle 10.5 inches ?

let inchReplacer1 = buildReplacer(/[0-9]+( |-|)in./g, 3, 2.54, "cm"),
    inchReplacer2 = buildReplacer(/[0-9]+( |-|)inch/g, 4, 2.54, "cm"),
    inchReplacer3 = buildReplacer(/[0-9]+( |-|)inches/g, 6, 2.54, "cm"),
    inchReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)in./g, 3, 2.54, "cm"),
    inchReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)inch/g, 4, 2.54, "cm"),
    inchReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)inches/g, 6, 2.54, "cm"),

    footReplacer1 = buildReplacer(/[0-9]+( |-|)ft./g, 3, 0.3048, "m"),
    footReplacer2 = buildReplacer(/[0-9]+( |-|)foot/g, 4, 0.3048, "m"),
    footReplacer3 = buildReplacer(/[0-9]+( |-|)feet/g, 4, 0.3048, "m"),
    footReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)ft./g, 3, 0.3048, "m"),
    footReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)foot/g, 4, 0.3048, "m"),
    footReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)feet/g, 4, 0.3048, "m"),

    yardReplacer1 = buildReplacer(/[0-9]+( |-|)yd./g, 3, 0.9144 , "m"),
    yardReplacer2 = buildReplacer(/[0-9]+( |-|)yard/g, 4, 0.9144 , "m"),
    yardReplacer3 = buildReplacer(/[0-9]+( |-|)yards/g, 5, 0.9144 , "m"),
    yardReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)yd./g, 3, 0.9144, "m"),
    yardReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)yard/g, 4, 0.9144, "m"),
    yardReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)yards/g, 5, 0.9144, "m"),

    mileReplacer1 = buildReplacer(/[0-9]+( |-|)mi./g, 3, 1.609344 , "km"),
    mileReplacer2 = buildReplacer(/[0-9]+( |-|)mile/g, 4, 1.609344 , "km"),
    mileReplacer3 = buildReplacer(/[0-9]+( |-|)miles/g, 5, 1.609344 , "km"),
    mileReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)mi./g, 3, 1.609344, "km"),
    mileReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)mile/g, 4, 1.609344, "km"),
    mileReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)miles/g, 5, 1.609344, "km");

function checkString(str) {
    //we start with the longest replacers first
    str = inchReplacer1(inchReplacer2(inchReplacer3(inchReplacer4(inchReplacer5(inchReplacer6(str))))));
    str = footReplacer1(footReplacer2(footReplacer3(footReplacer4(footReplacer5(footReplacer6(str))))));
    str = yardReplacer1(yardReplacer2(yardReplacer3(yardReplacer4(yardReplacer5(yardReplacer6(str))))));
    str = mileReplacer1(mileReplacer2(mileReplacer3(mileReplacer4(mileReplacer5(mileReplacer6(str))))));
    return str;
}

setTimeout(()=>{
    checkChildren(document.body);
}, 2000);
