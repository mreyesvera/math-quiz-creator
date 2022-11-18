/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Provides utility functions that allow to manipulate properties
 * in objects and arrays. 
 */

export function nestedValues(element, properties, index, value){
    let currentValue = element[properties[index]];
    if(Array.isArray(currentValue)){
        index++;

        currentValue.forEach((obj) => {
            value = nestedValues(obj, properties, index, value);
        });
    } else {
        value = value === "" ? currentValue : (value + ", " + currentValue);
    }

    return value;
}

export function getValueFromProperty(element, property){
    let value = undefined; 

    if(property.includes(".")){
        const properties = property.split(".");

        value = nestedValues(element, properties, 0, "");
    } else {
        value = element[property];
    }

    if(value === true){
        value = "yes";
    } else if(value === false){
        value = "no";
    }

    return value;
}

