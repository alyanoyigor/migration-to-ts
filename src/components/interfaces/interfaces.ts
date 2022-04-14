export type Callback<T> = (data: T) => void;

export interface HTMLElementEvent<T extends HTMLElement> extends EventTarget {
  target: T | null;
  currentTarget: T | null;
}

export interface Options {
  sources?: string;
  apiKey?: string;
}

export interface LoaderResponse {
  endpoint: string;
  options?: Options;
}

export interface IArticles {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: SourcesData;
  title: string;
  url: string;
  urlToImage: string;
}

interface IApiData {
  status: string;
  totalResults: number;
}

export interface IArticlesResponse extends IApiData {
  articles: Array<IArticles>;
}
export interface ISourcesResponse extends IApiData {
  sources: Array<ISources>;
}

export interface ISources {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

export interface IData {
  articles: IArticles[];
  sources: ISources[];
}

export interface SourcesData {
  name: string;
  id: string;
}

export enum ErrorStatusCode {
  Unauthorize = 401,
  PaymentRequired,
  Forbidden,
  NotFound,
}
