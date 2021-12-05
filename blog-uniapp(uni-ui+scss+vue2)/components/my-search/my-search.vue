<template>
  <view class="my-search-container">
    <uni-search-bar
      class="search-bar-box"
      v-if="isShowInput"
      :radius="100"
      :placeholder="placeholderText"
      clearButton="auto"
      @confirm="onConfirm"
      @input="onInput"
      @cancel="onCancel"
      @clear="onClear"
      @focus="onFocus"
      @blur="onBlur"
    />
    <view
      class="my-search-box"
      v-else
      :style="{
        height: config.height + 'px',
        backgroundColor: config.backgroundColor,
        border: config.border,
      }"
    >
      <image class="icon" :src="config.icon" mode="scaleToFill" />
      <text
        class="placeholder"
        :style="{
          color: config.textColor,
        }"
        >{{ placeholderText }}</text
      >
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-search',
  props: {
    placeholderText: {
      type: String,
      default: '搜索',
    },
    isShowInput: {
      type: Boolean,
      default: true,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.config)
    console.log(this.isShowInput)
  },
  methods: {
    onConfirm(e) {
      this.$emit('confirm', e.value)
    },
    onInput(e) {
      this.$emit('input', e.value)
    },
    onCancel(e) {
      this.$emit('cancel', e.value)
    },
    onClear(e) {
      this.$emit('clear', e.value)
    },
    onFocus(e) {
      this.$emit('focus', e.value)
    },
    onBlur(e) {
      this.$emit('blur', e.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.my-search-container {
  display: flex;
  align-items: center;
  .search-bar-box {
    position: sticky;
    top: 0px;
    z-index: 9;
    width: 100%;
    padding: $uni-spacing-row-sm;
    background-color: $uni-bg-color;
  }
  .my-search-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    padding: 0 $uni-spacing-row-base;
    border: 1px solid #c9c9c9;
    border-radius: 15px;
    background-color: $uni-bg-color;
    .icon {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }
    .placeholder {
      margin-left: $uni-spacing-row-sm;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-placeholder;
    }
  }
}
</style>
