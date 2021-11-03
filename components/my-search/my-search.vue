<template>
  <view class="my-search-container">
    <view class="my-search-box">
      <image class="icon" src="@/static/images/search.png" mode="scaleToFill" />
			<text class="placeholder">{{ placeholderText }}</text>
		</view>
  </view>
</template>

<script>
export default {
  name: 'my-search',
	props: {
		placeholderText: {
			type: String,
			default: '搜索'
		}
	},
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.my-search-container {
	display: flex;
	align-items: center;
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
