/* chords.io */

Raphael.el.addClass = function(className) {
    this.node.setAttribute("class", className);
    return this;
};

(function($){
    $.fn.extend({ 
        //plugin name - animatemenu
        chordsIO: function(options) {
 
            //Settings list and the default values
            var defaults = {
                'cssNamespace': 'chordsio-chord',
                'cornerRadius': 0,
                // 'backgroundColor': null,
                // 'borderColor': null,
                // 'gridColor': '#000',
                // 'textColor': '#000',
                // 'fingerColor': '#000',
                'x0': 15,
                'y0': 20,
                'xSpacing': 8,
                'ySpacing': 10,
                'instrument': 'guitar',
                'padding': 0
            };

            var instruments = {
                guitar: {
                    'strings': 6,
                    'frets': 5
                },
                ukulele: {
                    'strings': 4,
                    'frets': 5
                }
            }
             
            var options = $.extend(defaults, options);
            var strokeWidth = options.xSpacing*0.08;
            
            if(!instruments.hasOwnProperty(options.instrument))
                options.instrument = 'guitar';
            options = $.extend(options, instruments[options.instrument]);
            
            var minimumWidth = options.x0 + options.xSpacing * (options.strings-1) + options.padding;
            var minimumHeight = options.y0 + options.ySpacing * options.frets;
            //console.log(minimumWidth + " " + minimumHeight)
            
            var drawChord = function(canvas, chord) {
                canvas.canvas.className.baseVal = options.cssNamespace;

                var x0=options.x0,y0=options.y0;
                var xSpacing=options.xSpacing,ySpacing=options.ySpacing;
                
                var parts = chord.code.split("_");
                var code = parts[0];
                var band = 1
                if(parts.length > 1){
                    band = parseInt(parts[1]);
                }
                
                drawGrid(canvas, band);
                
                canvas.text(x0, y0-ySpacing*5/4, chord.name)
                    .attr({
                        'text-anchor': 'start', 
                        //fill: options.textColor,
                        'font-size': ySpacing
                    }).addClass('chord-name');
                if (band > 1) {
                    canvas.text(x0 - xSpacing*2/3, y0 + ySpacing/2, band)
                    .attr({
                        'text-anchor': 'end',
                        //fill: options.textColor,
                        'font-size': ySpacing*4/5
                    }).addClass('chord-fretnumber');
                }
                
                for(i=0;i<code.length;i++) {
                    switch (code[i].toLowerCase()) {
                        case 'x':
                        case 'n':
                            canvas.path("M" + (x0 + i*xSpacing - xSpacing/4) + " " + (y0 - ySpacing*2/3) 
                                + "L" + (x0 +i*xSpacing + xSpacing/4) + " " + (y0 - ySpacing*2/7))
                                .attr({
                                    //stroke: options.fingerColor, 
                                    //'stroke-width': strokeWidth
                                }).addClass('chord-muted');
                            canvas.path("M" + (x0 + i*xSpacing - xSpacing/4) + " " + (y0 - ySpacing*2/7) 
                                + "L" + (x0 +i*xSpacing + xSpacing/4) + " " + (y0 - ySpacing*2/3))
                                .attr({
                                    // stroke: options.fingerColor, 
                                    // 'stroke-width': strokeWidth
                                }).addClass('chord-muted');
                            break;
                        case 'o':
                        case '0':
                            canvas.circle(x0 + i*xSpacing, y0 - ySpacing/2, ySpacing/5)
                                .attr({
                                    // stroke: options.fingerColor, 
                                    // 'stroke-width': strokeWidth
                                }).addClass('chord-open');
                            break;
                        default:
                            canvas.circle(x0 + i*xSpacing, y0 + ySpacing*parseInt(code[i]) - ySpacing/2, ySpacing/5)
                                .attr({
                                    // fill: options.fingerColor, 
                                    // stroke: options.fingerColor
                                }).addClass('chord-finger');
                    }
                }
            };

            var drawGrid = function(canvas, band) {
                if (band === undefined)
                    band = 1;
                var x0=options.x0,y0=options.y0;
                var xSpacing=options.xSpacing,ySpacing=options.ySpacing;
                var strings=options.strings,frets=options.frets;

                var w = xSpacing * (strings-1), h = ySpacing * frets;
                var background = canvas.rect(x0-options.padding, y0, minimumWidth-x0+options.padding, minimumHeight-y0);
                background.attr({
                    stroke: null
                }).addClass('chord-background');
                // if (options.backgroundColor || options.borderColor) {
                //     var background = canvas.rect(0, 0, options.width, options.height, options.cornerRadius);
                //     if (options.backgroundColor)
                //         background.attr({
                //             fill: options.backgroundColor, 
                //             stroke: options.backgroundColor
                //         });
                //     if (options.borderColor)
                //         background.attr({stroke: options.borderColor});
                // }
                for(var i=x0;i<=x0+w;i+=xSpacing) {
                    var path = "M" + i + " " + y0 + "L" + i + " " + (y0 + h);
                    canvas.path(path).attr({
                        // 'stroke': options.gridColor, 
                        // 'stroke-width': strokeWidth
                    }).addClass('chord-string');
                }
                for(var j=y0;j<=y0+h;j+=ySpacing) {
                    var path = "M" + x0 + " " + j + "L" + (x0 + w) + " " + j;
                    
                    if(j==y0 && band <= 2) {
                        path = "M" + (x0 - 0.5) + " " + j + "L" + (x0 + 0.5 + w) + " " + j;
                        canvas.path(path).attr({
                            // 'stroke-width': strokeWidth*3, 
                            // stroke: options.gridColor
                        }).addClass('chord-topfret');
                    }
                    else {
                        canvas.path(path).attr({
                            // stroke: options.gridColor, 
                            // 'stroke-width': strokeWidth
                        }).addClass('chord-fret');
                    }
                }
            };
            
            
            return this.each(function() {
                var o = options;
                
                var obj = $(this);
                
                obj.bind("chordsio-render", function(event){
                    $(this).empty();
                    // console.log(event);
                    drawChord(Raphael($(this)[0], minimumWidth+o.ySpacing/2, minimumHeight+2), {
                        'name': $(this).attr('data-name'),
                        'code': $(this).attr('data-code')
                    });
                });
                
                obj.trigger("chordsio-render");
                
            });

        }
    });
})(jQuery);
