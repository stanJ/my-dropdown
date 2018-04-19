Vue.component('jc-select', {
  props: ['options', 'value'],
  template: `
  <div class="jc-dropdown" :class="{active: isActive}" @click.stop="handleClick">
    <input type="hidden" :value="value">
    <i class="jc-icon jc-dropdown__icon"></i>
    <span class="jc-dropdown__text">{{curText}}</span>
    <ul class="jc-dropdown-menu">
      <li class="jc-dropdown-menu__item" 
          :class="{active: item.value == value}" :value="item.value" 
          v-for="item in options"
          @click="handleItemClick(item)">{{item.text}}</li>
    </ul>
  </div>
  `,
  data: function () {
    return {
      isActive: false,
    }
  },
  computed: {
    curText: function () {
      return this.getCurText()
    },
  },
  created: function () {
    var vm = this;
    document.addEventListener('click', function (e) {
      vm.isActive = false;
    })
  },
  methods: {
    handleItemClick: function (item) {
      this.value = item.value
      this.$emit('input', this.value)
    },
    handleClick: function () {
      if (!this.isActive) {
        this.isActive = true
      }
    },
    getCurText: function () {
      for (var i = 0, len = this.options.length; i < len; i++) {
        if (this.options[i].value == this.value) {
          return this.options[i].text
        }
      }
      return ''
    }
  }
})