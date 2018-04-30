'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;
/**
 * Identity: return any input value, unchanged
 * @param {Anything} anything: any value to be returned
 * @return {Anything} input value
*/

function identity(anything){
    return anything;
}

module.exports.identity = identity;

/**
 * typeOf: return a string with the datatype of input value
 * @param {Anything} value: any input value to check the datatype of
 * @return {String} a string with the datatype of the value given
*/

function typeOf(value){
    if(Array.isArray(value)){
        return 'array';
    }
    else if(value === null){
        return 'null';
    }
    else { 
        return typeof value;

    }
    }
module.exports.typeOf = typeOf;
/**
 * filter: returns an array of values that pass a given test
 * @param {Array} arr an array of values
 * @param {Function} action a function to test against 
 * @return {Array} an array from all values that passed the action
 * 
*/ 
function filter (arr, action) {
    var result = [];
    each(arr, function(value, i, collection) {
      if (action(value, i, collection)){
          result.push(value);
      }
    });
    return result;
  };
module.exports.filter = filter
/**
 * first: returns the beginning n number of elements from an array, or the first element in no number is passed
 * @param {Array} array and array of values
 * @param {number} num a number to equal the number of places, starting from 0 inde to be returned
 * @return {Array} an array containing the n number of items, from the first element,  or the first element
*/ 
function first(array, num){
     let result = [];
    if(!Array.isArray(array) || num < 0){
        return [];
    }
    if(typeof num !== 'number'){
        return array[0];
    }
    if(num > array.length){
        return array;
    }
    else{
        for(let i=0; i < num; i++){
        result.push(array[i])
    }
    return result
    }
    
}
module.exports.first = first
/**
 * last: returns the ending n number of elements from an array, or the last element if no number is passed
 * @param {Array} array: an array of values
 * @param {Number} num: a number to equal the number of places, starting from the last element
 * @return {Array} an array contaiing n number of items, from the last element, or the last element
*/
function last(array, num){
     let result = [];
    if(!Array.isArray(array) || num < 0){
        return [];
    }
    if(typeof num !== 'number'){
        return array[array.length-1];
    }
    if(num > array.length){
        return array;
    }
    else{
        for(let i=array.length -1; i > 0; i--){
        result.unshift(array[i])
    }
    return result
    }
    
}
module.exports.last = last
/**
 * indexOf: returns the index of a target value in an array of values, or -1 if the target is not present
 * @param {Array} arr: an array of values
 * @param {Anything} value: the value to target
 * @return {Number} the index location of the value, or -1
 */
function indexOf(arr, value){
    for(let i=0; i< arr.length; i++){
       if(arr[i] === value){
           return i;
       } 
    }
    return -1
}
module.exports.indexOf = indexOf
/**
 * reject: creates an array from all the truthy values on a function passed on every element in an input array
 * @param {Array} arr: an array
 * @param {Function} test: a function to be called on every element
 * @return {Array} an array containing all the elements that are falsey to the passed function
 */
function reject(arr, test){
    let result =[]
    each(arr, function(value, i, collection){
        if(!test(value, i, arr)){
            result.push(value)
        }
    });
    return result
}
module.exports.reject = reject
/**
 * partition: creates an array, with 2 sub arrays, one of values that are truthy, the other for values that
 * are falsey, based upon the input function
 * @param {Array} arr: and array
 * @param {Function} func: a funtion to be called on every element
 * @return {Array} an array, containing 2 sub arrays with the truthy/falsey values of the passed function
 */
function partition(arr, func){
   return [filter(arr, func), reject(arr, func)];
}
module.exports.partition = partition
/**
 * unique: creates an array without duplicates
 * @param {Array} arr: an array, possibly containing duplicates
 * @return {Array} a duplicate free copy of the input array
 */
function unique(arr){
    let unique = []
    each(arr, function(value,i,collection){
         if(indexOf(unique, value) < 0){
            unique.push(value)
         }
    })
    return unique
}
module.exports.unique = unique
/**
 * map: creates an array, with the result of an action being passed to each element of an input array
 * @param {Array}||{Object} collection: an input object/array to pass a function on
 * @param {Function} action: a function to be have every element from input array passed into it
 * @return {Array} an array containing the values of all modified elements of input array 
 */
function map(collection, action){
    let result =[]
    each(collection, function(value, i, collection){
        if(action(value,i,collection)){
            result.push(action(value, i, collection))
        }
    })
    return result
}

module.exports.map = map
/**
 * pluck: returns all the values of a given property in an array of objects in an array
 * @param {Array} arr: an array of objects
 * @param {String} prop: the key name of the value we want to pull out
 * @return {Array} an array containing all of the named properties from the objects in the input array
 */
function pluck(arr, prop){
    let props = function(key){
        return function(obj){
            return obj[key]
        }
    }
    return map(arr, props(prop))
}
module.exports.pluck = pluck
/**
 * contains: returns a boolean based on a value being present in an array
 * @param {Array} arr: an array
 * @param {Anything} value: a target value to search input array for
 * @return {Boolean} true if target value is in input array, false otherwise
 */
function contains(arr, value) {
    return indexOf(arr, value) >= 0 ? true : false;
  };
module.exports.contains = contains 
/**
 * reduce: returns the result of a seeded accumulator, and a function, passed over each element in an array, to reduce it to a single value
 * @param {Array} arr: an array
 * @param {Function} func: a function to be passed to all values
 * @param {Anything} seed: the start of the accumulation, if not provided, the first element in array
 * @return the accumulator, after being applied through the function to all elements
 */
function reduce(arr, func, seed) {
    each(arr, function(element, i, collection){
        if(seed !== undefined){
            seed = func(seed, arr[i], i)
        }else{
            seed = arr[0];
        }
    })
    return seed
};
module.exports.reduce = reduce
/**
 * every: tests every value in a collection. if they all pass, returns true
 * @param {Array} collection: an array of values
 * @param {Function} func: a function to test value against
 * @return {Boolean} True if all values passed to func return true, false if any fail
 */
function every(collection, func) {
   if (func) {
       let arrOfValues = map(collection, func);
       return contains(arrOfValues, false) ? false : true;

   }
   else {
       let arrOfValues = map(collection, function(value) { return value; });
       console.log(arrOfValues);
       return contains(arrOfValues, false) ? false : true;
   }

};
module.exports.every = every
/**
 * some: tests every value in a collection. if any pass, returns true
 * @param {Array} collection: an array of values
 * @param {Function} func: a function to test value against
 * @return {Boolean} True if any values passed to func return true
 */
function some(collection, funct) {
   if (funct) {
       let arrOfValues = map(collection, funct);
       return contains(arrOfValues, true) ? true : false;

   }
   else {
       let arrOfValues = map(collection, function(value) { return value; });
       return contains(arrOfValues, true) ? true : false;
   }

};
module.exports.some = some
/**
 * extend: adds key value pairs from objects, into the first given object
 * @param {Object} object1: the object to add key value pairs to
 * @param {object} : any number of objects to add key value pairs from
 * @return returns the object provided as the first argument, plus all key value pairs from any other objects provided 
 * 
 */
function extend(object1) {
   var objects = arguments;
   var length = objects.length;

   for (let i = 1; i < length; i++) {
       for (let key in objects[i]) {
           let currentObj = arguments[i];
           object1[key] = currentObj[key];
       }

   }

   return object1;
};
module.exports.extend = extend