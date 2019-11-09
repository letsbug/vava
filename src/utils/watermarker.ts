import { Message } from 'element-ui';

export enum IWaterMarkerPlacement {
  tile,
  topStart,
  top,
  topEnd,
  centerStart,
  center,
  centerEnd,
  bottomStart,
  bottom,
  bottomEnd
}

/**
 * @param fileSize Maximum supported size of uploaded watermark image
 * @param fileType The type of image that the uploaded watermark image supports
 * @param placement The location of the watermark generation
 * @param ratio  The ratio between the size of the generated watermark and the size of the original image
 * @param opacity The opacity of the watermark image
 * @param horizontal The horizontal margin of a watermark image
 * @param vertical The vertical margin of a watermark image
 */
export interface IWaterMarkerOption {
  fileSize?: number;
  fileType?: string;
  placement?: IWaterMarkerPlacement;
  ratio?: number;
  opacity?: number;
  horizontal?: number;
  vertical?: number;
}

const jpeg = 'image/jpeg';
const types: { [key: string]: string } = {
  png: 'image/png',
  jpg: jpeg,
  jpeg
};

class IWaterMarker implements IWaterMarkerOption {
  fileSize!: number;
  fileType!: string;
  placement: IWaterMarkerPlacement;
  ratio: number;
  opacity: number;
  horizontal: number;
  vertical: number;
  private canvas: HTMLCanvasElement;

  constructor(options?: IWaterMarkerOption) {
    options = Object.assign(
      {},
      {
        fileSize: 100,
        fileType: 'png',
        placement: IWaterMarkerPlacement.center,
        ratio: 20,
        opacity: 80,
        horizontal: 15,
        vertical: 15
      },
      options
    );

    const { fileType, fileSize, placement, ratio, opacity, horizontal, vertical } = options;

    if (!Object.keys(types).includes(fileType!)) {
      throw Error('unknown file type: ' + options.fileType);
    }

    this.fileType = fileType!;
    this.fileSize = fileSize!;
    this.placement = placement!;
    this.ratio = ratio!;
    this.opacity = opacity!;
    this.horizontal = horizontal!;
    this.vertical = vertical!;

    this.canvas = document.createElement('canvas');
  }

  public beforeGenerate(file: File) {
    if (file.type !== types[this.fileType]) {
      Message.error(`上传头像图片只能是 ${this.fileType.toUpperCase()} 格式!`);
      return false;
    }
    const size = this.fileSize;
    if (file.size / 1024 >= size) {
      Message.error(`上传头像图片大小不能超过 ${size}KB!`);
      return false;
    }
    return true;
  }

  private static generateImage(url: string): HTMLImageElement {
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous';
    return image;
  }

  private size(target: HTMLImageElement, marker: HTMLImageElement) {
    const rm = marker.width / marker.height; // 水印宽高比
    const ts = (target.width + target.height) / 2;

    let width: number;
    let height: number;

    if (rm > 0) {
      height = ts * (this.ratio / 100);
      width = rm * height;
    } else {
      width = ts * (this.ratio / 100);
      height = width / rm;
    }

    return { width, height };
  }

  private position(tWidth: number, tHeight: number, mWidth: number, mHeight: number) {
    let left: number = 0;
    let top: number = 0;
    if (this.placement === IWaterMarkerPlacement.topStart) {
      left = this.horizontal;
      top = this.vertical;
    }

    return { left, top };
  }

  public generate(target: string, marker: string, callback: Function) {
    const m = IWaterMarker.generateImage(marker);
    const t = IWaterMarker.generateImage(target);

    t.onload = () => {
      this.canvas.width = t.width;
      this.canvas.height = t.height;
      const ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
      // draw target image first.
      ctx.beginPath();
      ctx.drawImage(t, 0, 0);
      ctx.closePath();
      ctx.save();

      // draw marker image last
      const { width, height } = this.size(t, m);
      const { left, top } = this.position(t.width, t.height, width, height);

      ctx.globalAlpha = this.opacity / 100;
      ctx.beginPath();
      ctx.drawImage(m, left, top, width, height);
      ctx.closePath();
      ctx.save();
      const base64Url = this.canvas.toDataURL();
      callback && callback(base64Url);
    };
  }
}

export default IWaterMarker;
