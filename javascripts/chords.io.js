/* chords.io */


(function($){
    $.fn.extend({ 
        //plugin name - animatemenu
        chordsIO: function(options) {
 
            //Settings list and the default values
            var defaults = {
                'width': 64,
                'height': 72,
                'x0': 15,
                'y0': 20,
                'xs': 8,
                'ys': 12,
                'xn': 5,
                'yn': 4
            };
             
            var options = $.extend(defaults, options);
            
            var drawChord = function(canvas, chord) {
                var x0=options.x0,y0=options.y0;
                var xs=options.xs,ys=options.ys;
                drawGrid(canvas);
                canvas.text(x0, y0-15, chord.name)
                .attr("text-anchor", "start");
                var parts = chord.code.split("_");
                if(parts.length > 1){
                    canvas.text(x0 - xs, y0 + ys/2, parts[1]);
                }
                var code = parts[0];
                for(i=0;i<code.length;i++) {
                    switch (code[i].toLowerCase()) {
                        case 'x':
                        case 'n':
                            canvas.text(x0 + i*xs, y0 - ys*2/3, "x");
                            break;
                        case 'o':
                        case '0':
                            canvas.circle(x0 + i*xs, y0 - ys/2, 2).attr({stroke: '#000'});
                            break;
                        default:
                            canvas.circle(x0 + i*xs, y0 + ys*parseInt(code[i]) - 5, 2).attr({fill: '#000'});
                    }
                }
            };

            var drawGrid = function(canvas) {
                var x0=options.x0,y0=options.y0;
                var xs=options.xs,ys=options.ys;
                var xn=options.xn,yn=options.yn;

                var w = xs * xn, h = ys * yn;
                for(var i=x0;i<=x0+w;i+=xs) {
                    var path = "M" + i + " " + y0 + "L" + i + " " + (y0 + h);
                    canvas.path(path);
                }
                for(var j=y0;j<=y0+h;j+=ys) {
                    var path = "M" + x0 + " " + j + "L" + (x0 + w) + " " + j;
                    
                    if(j==y0) {
                        path = "M" + (x0 - 0.5) + " " + j + "L" + (x0 + 0.5 + w) + " " + j;
                        canvas.path(path).attr({'stroke-width': '3px'});
                    }
                    else {
                        canvas.path(path);
                    }
                }
            };

         
            return this.each(function() {
                var o = options;
                
                var obj = $(this);
                var canvas = $('<div />');
                obj.append(canvas);
                console.log(canvas.first());
                drawChord(Raphael(canvas[0], o.width, o.height), {
                    'name': obj.attr('data-name'),
                    'code': obj.attr('data-code')
                });
            });
        }
    });
})(jQuery);
