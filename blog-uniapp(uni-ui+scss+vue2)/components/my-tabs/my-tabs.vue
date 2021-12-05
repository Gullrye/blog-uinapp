<template>
  <!-- 
		通用组件
		1. 可以在父组件中定制样式
		2. 可以在父组件中指定数据
		3. 可以在父组件中选中项
	 -->
  <view class="hot-tabs-container">
    <view class="hot-tabs">
      <scroll-view
        scroll-x
        class="scroll-view"
        :scroll-left="scrollLeft"
        scroll-with-animation
      >
        <view class="scroll-content">
          <view class="tab-item-box">
            <block v-for="(item, index) in tabData" :key="item.id">
              <view
                :id="'tab_' + index"
                class="tab-item"
                @click="handleTabClick(index)"
                :class="{ 'tab-item-active': index === activeIndex }"
                :style="{
                  color:
                    activeIndex === index
                      ? defaultConfig.activeTextColor
                      : defaultConfig.textColor,
                }"
                >{{ item.label }}</view
              >
            </block>
          </view>
          <view
            class="underLine"
            :style="{
              transform: 'translateX(' + slider.left + 'px)',
              width: defaultConfig.underLineWidth + 'px',
              height: defaultConfig.underLineHeight + 'px',
              backgroundColor: defaultConfig.underLineBgColor,
            }"
          ></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-tabs',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    tabData: {
      type: Array,
      default: () => [],
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeIndex: -1,
      slider: {
        left: 15,
      },
      defaultConfig: {
        textColor: '#333',
        activeColor: 'red',
        underLineWidth: 24,
        underLineHeight: 2,
        underLineBgColor: 'red',
      },
      tabList: [],
      scrollLeft: 0,
    }
  },
  methods: {
    handleTabClick(index) {
      this.activeIndex = index

      this.tabToIndex()

      this.$emit('tabClick', index)
    },
    tabToIndex() {
      if (this.tabList.length === 0) return
      const activeIndex = this.activeIndex
      const underLineWidth = this.defaultConfig.underLineWidth
      this.slider = {
        left: this.tabList[activeIndex]._slider.left,
      }
      // 点击时，scroll-view 进行横向滚动
      this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth
    },
    updateTabWidth() {
      let data = this.tabList
      if (data.length === 0) {
        return false
      }
      const query = uni.createSelectorQuery().in(this)
      // 循环 tabList 数据
      data.forEach((item, index) => {
        query
          .select('#tab_' + index)
          .boundingClientRect((res) => {
            // res 即为获取元素的布局信息
            // underLine 滑块的位置 = 当前激活 tab 的 left + (当前激活 tab 的 width - 滑块的 width) / 2
            // 每个 tab 对应的滑块位置
            item._slider = {
              left:
                res.left + (res.width - this.defaultConfig.underLineWidth) / 2,
            }
          })
          .exec()
      })
    },
  },

  watch: {
    tabData: {
      handler(val) {
        this.tabList = val
        setTimeout(() => {
          this.updateTabWidth()
        }, 0)
      },
      immediate: true,
    },
    defaultIndex: {
      // 当 defaultIndex 变化时，回调的方法
      // 设置默认 tab 为当前激活的 tab
      handler(val) {
        this.activeIndex = val
        // swiper 切换时，滑块也滚动
        this.tabToIndex()
      },
      // handler 回调将会在侦听开始之后被立即调用
      immediate: true,
    },
    config: {
      handler(val) {
        this.defaultConfig = { ...this.defaultConfig, ...val }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.hot-tabs-container {
  height: 45px;
  line-height: 45px;
  font-size: $uni-font-size-base;
  background-color: $uni-bg-color;
  .scroll-view {
    white-space: nowrap;
    .scroll-content {
      position: relative;
      .tab-item {
        display: inline-block;
        padding: 0 15px;
        text-align: center;
      }
      .underLine {
        position: absolute;
        bottom: 0;
        border-radius: 1px;
        transition: 0.5s;
      }
    }
  }
}
.tab-item-active {
  color: red !important;
}
/* #ifdef H5 */
::v-deep .uni-scroll-view::-webkit-scrollbar {
  display: none;
}

::v-deep .uni-scroll-view {
  scrollbar-width: none;
}
/* #endif */
</style>
