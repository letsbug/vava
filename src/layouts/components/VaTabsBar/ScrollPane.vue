<template>
  <el-scrollbar ref="scrollPane" class="va-scroll-container" @wheel.prevent.native="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'ITabScrollPane' })
export default class extends Vue {
  private left: number = 0;

  handleScroll(e: WheelEvent) {
    console.log(e);
    const data = e.deltaY;
    const wrapper = (this.$refs['scrollPane'] as any).$refs['wrap'];
    wrapper.scrollLeft = wrapper.scrollLeft - data / 3;
  }

  scrollTo(target: HTMLElement) {
    const container = (this.$refs['scrollPane'] as any).$el;
    const containerWidth = container.offsetWidth;
    const wrapper = (this.$refs['scrollPane'] as any).$refs['wrap'];
    const targetLeft = target.offsetLeft;
    const targetWidth = target.offsetWidth;
    wrapper.scrollLeft = targetLeft > containerWidth ? targetLeft - containerWidth + targetWidth : targetLeft;
  }
}
</script>
