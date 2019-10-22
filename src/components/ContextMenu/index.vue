<template>
  <transition name="el-zoom-in-top">
    <ul v-show="visible" ref="contextMenus" :style="axis" class="va-context-menu" @click.stop>
      <li
        v-for="item in options"
        :key="item.name"
        :class="{ disabled: item.disabled, divided: item.divided }"
        class="va-context-menu-item"
        @click="handleClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component({ name: 'ContextMenu' })
export default class extends Vue {
  visible: boolean = false;
  axis: any = {};

  @Prop({ required: true })
  options!: any[];

  @Prop({ default: null })
  private target!: any;

  @Watch('visible')
  private onVisibleChange(visible: boolean) {
    if (visible) document.body.addEventListener('click', this.close);
    else document.body.removeEventListener('click', this.close);
  }

  created() {
    this.options.forEach(v => {
      if (!v.name) throw new Error("The object of the array is missing the 'name' parameter.");
      if (!v.callback) throw new Error("The object of the array is missing the 'callback' parameter.");
    });
  }

  mounted() {
    document.body.appendChild(this.$el);
  }

  destroyed() {
    if (this.$el && this.$el.parentNode) {
      document.body.removeChild(this.$el);
    }
  }

  handleClick(data: any) {
    if (data.disabled) return;
    if (data.callback && typeof data.callback === 'function') data.callback(this.target);
    this.close();
  }

  open($event: MouseEvent) {
    this.axis = {
      top: $event.clientY + 'px',
      left: $event.clientX + 'px'
    };
    this.visible = true;
  }

  close() {
    this.visible = false;
    setTimeout(() => {
      this.axis = {};
    }, 300);
  }
}
</script>
