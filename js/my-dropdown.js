(function($){
  var obj = {
    init: function(options){
      return this.each(function(){
        var $this = $(this),
            data = $(this).data('dropdown');
        if (!data) {
          $this.hide();
          
        }

      })
    } 
  }
  $.fn.dropdown 
})(jQuery);