export interface IPaintedFace {
  version: number;
  initialVersion: number;
  user: number;
  timestamp: number;
  content: string;
}

export interface IPaintedFaceRanges {
  ep1: string;
  ep2: string;
}

export interface IPaintedFaceCharIndex {
  charValueIndex: any;
  sortedCharValue: any[];

  buildIndex(): void;

  reLocate(): void;
}
