export const ListUsuario = () => {
  return [
    {
      name: 'user',
      label: 'Nombre',
      align: 'left',
      field: 'user',
      sortable: true,
    },
    {
      name: 'apellidos',
      label: 'Apellidos',
      align: 'left',
      field: 'apellidos',
      sortable: true,
    },
    {
      name: 'email',
      label: 'Correo',
      align: 'left',
      field: 'email',
      sortable: true,
    },
    {
      name: 'phone',
      label: 'Teléfono',
      align: 'left',
      field: 'phone',
      sortable: true,
    },
    {
      name: 'last_access',
      label: 'Fecha Ingreso',
      align: 'left',
      field: 'last_access',
      sortable: true,
    },
    {
      name: 'estatus',
      label: 'Estatus',
      align: 'center',
      field: 'estatus',
      sortable: true,
    },
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
      sortable: true,
    },
    {
      name: 'Asignado a',
      label: 'Asignado a',
      align: 'left',
      field: 'asignado_a',
      sortable: true,
    },
    {
      name: 'created_at',
      label: 'Fecha Creación',
      align: 'left',
      field: 'created_at',
      sortable: true,
    },
    {
      name: 'updated_at',
      label: 'Fecha Actualización',
      align: 'left',
      field: 'updated_at',
      sortable: true,
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
      sortable: true,
    },
    {
      name: 'cesion',
      label: 'Cesión',
      align: 'center',
      field: 'cesion',
      sortable: true,
    },
    {
      name: 'cartera',
      label: 'Cartera',
      align: 'left',
      field: 'cartera',
      sortable: true,
    },
    {
      name: 'PorcentajeAvance',
      label: 'Porcentaje de avances',
      align: 'center',
      field: 'PorcentajeAvance',
      sortable: true,
    },
    {
      name: 'AsignadoA',
      label: 'Asignado A',
      align: 'left',
      field: 'AsignadoA',
      sortable: true,
    },
    {
      name: 'Estatus',
      label: 'Estatus',
      align: 'center',
      field: 'Estatus',
      sortable: true,
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
      sortable: true,
    },
    {
      name: 'CARTERA',
      label: 'Cartera',
      align: 'center',
      field: 'CARTERA',
      sortable: true,
    },
    {
      name: 'NO_DE_CREDITO_O_CONTRATO',
      label: 'No de Credito o Contrato',
      align: 'left',
      field: 'NO_DE_CREDITO_O_CONTRATO',
      sortable: true,
    },
    {
      name: 'NOMBRE_COMPLETO',
      label: 'Nombre Completo',
      align: 'center',
      field: 'NOMBRE_COMPLETO',
      sortable: true,
    },
    {
      name: 'DIRECCION',
      label: 'Dirección',
      align: 'left',
      field: 'DIRECCION',
      sortable: true,
    },
    {
      name: 'ANALISTA_ASIGNADO',
      label: 'Analista Asignado',
      align: 'center',
      field: 'ANALISTA_ASIGNADO',
      sortable: true,
    },
    {
      name: 'VALIDAR_NOMBRE_Y_FIRMA_EN_SOLICITUD_Y_PAGARE',
      label: 'Validar Nombre y Firmar en Solicitud y Pagare',
      align: 'center',
      field: 'VALIDAR_NOMBRE_Y_FIRMA_EN_SOLICITUD_Y_PAGARE',
      sortable: true,
    },
    {
      name: 'finalizado',
      label: 'Finalizado',
      align: 'center',
      field: 'finalizado',
      sortable: true,
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
      sortable: true,
    },
    {
      name: 'created_at',
      label: 'Fecha de creación',
      align: 'left',
      field: 'created_at',
      sortable: true,
    },
    {
      name: 'created_by',
      label: 'Creado por',
      align: 'left',
      field: 'created_by',
      sortable: true,
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
