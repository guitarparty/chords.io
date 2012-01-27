/* chords.io */

function drawChord(settings) {
    var canvas = settings.canvas;
    var x0=15,y0=20;
    var xs=8,ys=12;
    drawGrid(canvas, x0, y0, xs, ys, 5, 4);
    canvas.text(x0, y0-15, settings.chord.name)
    .attr("text-anchor", "start");
    var parts = settings.chord.code.split("_");
    console.log(parts);
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

function drawGrid(canvas, x0, y0, xs, ys, xn, yn) {
    var w = xs * xn, h = ys * yn;
    for(var i=x0;i<=x0+w;i+=xs) {
        var path = "M" + i + " " + y0 + "L" + i + " " + (y0 + h);
        //console.log(path);
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
        //console.log(path);
    }
};




