(function ($) {
  var methods = {
    init: function (options) {
      var settings = $.extend({}, options);
      return this.each(function () {
        var $this = $(this),
            data = $(this).data('dropdown');
        if (!data) {
          $(this).data('dropdown', {});
          $this.hide();
          methods._generateHtml($this);
          $el = $this.next('.jc-dropdown');
          $this.data('dropdown').target = $el;
          methods._bindEvent($el, settings);
        }
      })
    },
    set: function (value) {
      return this.each(function () {
        var $this = $(this);
        methods._set($this, value);
      })
    },
    get: function () {
      var $target = this.data('dropdown').target;
      return methods._get($target);
    },
    _get: function ($el) {
      return $el.children('input').val();
    },
    _activateItem: function ($el) {
      var value = this._get($el);
      $el.find('.jc-dropdown-menu__item[value="' + value + '"]').addClass('active');
    },
    _set: function ($el, value) {
      var $target = $el.data('dropdown').target,
          data = $el.data('dropdown').data;
      var text = this._getText(data, value);
      this._setFunc($target, value, text);
    },
    _setFunc: function ($el, value, text) {
      $el.children('input').val(value).change();
      $el.children('.jc-dropdown__text').text(text);
    },
    _getText: function (data, value) {
      var text = '';
      $.each(data, function (index, val) {
        if (val.value == value) {
          text = val.text;
          return false;
        }
      })
      return text;
    },
    _bindChangeEvent: function ($el, callback) {
      $el.children('input').on('change', function (e) {
        callback.call($el, e);
      })
    },
    _bindEvent: function ($el, settings) {
      var _this = this;
      if (settings.onChange) {
        this._bindChangeEvent($el, settings.onChange);
      }
      $el.on('click.dropdown', function (e) {
        if (!$(this).hasClass('active')) {
          e.stopPropagation();
          $(this).addClass('active');
          _this._activateItem($(this));
        }
      })
      $el.on('click.dropdown', '.jc-dropdown-menu__item', function (e) {
        var value = $(this).val(),
            text = $(this).text();
        _this._setFunc($el, value, text);
      })
      $(document).on('click.dropdown', function (e) {
        $(".jc-dropdown, .jc-dropdown-menu__item").removeClass('active');
      })
    },
    _generateHtml: function ($el) {
      var data = [];
      $el.children('option').each(function (index) {
        var obj = {
          value: this.value ? this.value : '',
          text: this.innerText ? this.innerText : ''
        }
        data.push(obj);
      })
      $el.data('dropdown').data = data;
      var h = '<div class="jc-dropdown">';
      h += '<input type="hidden" value="' + (data[0] ? data[0].value : '') + '">';
      h += '<i class="jc-icon jc-dropdown__icon"></i>';
      h += '<span class="jc-dropdown__text">' + (data[0] ? data[0].text : '') + '</span>';
      h += '<ul class="jc-dropdown-menu">';
      $.each(data, function (index, val) {
        h += '<li class="jc-dropdown-menu__item" value="' + val.value + '">' + val.text + '</li>';
      })
      h += '</ul>';
      $el.after(h);
    } 
  }
  $.fn.dropdown = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (Object.prototype.toString.call(method) == '[object Object]' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.dropdown');
    }
  }
})(jQuery);