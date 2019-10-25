export enum ITypeArticleStatus {
  draft,
  committed,
  failing,
  auditing,
  audited,
  deleted
}

export interface ITypeChartData {
  key: string;
  value: number | string;
}

export interface ITypeStatistics {
  pv: any;
  uv: any;
  cvr: any;
}

export interface ITypeNotification {
  id: string | number;
  title: string;
  timestamp: Date | string | number;
  isUnread: boolean;
}

export interface ITypeArticle {
  id: string | number;
  timestamp: Date | string | number;
  author: string | number;
  auditor: string | number;
  title: string;
  summery: string;
  content: string;
  status: ITypeArticleStatus;
  source: string;
  pageviews: number;
}

export interface ITypePaintedFace {
  version: string | number;
  timestamp: string | number | Date;
  user: string;
  word: string;
}
