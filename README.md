Chords.io
=======

Chords.io is a small jQuery plugin to display guitar chords using Raphaël SVG library.

Chords.io does not *know* any chord shapes or names so you will have to provide it with
all the data.

Requirements
------------

Requires [Raphaël](http://raphaeljs.com/) and [jQuery](http://www.jquery.com).

Usage
-----

HTML

    <div data-code="xo221o" data-name="Am" />
    <div data-code="x32o1o" data-name="C" />
    <div data-code="133211_3" data-name="G" />

JS

    $('div').chordsIO();

Result

![Example chords](http://guitarparty.github.com/chords.io/images/example.png)

More examples
-------------

Check out [http://guitarparty.github.com/chords.io/](http://guitarparty.github.com/chords.io/)

TODO
----

* Consider using something other than `data-` attributes. The name of the chords should
  probably be a text within the element.
* Listen for changes on elements and redraw the chords
