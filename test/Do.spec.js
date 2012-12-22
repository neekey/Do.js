var expect = typeof require !== 'undefined' ? require( './expect.js' ) : this.expect;
var Do = typeof require !== 'undefined' ? require( '../lib/Do.js' ) : this.Do;

describe( 'Do.js Test', function(){

    it( '#Do()', function( done ){

        var queue = [];

        Do(function( next ){

            setTimeout(function(){
                queue.push( 'a' );
                next();
            }, 100 );
        });

        Do(function( next ){

            setTimeout(function(){
                queue.push( 'b' );
                next();
            }, 200 );
        });

        Do(function( next ){
            queue.push( 'c' );
            next();
        });

        setTimeout(function(){
            Do(function( next ){
                queue.push( 'd' );
                expect( [ 'a', 'b', 'c', 'd' ]).eql( queue );
                done();
                next();
            });
        }, 400 );
    });

    it( '#newQueue()', function( done ){

        var doOne = Do.newQueue();
        var queue = [];

        doOne(function( next ){

            setTimeout(function(){
                queue.push( 'a' );
                next();
            }, 100 );
        });

        doOne(function( next ){

            setTimeout(function(){
                queue.push( 'b' );
                next();
            }, 200 );
        });

        doOne(function( next ){
            queue.push( 'c' );
            next();
        });

        setTimeout(function(){
            doOne(function( next ){
                queue.push( 'd' );
                expect( [ 'a', 'b', 'c', 'd' ]).eql( queue );
                done();
                next();
            });
        }, 400 );
    });
    
    it( 'multi #newQueue()', function( done ){

        var doOne = Do.newQueue();
        var doTwo = Do.newQueue();
        var queueOne = [];
        var queueTwo = [];
        var begin = (new Date).valueOf();

        doOne(function( next ){

            setTimeout(function(){
                queueOne.push( 'a' );
                next();
            }, 100 );
        });

        doOne(function( next ){

            setTimeout(function(){
                queueOne.push( 'b' );
                next();
            }, 200 );
        });

        doOne(function( next ){
            queueOne.push( 'c' );
            next();
        });

        setTimeout(function(){
            doOne(function( next ){
                queueOne.push( 'd' );
                next();
            });
        }, 400 );

        doTwo(function( next ){

            setTimeout(function(){
                queueTwo.push( 'd' );
                next();
            }, 100 );
        });

        doTwo(function( next ){

            setTimeout(function(){
                queueTwo.push( 'c' );
                next();
            }, 200 );
        });

        doTwo(function( next ){
            queueTwo.push( 'b' );
            next();
        });

        setTimeout(function(){
            doTwo(function( next ){
                var now = (new Date).valueOf();
                var duration = now - begin
                queueTwo.push( 'a' );
                expect( [ 'a', 'b', 'c', 'd' ]).eql( queueOne );
                expect( [ 'd', 'c', 'b', 'a' ]).eql( queueTwo );
                expect( duration ).lessThan( 600 );
                done();
                next();
            });
        }, 500 );
    });
});