import { IPaintedFaceCompareFields, IPaintedFaceComparePositions } from './types';

class IPaintedFace implements IPaintedFaceCompareFields {
  // init compare fields
  author: string = 'author';
  content: string = 'content';
  title: string = 'title';
  version: string = 'version';
  summary: string = 'summary';

  // Currently compares the two versions of the array index
  private leftIndex!: number;
  private rightIndex!: number;

  constructor(options: IPaintedFaceCompareFields) {
    const { author, title, summary, content, version } = options;
    author && (this.author = author);
    title && (this.title = title);
    summary && (this.summary = summary);
    content && (this.content = content);
    version && (this.version = version);
  }

  public execute(versions: any[]) {}

  private merge() {}

  private compare(leftVersion: any, rightVersion: any) {
    const ranges: IPaintedFaceComparePositions[] = [];
  }
}

export default IPaintedFace;
