/*
 * This is the entire source code for the article “Subtitution ciphering in JavaScript”
 * http://timseverien.com/articles/153-substitution-ciphering-in-javascript/
 */

(function() {
    "use strict";

    /**
     * Cipher namespace, to store all the cyphers
     *
     * @namespace
     */

    var Cipher = {};

    /**
     * Maps ABCDEF to QWERTY
     *
     * @param {string} text
     * @param {boolean} decode
     *
     * @return {string}
     */

     Cipher.setMap = function(map) {
       Cipher.map = map
     }

     Cipher.makeRandomMap = function() {
       var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
       var length = arr.length
       var randArr = []
       for (var i = 0; i < length; i++) {
         var rand = Math.floor(Math.random() * arr.length)
         var value = arr.splice(rand, 1)[0]
         randArr.push(value)
       }
       var map = {
           a: randArr[0], b: randArr[1], c: randArr[2],
           d: randArr[3], e: randArr[4], f: randArr[5],
           g: randArr[6], h: randArr[7], i: randArr[8],
           j: randArr[9], k: randArr[10], l: randArr[11],
           m: randArr[12], n: randArr[13], o: randArr[14],
           p: randArr[15], q: randArr[16], r: randArr[17],
           s: randArr[18], t: randArr[19], u: randArr[20],
           v: randArr[21], w: randArr[22], x: randArr[23],
           y: randArr[24], z: randArr[25], 1:9 + ''
       };
       return map
     }

     Cipher.map = Cipher.makeRandomMap()

    Cipher.toQWERTY = function(text, decode) {
        // ABCDEF to QWERTY map
        // var map = {
        //     a: 'q', b: 'w', c: 'e',
        //     d: 'r', e: 't', f: 'y',
        //     g: 'u', h: 'i', i: 'o',
        //     j: 'p', k: 'a', l: 's',
        //     m: 'd', n: 'f', o: 'g',
        //     p: 'h', q: 'j', r: 'k',
        //     s: 'l', t: 'z', u: 'x',
        //     v: 'c', w: 'v', x: 'b',
        //     y: 'n', z: 'm', 1:9 + ''
        // };

        // Flip the map
        var map = Cipher.map
        if(decode) {
            map = (function() {
                var tmp = {};
                var k;

                // Populate the tmp variable
                for(k in map) {
                    if(!map.hasOwnProperty(k)) continue;
                    tmp[map[k]] = k;
                }

                return tmp;
            })();
        }

        // return text.split('').filter(function(v) {
        //     // Filter out characters that are not in our list
        //     return map.hasOwnProperty(v.toLowerCase());
        // }).map(function(v) {
        //     // Replace old character by new one
        //     // And make it uppercase to make it look even fancier
        //     return map[v.toLowerCase()].toUpperCase();
        // }).join('');
        return text.split('').map(function(v) {
            // Replace old character by new one
            // And make it uppercase to make it look even fancier
            if (v === v.toUpperCase()) return (map[v.toLowerCase()]) ? map[v.toLowerCase()].toUpperCase() : v;
            return (map[v.toLowerCase()]) ? map[v.toLowerCase()] : v;
        }).join('');
    };


    /**
     * Rotate a unicode string
     *
     * @param {string} text
     * @param {int} rotation
     *
     * @return {string}
     */

    Cipher.rotate = function(text, rotation) {
        // Surrogate pair limit
        var bound = 0x10000;

        // Force the rotation an integer and within bounds
        rotation = parseInt(rotation) % bound;

        // Might as well return the text if there's no change
        if(rotation === 0) return text;

        // Create string from character codes
        return String.fromCharCode.apply(null,
            // Turn string to character codes
            text.split('').map(function(v) {
                // Return current character code + rotation
                return (v.charCodeAt() + rotation + bound) % bound;
            })
        );
    };

    /**
     * Rotate a unicode string using a key
     *
     * @param {string} text
     * @param {string} key
     * @param {boolean} reverse
     *
     * @return {string}
     */

    Cipher.keyRotate = function(text, key, reverse) {
        // Surrogate pair limit
        var bound = 0x10000;

        // Create string from character codes
        return String.fromCharCode.apply(null,
            // Turn string to character codes
            text.split('').map(function(v, i) {
                // Get rotation from key
                var rotation = key[i % key.length].charCodeAt();

                // Are we decrypting?
                if(reverse) rotation = -rotation;

                // Return current character code + rotation
                return (v.charCodeAt() + rotation + bound) % bound;
            })
        );
    };

    window.Cipher = Cipher;
})();
