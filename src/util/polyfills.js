import 'classlist-polyfill';
import Promise from 'promise-polyfill'; 

// Promise
if (!window.Promise) {

    window.Promise = Promise;

}

// Element.remove
if (!Element.prototype.hasOwnProperty('remove')) {

    Object.defineProperty(Element.prototype, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }
    });

}

// Object.assign
if (typeof Object.assign !== 'function') {

    Object.assign = function(target) {

        if (!target) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        const to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
            
            const nextSource = arguments[index];

            if (nextSource) {
                
                for (const nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        
                        to[nextKey] = nextSource[nextKey];

                    }
                }
            }
        }

        return to;
    
    };
}
