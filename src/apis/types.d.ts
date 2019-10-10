export enum SexType {
  female,
  male
}

export interface ITypeUser {
  id: string;
  username: string;
  password: string;
  token?: string;
  expire: number;
  roles: string[];
  nickname?: string;
  phone?: string;
  email?: string;
  qq?: number;
  company?: string;
  avatar?: string;
  sex: SexType;
  age?: number;
  birthday?: Date | string | number;
  height?: number;
  weight?: number;
  intro?: string;
}

export interface ITypesNotification {
  id: string;
  title: string;
  datetime: Date | string | number;
  isUnread: boolean;
}
