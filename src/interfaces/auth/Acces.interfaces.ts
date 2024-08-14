export interface AccesUserI {
  last_access?: string;
  username?: string;
  avatar?: string;
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
