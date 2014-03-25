/*global describe, beforeEach, afterEach, it, xit, expect, XMLMockRequest*/
describe('XMLMockRequest', function () {
    'use strict';

    var request;

    beforeEach(function () {
        request = new XMLMockRequest();
    });

    afterEach(function () {
        request = null;
    });

    describe('request', function () {

        it('can send a synchronous request', function () {
            request.listenTo('GET', '/test').respondWith(200);
            request.open('GET', '/test', false);
            request.send();

            expect(request.readyState).toEqual(4);
        });

        it('can send an asynchronous request', function (done) {
            request.listenTo('GET', '/test', true).respondWith(200);
            request.onload = function () {
                expect(this.readyState).toEqual(4);
                done();
            };
            request.open('GET', '/test', true);
            request.send();
        });

        it('can send a request with credentials', function () {
            request.listenTo('GET', '/auth/test', false, 'username', 'password').respondWith(200);
            request.open('GET', '/auth/test', false, 'wrongusername', 'password');
            request.send();

            expect(request.status).toEqual(401);

            request.open('GET', '/auth/test', false, 'username', 'wrongpassword');
            request.send();
            
            expect(request.status).toEqual(401);

            request.open('GET', '/auth/test', false, 'username', 'password');
            request.send();

            expect(request.status).toEqual(200);
        });

        it('can set request headers', function () {
            request.listenTo('GET', '/test').respondWith(200);
            request.open('GET', '/test');
            request.setRequestHeader('Content-Type', 'text/plain');
            request.setRequestHeader('Content-Type', 'chatset=UTF-8');
            request.setRequestHeader('Encoding', 'UTF-8');

            expect(request.getResponseHeader('Content-Type')).toEqual('text/plain;charset=UTF-8');
            expect(request.getResponseHeader('Encoding')).toEqual('UTF-8');
            expect(request.getAllResponseHeaders()).toEqual('Content-type: text/plain\n\rEncoding: UTF-8;');

        });

        it('can abort a request after it is sent', function () {
            request.listenTo('GET', '/test').respondWith(200);
            request.open('GET', '/test');
            request.send();
            request.abort();

            expect(request.readyState).toEqual(0);
            expect(request.response).toEqual('');
            expect(request.status).toEqual(0);
            expect(request.statusText).toEqual('');
        });

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