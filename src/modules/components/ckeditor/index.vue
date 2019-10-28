<template>
  <div class="va-body-container">
    <div ref="editorWrapper" class="editor-wrapper">{{ article.content }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import { apiDetail } from '@/apis/articles';
import { ITypeArticle } from '@/apis/types';

@Component({ name: 'DemoCKEditor' })
export default class extends Vue {
  private config: { [key: string]: string } = {
    language: 'zh-cn'
  };
  private article: ITypeArticle = {
    id: '',
    title: '',
    content: '',
    timestamp: 0,
    author: '',
    status: 0
  };

  private editor: any;

  async mounted() {
    try {
      const editor = await ClassicEditor.create(this.$refs.editorWrapper as HTMLElement);
      const { data } = await apiDetail(1);
      this.article = data;
      editor.setData(this.article.content);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
