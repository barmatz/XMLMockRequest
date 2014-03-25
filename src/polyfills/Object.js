if (!Object.defineProperty) {
    Object.defineProperty = function (obj, prop, descriptor) {
        'use strict';
        obj[prop] = descriptor.value;
    };
}

if (!Object.defineProperties) {
    Object.defineProperties = function (obj, props) {
        'use strict';
        for (var prop in props) {
            if (prop in props) {
                Object.defineProperty(obj, prop, props[prop]);
            }
        }
    };
}