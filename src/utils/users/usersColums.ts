export const ListUsuario = () => {
  return [
    { name: 'user', label: 'Nombre', align: 'left', field: 'user' },
    {
      name: 'apellidos',
      label: 'Apellidos',
      align: 'left',
      field: 'apellidos',
    },
    { name: 'email', label: 'Correo', align: 'left', field: 'email' },
    { name: 'phone', label: 'Teléfono', align: 'left', field: 'phone' },
    {
      name: 'last_access',
      label: 'Fecha Ingreso',
      align: 'left',
      field: 'last_access',
    },
    { name: 'estatus', label: 'Estatus', align: 'center', field: 'estatus' },
    { name: 'actions', label: 'Acciones', align: 'center', field: 'actions' },
  ];
};

export const ListMandatos = () => {
  return [
    {
      name: 'Nombre',
      label: 'Nombre',
      align: 'left',
      field: 'idmandato',
    },
    {
      name: 'Asignado a',
      label: 'Asignado a',
      align: 'left',
      field: 'asignado_a',
    },
    {
      name: 'created_at',
      label: 'Fecha Creación',
      align: 'left',
      field: 'created_at',
    },
    {
      name: 'updated_at',
      label: 'Fecha Actualización',
      align: 'left',
      field: 'updated_at',
    },
    { name: 'actions', label: 'Acciones', align: 'center', field: 'actions' },
  ];
};

export const ListProyects = () => {
  return [
    {
      name: 'NombreProyecto',
      label: 'Nombre Proyecto',
      align: 'left',
      field: 'NombreProyecto',
    },
    {
      name: 'cesion',
      label: 'Cesión',
      align: 'center',
      field: 'cesion',
    },
    {
      name: 'cartera',
      label: 'Cartera',
      align: 'left',
      field: 'cartera',
    },
    {
      name: 'PorcentajeAvance',
      label: 'Porcentaje de avances',
      align: 'center',
      field: 'PorcentajeAvance',
    },
    {
      name: 'AsignadoA',
      label: 'Asignado A',
      align: 'left',
      field: 'AsignadoA',
    },
    {
      name: 'Estatus',
      label: 'Estatus',
      align: 'center',
      field: 'Estatus',
    },

    { name: 'actions', label: 'Acciones', align: 'center', field: 'actions' },
  ];
};

export const ListActionUser = () => {
  return [
    { name: 'module', label: 'Módulo', field: 'module', align: 'left' },
    { name: 'create', label: 'Crear', field: 'create', align: 'center' },
    { name: 'edit', label: 'Editar', field: 'edit', align: 'center' },
    { name: 'block', label: 'Bloquear', field: 'block', align: 'center' },
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

export const ListActionMandatos = () => {
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
      block: false,
      view: false,
      download: false,
      opera: false,
    },
  ];
};
