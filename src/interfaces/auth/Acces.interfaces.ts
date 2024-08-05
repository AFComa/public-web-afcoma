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

export interface UserCreateI {
  email: string;
  nombre: string;
  apellido: string;
  phone: string;
}
