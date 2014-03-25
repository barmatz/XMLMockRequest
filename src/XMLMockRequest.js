/*exported XMLMockRequest*/
var XMLMockRequest = (function () {
    'use strict';

    function XMLMockRequest() {
        this.__middlewares__ = {};
    }

    Object.defineProperties(XMLMockRequest.prototype, {
        onabort: {
			value: null
		},
        onerror: {
			value: null
		},
        onload: {
			value: null
		},
        onloadend: {
			value: null
		},
        onloadstart: {
			value: null
		},
        onprogress: {
			value: null
		},
        onreadystatechange: {
			value: null
		},
        ontimeout: {
			value: null
		},
        readyState: {
			value: 0
		},
        response: {
			value: ''
		},
        responseText: {
			value: ''
		},
        responseType: {
			value: ''
		},
        responseXML: {
			value: null
		},
        status: {
			value: 0
		},
        statusText: {
			value: ''
		},
        timeout: {
			value: 0
		},
        withCredentials: {
			value: false
		},
        listenTo: {
            value: function (method, url /*, async, user, password*/) {
                var middlewares = this.__middlewares__,
                middleware;

                if (!middlewares[method]) {
                    middlewares[method] = {};
                }

                middleware = middlewares[method][url] = {
                    async: typeof arguments[2] === 'undefined' ? true : arguments[2],
                    user: typeof arguments[3] === 'undefined' ? '' : arguments[3],
                    password: typeof arguments[4] === 'undefined' ? '' : arguments[4]
                };

                return {
                    respondWith: function (status, response) {
                        middleware.response = response;
                        middleware.status = status;
                    }
                };
            }
        },
        abort: {
			value: function () {
                delete this.__method__ ;
                delete this.__url__;
                delete this.__async__;
                delete this.__user__;
                delete this.__password__;
                delete this.__mimetype__;
                delete this.__headers__;
                this.readyState = 0;
            }
		},
        getAllResponseHeaders: {
			value: function () {}
		},
        getResponseHeader: {
			value: function () {}
		},
        open: {
            value: function (method, url /*, async, user, password*/) {
                this.__method__ = method;
                this.__url__ = url;
                this.__async__ = typeof arguments[2] === 'undefined' ? true : arguments[2];
                this.__user__ = typeof arguments[3] === 'undefined' ? '' : arguments[3];
                this.__password__ = typeof arguments[4] === 'undefined' ? '' : arguments[4];
                this.readyState = 1;
            }
        },
        overrideMimeType: {
			value: function (mimetype) {
                this.__mimetype__ = mimetype;
            }
		},
        send: {
			value: function (data) {
                var middleware = this.__middlewares__[this.__method__][this.__url__],
                response = middleware.response;

                this.response = typeof response === 'function' ? response(data, middleware.user, middleware.password) : response;
                this.status = middleware.status;
            }
		},
        setRequestHeader: {
			value: function (header, value) {
                if (!this.__headers__) {
                    this.__headers__ = {};
                }

                if (!this.__headers__[header]) {
                    this.__headers__[header] = [value];
                } else {
                    this.__headers__[header].push(value);
                }
            }
		},
    });

    return XMLMockRequest;
}());