export const NEGOCIOS_BARRIO = [
  {
    id: 'maria',
    nombre: 'Despensa María',
    direccion: 'Av. San Martín 412',
    horario: 'Lun a Sáb de 8 a 21 hs',
  },
  {
    id: 'norte',
    nombre: 'Supermercado Norte',
    direccion: 'Belgrano 890',
    horario: 'Todos los días de 8:30 a 22 hs',
  },
  {
    id: 'jose',
    nombre: 'Almacén Don José',
    direccion: 'Rivadavia 235',
    horario: 'Lun a Sáb de 7:30 a 20:30 hs',
  },
];

export const PRODUCTOS_INICIALES = [
  {
    id: '1',
    nombre: 'Yerba',
    detalle: 'Paquete 1 kg',
    precios: [
      { negocio: 'Despensa María', monto: 4800 },
      { negocio: 'Supermercado Norte', monto: 5200 },
      { negocio: 'Almacén Don José', monto: 4500 },
    ],
  },
  {
    id: '2',
    nombre: 'Leche',
    detalle: 'Sachet 1 L',
    precios: [
      { negocio: 'Despensa María', monto: 1500 },
      { negocio: 'Supermercado Norte', monto: 1700 },
      { negocio: 'Almacén Don José', monto: 1600 },
    ],
  },
  {
    id: '3',
    nombre: 'Pan',
    detalle: 'Bolsa familiar',
    precios: [
      { negocio: 'Despensa María', monto: 6400 },
      { negocio: 'Supermercado Norte', monto: 6600 },
      { negocio: 'Almacén Don José', monto: 6100 },
    ],
  },
  {
    id: '4',
    nombre: 'Azúcar',
    detalle: 'Pack ahorro x3',
    precios: [
      { negocio: 'Despensa María', monto: 5800 },
      { negocio: 'Supermercado Norte', monto: 5800 },
      { negocio: 'Almacén Don José', monto: 5700 },
    ],
  },
  {
    id: '5',
    nombre: 'Arroz',
    detalle: 'Paquete 1 kg',
    precios: [
      { negocio: 'Despensa María', monto: 1950 },
      { negocio: 'Supermercado Norte', monto: 2100 },
      { negocio: 'Almacén Don José', monto: 1850 },
    ],
  },
  {
    id: '6',
    nombre: 'Aceite',
    detalle: 'Botella 1.5 L',
    precios: [
      { negocio: 'Despensa María', monto: 3900 },
      { negocio: 'Supermercado Norte', monto: 3650 },
      { negocio: 'Almacén Don José', monto: 3800 },
    ],
  },
];