export const ListUsuario = () => {
  return [
    { name: 'id', label: 'ID', align: 'left', field: 'id' },
    { name: 'name', label: 'Nombre', align: 'left', field: 'name' },
    { name: 'email', label: 'Correo', align: 'left', field: 'email' },
    { name: 'profile', label: 'Perfil', align: 'left', field: 'profile' },
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
  ];
};
