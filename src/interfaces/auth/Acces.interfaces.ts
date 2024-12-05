export interface AccesUserI {
  last_access?: string;
  username?: string;
  avatar?: string;
  ID: string;
}

export interface UserI {
  usuario: string;
  password: string;
  ip: string;
}

export interface LoginError {
  ok: false;
  message: string;
}

export interface LoginSuccess {
  ok: true;
  token: string;
}

export interface GetAllMandatoI {
  is_operator: boolean;
  userid: string;
}

export interface UserCreateI {
  email: string;
  nombre: string;
  apellido: string;
  phone: string;
}

export interface UserListAssingI {
  _id: string;
  user: string;
  apellidos: string;
  email: string;
  phone: string;
  estatus: string;
  last_access: string;
}
export interface MandatosAssingI {
  asignado_a: string;
  created_at: string;
  idmandato: string;
  updated_at: string;
  _id: string;
}
export interface filterSelectI {
  label: string;
  value: string;
}

export interface opcionAssingI {
  idmandato: string;
  userid: string;
}

export interface proyectgetI {
  nombre: string;
  apellido: string;
  perfil: string;
}

export interface CartProyectI {
  name: string;
  email: string;
  telefono: string;
  reporteoApi: string;
  incidenciaApi: string;
}

export interface LogoutI {
  token: string | null;
  _id: string | null;
}

export interface userCatalogo {
  user_name: string;
  id_user: string;
}

export interface CatalogoCreate {
  user: userCatalogo;
  nombre: string;
}

export interface RelationPage {
  catalogo_general: string;
  catalogo_cliente: string;
}

export interface RelationGeneralCatalogo {
  user: userCatalogo;
  nombre_mandato: string;
  relacion?: RelationPage;
}

export interface linkPower {
  user: userCatalogo;
  idmandato: string | null;
  link?: string;
}
