/*
  Figure tag

  Creates a <figure> containing
  * an image with alt text
  * a link to a full size version of image
  * a <figcaption> based on content of tag
  * capability to render that content as markdown
  * CSS class hooks for size and orientation

  Uses jsdom and jquery to strip out HTML from
  rendered markdown version of caption for use as
  alt text.

  Usage:
  {% figure src orientation [directory] %}
  Some _caption_ with markdown
  {% endfigure}

  {% figure image.jpg landscape original %}
  Original image
  {% endfigure}
*/

var jsdom = require('jsdom').jsdom,
    window = jsdom("").parentWindow,
    $ = require('jquery')(window);

hexo.extend.tag.register('figure', function(args, content) {

  var image_dir = hexo.config.image_dir,
      render = hexo.render,
      image = args[0],
      orientation = args[1],
      directory = typeof args[2] === "undefined" ? "1560" : args[2],
      markdownCaption = render.renderSync({text: content, engine: 'markdown'}),
      renderedCaption = $(markdownCaption).unwrap().html(), //remove wrapping paragraph element
      caption = $(markdownCaption).text();

  // Special case original directory
  if (directory === "original") {
    directory = '';
  } else {
    directory = directory + '/';
  }

  return '<figure class="generated-figure generated-figure--'+ orientation +'"><img src="' + image_dir + '/' + directory + image +'" alt="'+ caption +'"><figcaption class="generated-figure-caption">'+ renderedCaption +'</figcaption></figure>';
}, {ends: true});
