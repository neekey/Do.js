Do.js
=======

A simple queue written in JavaScript which runs asynchronous jobs in order as if they were synchronous.

`Do.js` is just like the method of `it` in the popular test framework `mocha`.

## Install
`npm install dojs`

## Usage

You can use `Do.js` both in nodejs or browser.

```javascript

var Do = require( 'dojs' );

var asyncData = undefined;

Do(function( done ){

    setTimeout(function(){
        asyncData = { name: 'Do.js' };
        done();
    }, 1000 );
});

Do(function( done ){

    alert( asyncData ); // => { name: 'Do.js' }
});

```

If in browser, add `<script src="Do.js" type="text/javascript"></script>` in front of the code you want to use `Do.js`.

##Separated queue

If you want multiple queue to execute, you can use `newQueue` method:

```javascript

var Do = require( 'dojs' );

var myDo = Do.newQueue();
var yourDo = Do.newQueue();
var myAsyncData = undefined;
var yourAsyncData = undefined;

myDo(function( done ){

    setTimeout(function(){
        myAsyncData = { name: 'My Do' };
        done();
    }, 1000 );
});

yourDo(function( done ){

    setTimeout(function(){
        yourAsyncData = { name: 'Your Do' };
        done();
    }, 1000 );
});

myDo(function( done ){

    alert( myAsyncData ); // => { name: 'My Do' }
});

YourDo(function( done ){
    alert( yourAsyncData ); // => { name: 'Your Do' }
});

```

`myDo` and `yourDo` are independent of each other.



## License
(The MIT License)

Copyright (c) 2012 neekey &lt;ni184775761@gmail.com&rt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
