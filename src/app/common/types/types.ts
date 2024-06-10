export type Page<T> = {
    page: number;
    rpp: number;
    totalCount: number;
    list: Array<T>;
  };
  