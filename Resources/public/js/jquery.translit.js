(function($){
    $.fn.translit = function(options) {
        var opts = $.extend({}, $.fn.translit.defaults, options);
        return this.each(function() {
            $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            var $destination = $('#' + opts.destination);
            o.destinationObject = $destination;
            if (!Array.indexOf) {
                Array.prototype.indexOf = function(obj) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] == obj) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
            $this.keyup(function(){
                var str = $(this).val();
                var result = '';
                for (var i = 0; i < str.length; i++) {
                    result += $.fn.translit.translititerate(str.charAt(i), o)
                }
                var regExp = new RegExp('[' + o.urlSeparator + ']{2,}', 'g');
                result = result.replace(regExp, o.urlSeparator);
                $destination.val(result);
            })
        });
    };

    $.fn.translit.defaults = {
        dictOriginal:  ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р',
                        'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
                        ],
        dictTranslate: ['a', 'b', 'v', 'g', 'd', 'e', 'e', 'zh','z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r',
                        's', 't', 'u', 'f', 'h', 'ts', 'ch','sh','sch', '', 'y', '', 'e', 'ju', 'ja'
                        ],
        urlSeparator: '-'
    };

    $.fn.translit.translititerate = function(char, opts) {
        var trChar;
    char = char.toLowerCase()
        var index = opts.dictOriginal.indexOf(char);
        if (index == -1) {
            trChar = char;
        } else {
            trChar = opts.dictTranslate[index];
        }
        var code = trChar.charCodeAt(0);
        if (code >= 33  && code <= 47 && code != 45
            || code >= 58  && code <= 64
            || code >= 91  && code <= 96
            || code >= 123 && code <= 126
            || code >= 1072
        ) {
            return '';
        }
        if (trChar == ' ' || trChar == '-') {
            return opts.urlSeparator;
        }

        return trChar.toLowerCase();
    };
})(jQuery);
