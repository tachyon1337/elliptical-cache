/*
 * =============================================================
 * elliptical-cache
 * =============================================================
 *
 * usage:
 *
 * var $cache=this._data.$cache;
 * $cache.set(node,{foo:'bar'});
 *
 * var data=$cache.get(node);
 * var bar = data.foo; =>'bar'
 *
 * clean-up:
 * $cache.reset();
 *
 * a replacement for jQuery data as an alternative to HTML5 dataset(data attributes as DOM datastore).
 * The issue with jQuery data is that node removal clears the jQuery cache for that node. This interferes, for example, in those cases that rely
 * on mutation observer callback for removedNodes in terms of any necessity of querying a node's data to perform an action or actions.
  * $cache doesn't destroy the nodes data on removal, leaving clean-up to the developer, with fallback to component destroy event.
 *
 */

//umd pattern

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        //commonjs
        module.exports = factory(require('ellipsis-element'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ellipsis-element'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory($);
    }
}(this, function ($) {

    $.element('elliptical.cache',{

       _initElement:function(){
           this._data.$cache=this.$cache();
       },

        $cache:function(){
            var cache={};
            var count=1;
            return {
                reset:function(){
                    count=1;
                    cache={};
                },

                set:function(node,data){
                    if(!node.__data){
                        node.__data=count++;
                    }
                    cache[node.__data]=data;
                },

                get:function(node){
                    return cache[node.__data];
                }
            }
        },

        _dispose:function(){
            var $cache=this._data.$cache;
            $cache.reset();
        }

    });

    return $;

}));