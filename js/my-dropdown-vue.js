Vue.component('jc-select', {
  props: ['options', 'value'],
  template: `
  <div class="jc-dropdown" :class="{active: isActive}" @click="handleClick">
    <input type="hidden" :value="partValue">
    <i class="jc-icon jc-dropdown__icon"></i>
    <span class="jc-dropdown__text">{{curText}}</span>
    <ul class="jc-dropdown-menu">
      <li class="jc-dropdown-menu__item" 
          :class="{active: item.value == value}" :value="item.value" 
          v-for="item in options"
          @click.stop="handleItemClick(item)">{{item.text}}</li>
    </ul>
  </div>
  `,
  data: function () {
    return {
      isActive: false,
      partValue: this.value
    }
  },
  computed: {
    curText: function () {
      return this.getCurText()
    },
  },
  created: function () {
    var vm = this
    document.addEventListener('click', function (e) {
      if (e.target != vm.$el) {
        vm.isActive = false
      }
    })
  },
  methods: {
    handleItemClick: function (item) {
      this.partValue = item.value
      this.$emit('input', this.partValue)
      this.isActive = false
    },
    handleClick: function (e) {
      if (!this.isActive) {
        this.isActive = true
        // e.stopPropagation()
      } else {
        this.isActive = false
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