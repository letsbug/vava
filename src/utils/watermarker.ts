import { Message } from 'element-ui';

export enum IWaterMarkerPlacement {
  topStart,
  top,
  topEnd,
  centerStart,
  center,
  centerEnd,
  bottomStart,
  bottom,
  bottomEnd,
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
  placement?: IWaterMarkerPlacement;
  ratio?: number;
  opacity?: number;
  // rotate?: number;
  horizontal?: number;
  vertical?: number;
}

const jpeg = 'image/jpeg';

class IWaterMarker implements IWaterMarkerOption {
  public static supportedTypes: { [key: string]: string } = {
    png: 'image/png',
    jpg: jpeg,
    jpeg,
  };

  fileSize!: number;
  placement: IWaterMarkerPlacement;
  ratio: number;
  opacity: number;
  // rotate: number;
  horizontal: number;
  vertical: number;

  private canvas: HTMLCanvasElement;

  constructor(options?: IWaterMarkerOption) {
    options = Object.assign(
      {},
      {
        fileSize: 100,
        placement: IWaterMarkerPlacement.center,
        ratio: 20,
        opacity: 80,
        // rotate: -15,
        horizontal: 15,
        vertical: 15,
      },
      options
    );

    const { fileSize, placement, ratio, opacity, /*rotate,*/ horizontal, vertical } = options;

    this.fileSize = fileSize!;
    this.placement = placement!;
    this.ratio = ratio!;
    this.opacity = opacity!;
    // this.rotate = rotate!;
    this.horizontal = horizontal!;
    this.vertical = vertical!;

    this.canvas = document.createElement('canvas');
  }

  public validate(file: File) {
    if (!Object.values(IWaterMarker.supportedTypes).includes(file.type)) {
      Message.error('上传的水印图片只能是 PNG 或 JPG 格式!');
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
    const tw = target.width;
    const th = target.height;
    const mw = marker.width;
    const mh = marker.height;
    const ratio = mw / mh;
    let width: number;
    let height: number;

    if (tw - mw > th - mh) {
      height = (th * this.ratio) / 100;
      width = height * ratio;
    } else {
      width = (tw * this.ratio) / 100;
      height = width / ratio;
    }

    return { width, height };
  }

  private position(tWidth: number, tHeight: number, mWidth: number, mHeight: number) {
    let left: number = 0;
    let top: number = 0;
    const placement = this.placement;
    if (placement === IWaterMarkerPlacement.topStart) {
      top = this.vertical;
      left = this.horizontal;
    } else if (placement === IWaterMarkerPlacement.top) {
      top = this.vertical;
      left = (tWidth - mWidth) / 2;
    } else if (placement === IWaterMarkerPlacement.topEnd) {
      top = this.vertical;
      left = tWidth - mWidth - this.horizontal;
    } else if (placement === IWaterMarkerPlacement.centerStart) {
      top = (tHeight - mHeight) / 2;
      left = this.horizontal;
    } else if (placement === IWaterMarkerPlacement.center) {
      top = (tHeight - mHeight) / 2;
      left = (tWidth - mWidth) / 2;
    } else if (placement === IWaterMarkerPlacement.centerEnd) {
      top = (tHeight - mHeight) / 2;
      left = tWidth - mWidth - this.horizontal;
    } else if (placement === IWaterMarkerPlacement.bottomStart) {
      top = tHeight - mHeight - this.vertical;
      left = this.horizontal;
    } else if (placement === IWaterMarkerPlacement.bottom) {
      top = tHeight - mHeight - this.vertical;
      left = (tWidth - mWidth) / 2;
    } else if (placement === IWaterMarkerPlacement.bottomEnd) {
      top = tHeight - mHeight - this.vertical;
      left = tWidth - mWidth - this.horizontal;
    }

    return { left, top };
  }

  public generate(target: string, marker: string) {
    return new Promise<string>((resolve) => {
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
        // ctx.rotate((this.rotate * Math.PI) / 180);
        ctx.beginPath();
        ctx.drawImage(m, left, top, width, height);
        ctx.closePath();
        ctx.save();
        const base64Url = this.canvas.toDataURL();
        resolve(base64Url);
      };
    });
  }
}

export default IWaterMarker;
