export interface ListUserI {
  apellidos: string;
  estatus: string;
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

export interface ColumUserI {
  name: string;
  label: string;
  field: string | ((row: ListUserI) => string);
  align: string;
}

export interface ColumCreateUserI {
  id: number;
  module: string;
  create: boolean;
  edit: boolean;
  block: boolean;
  view: boolean;
  download: boolean;
  opera: boolean;
}

export interface ColumCreateSisadocI {
  id: number;
  module: string;
  create: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
  download: boolean;
  opera: boolean;
}

export interface ColumCreateMandatosI {
  id: number;
  module: string;
  create: boolean;
  edit: boolean;
  view: boolean;
  download: boolean;
  opera: boolean;
}

export interface OpcGridI {
  id: string | undefined;
  opc: number;
}
export interface EstatusI {
  _id: string | undefined;
  estatus: number;
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

export interface CreateProyectI {
  identificador: string;
  originador: string;
  fondeador: string;
  institucion_bancaria: string;
  administrador_primario: string;
  administrador_maestro: string;
  despacho_juridico: string;
  representante_comun: string;
  calificadora: string;
  despacho_auditores: string;
  nombre_contacto: string;
  correo_contacto: string;
  telefono_contacto: string;
  url_reporte: string;
  url_incidencia: string;
  _id?: string | string[];
}

export interface DeleteProyectI {
  id: string;
  cartera: string;
  cesion: string;
  NombreProyecto: string;
}

export interface AssingProyectI {
  asignado_a: string;
  _id: string;
}

export interface DeleteProyectActionsI {
  id: string;
  cartera: string;
  cesion: string;
  proyect: string;
}
export interface RegisterProyectI {
  id: string | string[];
  cartera: string | string[];
  cesion: string | string[];
}

export interface ReportIncI {
  cartera: string | string[];
  cesion: string | string[];
  proyect: string | string[];
}

export interface CargaDatosProyectobyIdI {
  id: string;
  cartera: string;
  cesion: string;
  data: string | string[];
}

export interface cargDatosExcelI {
  proyect: string;
  created_at: string;
  created_by: string;
  layout: string | string[];
  layout_spetial: string | string[];
}

export interface habilitProyectI {
  id: string | undefined;
  proyect: string;
}
