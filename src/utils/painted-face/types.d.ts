export interface IPaintedFaceCompareFields {
  version?: string;
  title?: string;
  summary?: string;
  content?: string;
  author?: string;
}

export interface IPaintedFaceComparePositions {
  type: '+' | '=' | '-';
  sp1: number;
  ep1: number;
  sp2: number;
  ep2: number;
  timestamp: number;
  author: string;
  fragment: string;
  version: number | string;
}
