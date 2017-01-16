/* Usage: {% contact %} */
hexo.extend.tag.register('contact', function(args, content, options){
  return '<br /><a href="mailto:' + hexo.config.site_email + '"><b>' + hexo.config.site_email + '</b></a>';
});
