/*global describe, beforeEach, afterEach, it, xit, expect, XMLHttpRequest*/
describe('XMLMockRequest', function () {
    'use strict';

    var request;

    beforeEach(function () {
        request = new XMLHttpRequest();
    });

    afterEach(function () {
        request = null;
    });

    describe('request', function () {

        it('can send a synchronous request', function () {
            request.open('GET', '/README.md', false);
            request.send();
            expect(request.readyState).toEqual(4);
        });

        it('can send an asynchronous request', function (done) {
            request.onload = function () {
                expect(this.readyState).toEqual(4);
                done();
            };
            request.open('GET', '/README.md', true);
            request.send();
        });

        xit('can send a request with credentials');

        xit('can set request headers');

        xit('can abort a request after it is sent');

    });

    describe('response', function () {

        xit('notifies when the readyState property changes');

        xit('has different ready states');

        xit('retrieves different types of data');

        xit('presents the response data as a string');

        xit('can set the response type');

        xit('presents the response data as a DOM document');

        xit('has the HTTP status code of the request');

        xit('has the HTTP status text of the request');

    });
});