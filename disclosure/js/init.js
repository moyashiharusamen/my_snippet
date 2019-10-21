(function () {
    'use strict';

    var rootEl = document.documentElement;
    var klass = {
        js: 'js-invalid'
    };

    if (rootEl.classList.contains(klass.js)) {
        rootEl.classList.remove(klass.js);
    }
}());
