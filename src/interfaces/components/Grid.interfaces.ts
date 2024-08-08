export interface ListUserI {
  apellidos: string;
  email?: string;
  last_access?: string;
  phone?: string;
  user: string;
  _id?: string;
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

export interface OpcGridI {
  id: string | undefined;
  opc: number;
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
