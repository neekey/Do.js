;(function(){

    var Do = function(){

        this.queue = [];
    };

    Do.prototype = {

        add: function( fun ){

            var self = this;

            var done = function(){
                self.done( task );
            };

            var task =  {
                fn: fun,
                done: done
            };

            this.queue.push( task );

            // If `fun` is the only one in the queue, execute it.
            if( this.queue.length == 1 ){
                this.next();
            }
        },

        remove: function( t ){

            var task
                ,index;
            for( index = 0; task = this.queue[ index ]; index++ ){
                if( task === t ){

                    // Remove the task.
                    this.queue.splice( index, 1 );
                    break;
                }
            }
        },

        done: function( t ){
            this.remove( t );
            this.next();
        },

        next: function(){
            var task = this.queue[ 0 ];
            if( task && typeof task.fn == 'function' ){
                task.fn( task.done );
            }
        }
    };

    var NewQueue = function(){
        var newDo = new Do();
        return function(fun){
            newDo.add( fun );
        }
    };

    var DoInstant = new Do();
    var DoAdd = function(fun){
        DoInstant.add( fun );
    };

    if( typeof module !== 'undefined' && module.exports && typeof require !== 'undefined' ){
        module.exports = DoAdd;
        module.exports.newQueue = NewQueue;
    }
    else {
        this.Do = DoAdd;
        this.Do.newQueue = NewQueue;
    }

})();
