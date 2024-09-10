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

export const ListRegisterProyects = () => {
  return [
    {
      name: 'C',
      label: 'C',
      align: 'left',
      field: 'C',
    },
    {
      name: 'CARTERA',
      label: 'Cartera',
      align: 'center',
      field: 'CARTERA',
    },
    {
      name: 'NO_DE_CREDITO_O_CONTRATO',
      label: 'No de Credito o Contrato',
      align: 'left',
      field: 'NO_DE_CREDITO_O_CONTRATO',
    },
    {
      name: 'NOMBRE_COMPLETO',
      label: 'Nombre Completo',
      align: 'center',
      field: 'NOMBRE_COMPLETO',
    },
    {
      name: 'DIRECCION',
      label: 'Dirección',
      align: 'left',
      field: 'DIRECCION',
    },
    {
      name: 'ANALISTA_ASIGNADO',
      label: 'Analista Asignado',
      align: 'center',
      field: 'ANALISTA_ASIGNADO',
    },
    {
      name: 'VALIDAR_NOMBRE_Y_FIRMA_EN_SOLICITUD_Y_PAGARE',
      label: 'Validar Nombre y Firmar en Solicitud y Pagare',
      align: 'center',
      field: 'VALIDAR_NOMBRE_Y_FIRMA_EN_SOLICITUD_Y_PAGARE',
    },
    {
      name: 'finalizado',
      label: 'Finalizado',
      align: 'center',
      field: 'finalizado',
    },
    { name: 'actions', label: 'Acciones', align: 'center', field: 'actions' },
  ];
};

export const ListConfigProyects = () => {
  return [
    {
      name: 'id',
      label: 'ID Proyecto',
      align: 'left',
      field: 'id',
    },
    {
      name: 'created_at',
      label: 'Fecha de creación',
      align: 'left',
      field: 'created_at',
    },
    {
      name: 'created_by',
      label: 'Creado por',
      align: 'left',
      field: 'created_by',
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

export const ListActionSisadoc = () => {
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

export const ListActionMandatos = () => {
  return [
    { name: 'module', label: 'Módulo', field: 'module', align: 'left' },
    { name: 'create', label: 'Crear', field: 'create', align: 'center' },
    { name: 'edit', label: 'Editar', field: 'edit', align: 'center' },
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

export const ListPermisionSisadoc = () => {
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
export const ListPermisionMandatos = () => {
  return [
    {
      id: 1,
      module: 'Administración',
      create: false,
      edit: false,
      view: false,
      download: false,
      opera: false,
    },
  ];
};
