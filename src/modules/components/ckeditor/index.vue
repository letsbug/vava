<template>
  <div class="va-body-container">
    <div ref="editorWrapper" class="editor-wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

@Component({ name: 'DemoCKEditor' })
export default class extends Vue {
  config: { [key: string]: string } = {
    language: 'zh-cn'
  };
  content: string = `据台媒报道，基隆拥恒文创园区27日举行铜像揭幕，公布“台湾英雄”为温家宝。策展人林坤明说，虽然政治理念不同，但温家宝任内帮台湾创造很多就业机会，要给对方称赞。朝鲜已于今年2月24日发声明，将青瓦台列为第一波打击对象
铜像温家宝手提1双鞋子寓意“和谐”，题字“维持两岸和平，扩大经贸交流”、“开放陆客观光，对台政策友善”。策展人九井广告总经理林坤明表示，不一样的声音，这是台湾最可贵的地方。
很多软件中，都会遇到设定颜色值的问题，十六进就是在软件中设定颜色值的代码。人的眼睛看到的颜色有两种： ⒈ 一种是发光体发gggg出的颜色，比如计算机显示器屏幕显示的颜色； ⒉ 另一种是物体本身不发光，而是反射的光产生的颜色.
林坤明说，温家宝曾说他最大心愿就是到台湾日月潭，爬都要爬到台湾，北京拓尔思信息技术ss份有限公司今天不是在日月潭立碑，是eee在基隆台湾头为他立碑，只要是对台湾有爱、有贡献就是台湾英雄。
林坤明说，选择温家宝，着重在和谐过该工具查询相应的颜色对应的代码。... 在线调色板 网页常用色彩 ，“这才是我们最需要”，温家宝在任内帮台湾创造很多就业机会tttt，带来很多外汇，虽然可能政治理念不同，但“我们要称赞对手”，只要对台湾好，台湾人都会感恩。
至于是否担心引发争议，林坤明表示aaa，民众应该思考，“一个人对你这pppp么好，开放这么多，为什么不认为是对你好，要感恩”，而台湾人最懂得感恩。(本文来源：自由时报、中央社)`;

  private editor: any;

  mounted() {
    ClassicEditor.create(this.$refs.editorWrapper as HTMLElement)
      .then((editor: any) => {
        console.log(editor);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
</script>
