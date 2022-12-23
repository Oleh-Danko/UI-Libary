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
    return this[0].getAttribute(attributeName);
};

$.prototype.toggleAttr = function(attributeName, attributeValue) {
    for (let i = 0;  i < this.length; i++) {
        if (this[i].hasAttribute(attributeName)) {
            this[i].removeAttribute(attributeName);
        } else if (attributeName && !attributeValue) {
            this[i].setAttribute(attributeName, '');
        } else {
            this[i].setAttribute(attributeName, attributeValue);
        }
    }
    return this;
};


