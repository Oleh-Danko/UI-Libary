import $ from '../core';

$.prototype.setAttr = function(attributeName, attributeValue) {
    for (let i = 0;  i < this.length; i++) {
        if(!attributeName && !attributeValue) {
            return this;
        } else if (attributeName && !attributeValue) {
            return this[i].setAttribute(attributeName, '');
        } else {
           return this[i].setAttribute(attributeName, attributeValue);
        }   
    }
};

$.prototype.getAttr = function(attributeName) {
    for (let i = 0;  i < this.length; i++) {
        if (!this[i].getAttribute(attributeName)) {
            continue;
        }
        this[i].getAttribute(attributeName);
    }
    return this;
};


// $.prototype.toggleAtr = function(attributeName) {
//     for (let i = 0;  i < this.length; i++) {
//         if (!this[i].setAttribute) {
//             return this;
//         }
//         this[i].toggleAttribute(attributeName);
//         // if (this[i].getAttribute === attribute, value) {
//         //     this[i].removeAttribute(attribute, value)
//         // } else {
//         //     this[i].setAttribute(attribute, value);
//         // }
//     }
//     return this;
// };