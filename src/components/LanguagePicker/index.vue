<template>
  <el-dropdown trigger="click" @command="pickLang">
    <a :class="className ? className : null" class="va-lang-picker">
      <va-icon icon="action-translate" />
    </a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IStoreSystem } from '@/store/modules/system';

@Component({ name: 'LanguagePicker' })
export default class extends Vue {
  @Prop({ default: null })
  private className!: string;

  get language() {
    return IStoreSystem.language;
  }

  private pickLang(target: string) {
    this.$i18n.locale = target;
    this.$store.dispatch('app_language_set', target);
  }
}
</script>
