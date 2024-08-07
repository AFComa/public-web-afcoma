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

export interface ColumCreateUserI {
  id: number;
  module: string;
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
  download: boolean;
  opera: boolean;
}

export interface UnionColumnI {
  usersPermissions: ColumCreateUserI[];
  sysadocPermission: ColumCreateUserI[];
  mandatosPermissions: ColumCreateUserI[];
}

export interface CreateGUI {
  email: string;
  nombre: string;
  apellido: string;
  phone: string;
  configUser: UnionColumnI;
}
