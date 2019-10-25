import 'highlight.js/styles/github.css';
import highlight from 'highlight.js';
import { DirectiveOptions } from 'vue/types/options';

export const Highlight: DirectiveOptions = {
  bind: (el: HTMLElement) => {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach(block => {
      highlight.highlightBlock(block);
    });
  }
};
