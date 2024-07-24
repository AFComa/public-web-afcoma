export interface ListUserI {
  id?: number;
  name?: string;
  email?: string;
  profile?: string;
}

export interface ColumI {
  name: string;
  label: string;
  field: string | ((row: ListUserI) => string);
}
