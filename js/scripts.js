// Cache selectors
var lastId,
  topMenu = $("#section-menu"),
  topMenuHeight = topMenu.outerHeight()+15,
// All list items
  menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

$(window).scroll(function(){
  // Get container scroll position
  var fromTop = $(this).scrollTop()+topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length-1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    menuItems.parent().removeClass("active").end().filter("[href=#"+id+"]").parent().addClass("active");
  }


  // Menu Fixed
  var origin = $('.style-guide-tabs-wrapper'),
    origin_row = origin.find('.style-guide-tabs');
  if (origin.is(":visible")) {
    if(origin.attr('data-origpos') === undefined) {
      origin.attr('data-origpos', origin.position().top);
    }
    if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
      origin_row.addClass('fixed');
    }
    if($(window).scrollTop() < origin.attr('data-origpos')) {
      origin_row.removeClass('fixed');
    }
  }
});