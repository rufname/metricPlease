function buildReplacer(regExp, unitLength, conversionFunction, newUnit) {
    return function (str) {
        let newStr = str;
        let match;
        while ((match = regExp.exec(str)) != null) {
            //let startIndex = match.index;
            //let matchedString = match[0];
            let numericValue = match[0]
                .substr(0, match[0].length - unitLength)
                .replace(",", "")
                .replace("−", "-")      //replace minus sign with normal -
                .trim();
            //remove trailing "-":
            if(numericValue.endsWith("-")) numericValue = numericValue.substr(0, numericValue.length - 1);
            //todo: round to 3 significant digits: 30480 m = 30500 m = 30.5 km
            //simple rounding:
            let convertedValue = Math.round(conversionFunction(numericValue) * 10) / 10;
            if (!isNaN(convertedValue)) {   //only replace if conversion resulted in numeric value
                newStr = newStr.replace(match[0], " " + convertedValue + " " + newUnit);
            }
            //console.log("match found at " + startIndex + " matchedString: " + matchedString + " numericValue: " + numericValue + " convertedValue: " + convertedValue);
        }
        return newStr;
    }
}

let inchReplacer1 = buildReplacer(/[0-9]+( |-|)in\./g, 3, function(x) {return x * 2.54;}, "cm");
let inchReplacer2 = buildReplacer(/[0-9]+( |-|)inch/g, 4, function(x) {return x * 2.54;}, "cm");
let inchReplacer3 = buildReplacer(/[0-9]+( |-|)inches/g, 6, function(x) {return x * 2.54;}, "cm");
let inchReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)in\./g, 3, function(x) {return x * 2.54;}, "cm");
let inchReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)inch/g, 4, function(x) {return x * 2.54;}, "cm");
let inchReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)inches/g, 6, function(x) {return x * 2.54;}, "cm");

let footReplacer1 = buildReplacer(/[0-9]+( |-|)ft\./g, 3, function(x) {return x * 0.3048;}, "m");
let footReplacer2 = buildReplacer(/[0-9]+( |-|)foot/g, 4, function(x) {return x * 0.3048;}, "m");
let footReplacer3 = buildReplacer(/[0-9]+( |-|)feet/g, 4, function(x) {return x * 0.3048;}, "m");
let footReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)ft\./g, 3, function(x) {return x * 0.3048;}, "m");
let footReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)foot/g, 4, function(x) {return x * 0.3048;}, "m");
let footReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)feet/g, 4, function(x) {return x * 0.3048;}, "m");

let yardReplacer1 = buildReplacer(/[0-9]+( |-|)yd\./g, 3, function(x) {return x * 0.9144;}, "m");
let yardReplacer2 = buildReplacer(/[0-9]+( |-|)yard/g, 4, function(x) {return x * 0.9144;}, "m");
let yardReplacer3 = buildReplacer(/[0-9]+( |-|)yards/g, 5, function(x) {return x * 0.9144;}, "m");
let yardReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)yd\./g, 3, function(x) {return x * 0.9144;}, "m");
let yardReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)yard/g, 4, function(x) {return x * 0.9144;}, "m");
let yardReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)yards/g, 5, function(x) {return x * 0.9144;}, "m");

let mileReplacer1 = buildReplacer(/[0-9]+( |-|)mi\./g, 3, function(x) {return x * 1.609344;}, "km");
let mileReplacer2 = buildReplacer(/[0-9]+( |-|)mile/g, 4, function(x) {return x * 1.609344;}, "km");
let mileReplacer3 = buildReplacer(/[0-9]+( |-|)miles/g, 5, function(x) {return x * 1.609344;}, "km");
let mileReplacer4 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)mi\./g, 3, function(x) {return x * 1.609344;}, "km");
let mileReplacer5 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)mile/g, 4, function(x) {return x * 1.609344;}, "km");
let mileReplacer6 = buildReplacer(/[0-9]{1,3},[0-9]{3}( |-|)miles/g, 5, function(x) {return x * 1.609344;}, "km");

let fahrenheitReplacer1 = buildReplacer(/([−-]|)[0-9]+( |-|)[Dd]egree [Ff]ahrenheit/g, 17, function(x) {return (x - 32)*(5/9);}, "°C");
let fahrenheitReplacer2 = buildReplacer(/([−-]|)[0-9]+( |-|)[Dd]egrees [Ff]ahrenheit/g, 18, function(x) {return (x - 32)*(5/9);}, "°C");

function checkString(str) {
    //we start with the longest replacers first
    str = inchReplacer1(inchReplacer2(inchReplacer3(inchReplacer4(inchReplacer5(inchReplacer6(str))))));
    str = footReplacer1(footReplacer2(footReplacer3(footReplacer4(footReplacer5(footReplacer6(str))))));
    str = yardReplacer1(yardReplacer2(yardReplacer3(yardReplacer4(yardReplacer5(yardReplacer6(str))))));
    str = mileReplacer1(mileReplacer2(mileReplacer3(mileReplacer4(mileReplacer5(mileReplacer6(str))))));
    str = fahrenheitReplacer1(fahrenheitReplacer2(str));
    return str;
}

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

//TODO: how to handle "two feet"? (two|three) feet => numeric word replacer?
//TODO: how to handle 10.5 inches ?

setTimeout(()=>{
    checkChildren(document.body);
}, 2000);
