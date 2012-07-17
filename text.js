/*!
* Text.js
* http://github.com/dbabaioff/text.js
*/
var Text = (typeof module !== "undefined" && module.exports) || {};

(function (Text) {
    // TODO fix regex - this function
    Text.limitWords = function(str, limit, end_char) {
        limit    = (typeof limit === 'undefined') ? 100 : (1 * limit);
        end_char = (typeof end_char === 'undefined') ? '…' : end_char;

        if (Text.trim(str) === '') {
            return str;
        }

        if (limit <= 0) {
            return end_char;
        }

        var matches = str.match(new RegExp('^\\s*+(?:\\S++\\s*+){1,' + limit + '}'));

        return Text.rtrim(matches[0]) + ((matches[0].length === str.length) ? '' : end_char);
    };

    // TODO fix regex - this function
    Text.limitChars = function(str, limit, end_char, preserve_words) {
        limit    = (typeof limit === 'undefined') ? 100 : (1 * limit);
        end_char = (typeof end_char === 'undefined') ? '…' : end_char;
        preserve_words = (typeof preserve_words === 'undefined') ? false : preserve_words;

        if (Text.trim(str) === '' || str.length <= limit) {
            return str;
        }

        if (limit <= 0) {
            return end_char;
        }

        if (preserve_words === false) {
            return Text.rtrim(str.substr(0, limit)) + end_char;
        }

        // Don't preserve words. The limit is considered the top limit.
        // No strings with a length longer than limit should be returned.
        var matches = str.match(new RegExp('^([\s\S]*){0,' + limit + '}\\s'));
        if (! matches) {
            return end_char;
        }

        return Text.rtrim(matches[0]) + ((matches[0].length === str.length) ? '' : end_char);
    };

    Text.trim = String.prototype.trim ?
        function(text) {
            return text == null ?
                '' :
                String.prototype.trim.call(text);
        } :

        // Otherwise use our own trimming functionality
        function(text) {
            return text == null ?
                '' :
                text.toString().replace(/^\s+/, "").replace(/\s+$/, "");
        }

    Text.ltrim = function(text) {
        return text == null ?
            '' :
            text.toString().replace(/^\s+/, "");
    };

    Text.rtrim = function(text) {
        return text == null ?
            '' :
            text.toString().replace(/\s+$/, "");
    };
}(Text));

