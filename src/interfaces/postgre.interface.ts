export interface PostgreSqlReturn {
  rowCount: number;
  rows: Array<any>;
  jsondata:Object;
  message?: string;
}
