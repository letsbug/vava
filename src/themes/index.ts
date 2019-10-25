import { xhr } from '@/apis/xhr';
import { generateColors } from '@/utils/color';
import { IStateTheme } from '@/store/modules/system';

class Theme {
  private template: string = '';

  private convertTemplate(data: string) {
    const colorMap: { [key: string]: string } = {
      '#24963e': 'shade-1',
      '#28a745': 'themePrimary',
      '#3db058': 'light-1',
      '#53b96a': 'light-2',
      '#69c17d': 'light-3',
      '#7eca8f': 'light-4',
      '#94d3a2': 'light-5',
      '#a9dcb5': 'light-6',
      '#bfe5c7': 'light-7',
      '#d4edda': 'light-8',
      '#eaf6ec': 'light-9',
      '40,167,69': 'themeOpacityPrimary'
    };
    Object.keys(colorMap).forEach(key => {
      const value = colorMap[key];
      data = data.replace(new RegExp(key, 'ig'), value);
    });
    data = data
      .replace(/@font-face{[^}]+}/g, '')
      .replace(/\[class\*=" el-icon-"],\[class\^=el-icon-]{[^}]+}/g, '')
      .replace(/\.el-icon[^}]+}/g, '');
    return data;
  }

  private async loadTemplate() {
    const { data } = (await xhr('./assets/css/theme-template.min.css')) as any;
    this.template = this.convertTemplate(data);
  }

  private async setColor(color: string) {
    if (!this.template) {
      await this.loadTemplate();
    }
    const newPrimaries = generateColors(color);
    let styleTag = document.getElementById('appThemeChalk');
    let cssText = this.template;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'appThemeChalk';
      document.head.appendChild(styleTag);
    }

    Object.keys(newPrimaries).forEach(key => {
      const reg = new RegExp(key, 'g');
      cssText = cssText.replace(reg, newPrimaries[key]);
    });

    styleTag.innerHTML = cssText;
  }

  private setType(style: string) {
    const body = document.body;
    if (Array.from(body.classList).includes(style)) return;
    body.className = `theme-${style}`;
  }

  public async set(themes: IStateTheme) {
    console.log(themes);
    await this.setColor(themes.color);
    this.setType(themes.type);
  }
}

export const themeTool = new Theme();
