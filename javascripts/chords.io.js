/* chords.io */


(function($){
    $.fn.extend({ 
        //plugin name - animatemenu
        chordsIO: function(options) {
 
            //Settings list and the default values
            var defaults = {
                'cornerRadius': 0,
                'backgroundColor': null,
                'borderColor': null,
                'gridColor': '#000',
                'textColor': '#000',
                'fingerColor': '#000',
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
            var strokeWidth = options.xs*0.08;
            
            var minimumWidth = options.x0 + options.xs * options.xn;
            var minimumHeight = options.y0 + options.ys * options.yn;
            
            console.log(minimumWidth + " " + minimumHeight)
            
            var drawChord = function(canvas, chord) {
                var x0=options.x0,y0=options.y0;
                var xs=options.xs,ys=options.ys;
                drawGrid(canvas);
                canvas.text(x0, y0-ys*5/4, chord.name)
                    .attr({
                        'text-anchor': 'start', 
                        fill: options.textColor,
                        'font-size': ys
                    });
                var parts = chord.code.split("_");
                if(parts.length > 1){
                    canvas.text(x0 - xs*2/3, y0 + ys/2, parts[1])
                    .attr({
                        'text-anchor': 'end',
                        fill: options.textColor,
                        'font-size': ys*3/5
                    });
                }
                var code = parts[0];
                for(i=0;i<code.length;i++) {
                    switch (code[i].toLowerCase()) {
                        case 'x':
                        case 'n':
                            canvas.path("M" + (x0 + i*xs - xs/4) + " " + (y0 - ys*2/3) 
                                + "L" + (x0 +i*xs + xs/4) + " " + (y0 - ys*2/7))
                                .attr({
                                    stroke: options.fingerColor, 
                                    'stroke-width': strokeWidth
                                });
                            canvas.path("M" + (x0 + i*xs - xs/4) + " " + (y0 - ys*2/7) 
                                + "L" + (x0 +i*xs + xs/4) + " " + (y0 - ys*2/3))
                                .attr({
                                    stroke: options.fingerColor, 
                                    'stroke-width': strokeWidth
                                });
                            break;
                        case 'o':
                        case '0':
                            canvas.circle(x0 + i*xs, y0 - ys/2, ys/5)
                                .attr({
                                    stroke: options.fingerColor, 
                                    'stroke-width': strokeWidth
                                });
                            break;
                        default:
                            canvas.circle(x0 + i*xs, y0 + ys*parseInt(code[i]) - ys/2, ys/5)
                                .attr({
                                    fill: options.fingerColor, 
                                    stroke: options.fingerColor
                                });
                    }
                }
            };

            var drawGrid = function(canvas) {
                var x0=options.x0,y0=options.y0;
                var xs=options.xs,ys=options.ys;
                var xn=options.xn,yn=options.yn;

                var w = xs * xn, h = ys * yn;
                if (options.backgroundColor || options.borderColor) {
                    var background = canvas.rect(0, 0, options.width, options.height, options.cornerRadius);
                    if (options.backgroundColor)
                        background.attr({
                            fill: options.backgroundColor, 
                            stroke: options.backgroundColor
                        });
                    if (options.borderColor)
                        background.attr({stroke: options.borderColor});
                }
                for(var i=x0;i<=x0+w;i+=xs) {
                    var path = "M" + i + " " + y0 + "L" + i + " " + (y0 + h);
                    canvas.path(path).attr({
                        'stroke': options.gridColor, 
                        'stroke-width': strokeWidth
                    });
                }
                for(var j=y0;j<=y0+h;j+=ys) {
                    var path = "M" + x0 + " " + j + "L" + (x0 + w) + " " + j;
                    
                    if(j==y0) {
                        path = "M" + (x0 - 0.5) + " " + j + "L" + (x0 + 0.5 + w) + " " + j;
                        canvas.path(path).attr({
                            'stroke-width': strokeWidth*3, 
                            stroke: options.gridColor
                        });
                    }
                    else {
                        canvas.path(path).attr({
                            stroke: options.gridColor, 
                            'stroke-width': strokeWidth
                        });
                    }
                }
            };

         
            return this.each(function() {
                var o = options;
                
                var obj = $(this);
                drawChord(Raphael(obj[0], o.width, o.height), {
                    'name': obj.attr('data-name'),
                    'code': obj.attr('data-code')
                });
            });
        }
    });
})(jQuery);
