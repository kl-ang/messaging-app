export interface FetchProps extends RequestInit {
    path: string;
    body?: BodyInit;
  }
  
export type GetFetchProps = Omit<FetchProps, 'body'>