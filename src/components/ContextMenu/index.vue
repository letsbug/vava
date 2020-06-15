<template>
  <transition name="el-zoom-in-top">
    <ul v-show="visible" ref="contextMenus" :style="axis" class="va-context-menu" @click.stop>
      <li
        v-for="(item, i) in options"
        :key="i"
        :class="{ disabled: item.disabled, divided: item.divided }"
        class="va-context-menu-item"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { IContextOptions, IContextAxis } from '@/components';

@Component({ name: 'ContextMenu' })
export default class extends Vue {
  private visible: boolean = false;
  private axis?: IContextAxis = { top: 0, left: 0 };

  @Prop({ required: true }) private options!: IContextOptions[];

  @Prop({ default: null }) private target!: any;

  @Watch('visible')
  private onVisibleChange(visible: boolean) {
    if (visible) document.body.addEventListener('click', this.close);
    else document.body.removeEventListener('click', this.close);
  }

  mounted() {
    document.body.appendChild(this.$el);
  }

  destroyed() {
    if (this.$el && this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }

  private handleClick(data: IContextOptions) {
    if (data.disabled) return;
    if (data.command && typeof data.command === 'function') {
      data.command(this.target);
    }
    this.close();
  }

  public open($event: MouseEvent) {
    this.axis = {
      top: $event.clientY + 'px',
      left: $event.clientX + 'px',
    };
    this.visible = true;
  }

  public close() {
    this.visible = false;
    setTimeout(() => {
      this.axis = { top: 0, left: 0 };
    }, 300);
  }
}
</script>
