export const ListUsuario = () => {
  return [
    { name: '_id', label: 'ID', align: 'left', field: '_id' },
    { name: 'user', label: 'Nombre', align: 'left', field: 'user' },
    {
      name: 'apellidos',
      label: 'Apellidos',
      align: 'left',
      field: 'apellidos',
    },
    { name: 'email', label: 'Correo', align: 'left', field: 'email' },
    { name: 'phone', label: 'Telefono', align: 'left', field: 'phone' },
    { name: 'actions', label: 'Acciones', align: 'center', field: 'actions' },
  ];
};

export const ListActionUser = () => {
  return [
    { name: 'module', label: 'Módulo', field: 'module', align: 'left' },
    { name: 'create', label: 'Crear', field: 'create', align: 'center' },
    { name: 'edit', label: 'Editar', field: 'edit', align: 'center' },
    { name: 'delete', label: 'Eliminar', field: 'delete', align: 'center' },
    { name: 'view', label: 'Consultar', field: 'view', align: 'center' },
    {
      name: 'download',
      label: 'Descarga',
      field: 'download',
      align: 'center',
    },
    {
      name: 'opera',
      label: 'Operador',
      field: 'opera',
      align: 'center',
    },
  ];
};

export const ListPermision = () => {
  return [
    {
      id: 1,
      module: 'Administración',
      create: false,
      edit: false,
      delete: false,
      view: false,
      download: false,
      opera: false,
    },
  ];
};
