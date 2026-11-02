import { useState, useEffect } from 'react';
import { NEGOCIOS_BARRIO, PRODUCTOS_INICIALES } from '../services/datosBarrio';

export function useComparador() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState('1');
  const [compraIds, setCompraIds] = useState(['1', '2', '3', '4']);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [precioMaria, setPrecioMaria] = useState('');
  const [precioNorte, setPrecioNorte] = useState('');
  const [precioJose, setPrecioJose] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    console.log('Producto consultado:', productoSeleccionadoId);
  }, [productoSeleccionadoId]);

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const productoActual =
    productos.find((prod) => prod.id === productoSeleccionadoId) || productos[0];

  const obtenerMenorPrecio = (listaPrecios) => {
    return listaPrecios.reduce((menor, actual) => {
      if (actual.monto < menor.monto) {
        return actual;
      } else {
        return menor;
      }
    }, listaPrecios[0]);
  };

  const menorPrecioActual = obtenerMenorPrecio(productoActual.precios);

  const alternarProductoEnCompra = (id) => {
    if (compraIds.includes(id)) {
      setCompraIds(compraIds.filter((item) => item !== id));
    } else {
      setCompraIds([...compraIds, id]);
    }
  };

  const totalesCompraPorNegocio = NEGOCIOS_BARRIO.map((negocioObj) => {
    const productosElegidos = productos.filter((p) => compraIds.includes(p.id));

    const costoTotal = productosElegidos.reduce((acumulador, prod) => {
      const datoPrecio = prod.precios.find(
        (pr) => pr.negocio === negocioObj.nombre
      );
      return acumulador + (datoPrecio ? datoPrecio.monto : 0);
    }, 0);

    return {
      negocio: negocioObj.nombre,
      monto: costoTotal,
    };
  });

  const mejorNegocioCompra =
    compraIds.length > 0 ? obtenerMenorPrecio(totalesCompraPorNegocio) : null;

  const agregarProducto = () => {
    const p1 = Number(precioMaria);
    const p2 = Number(precioNorte);
    const p3 = Number(precioJose);

    if (
      nuevoNombre.trim() === '' ||
      p1 <= 0 ||
      p2 <= 0 ||
      p3 <= 0 ||
      isNaN(p1) ||
      isNaN(p2) ||
      isNaN(p3)
    ) {
      setMensajeError('Completá el nombre y los tres precios mayores a $0.');
      setMensajeExito('');
      return;
    }

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre: nuevoNombre.trim(),
      detalle: 'Agregado recientemente',
      precios: [
        { negocio: 'Despensa María', monto: p1 },
        { negocio: 'Supermercado Norte', monto: p2 },
        { negocio: 'Almacén Don José', monto: p3 },
      ],
    };

    setProductos([nuevoProducto, ...productos]);
    setProductoSeleccionadoId(nuevoProducto.id);
    setNuevoNombre('');
    setPrecioMaria('');
    setPrecioNorte('');
    setPrecioJose('');
    setMensajeError('');
    setMensajeExito('¡Producto guardado en tu lista!');
  };

  return {
    negocios: NEGOCIOS_BARRIO,
    productos,
    productosFiltrados,
    busqueda,
    setBusqueda,
    productoActual,
    setProductoSeleccionadoId,
    menorPrecioActual,
    compraIds,
    alternarProductoEnCompra,
    totalesCompraPorNegocio,
    mejorNegocioCompra,
    nuevoNombre,
    setNuevoNombre,
    precioMaria,
    setPrecioMaria,
    precioNorte,
    setPrecioNorte,
    precioJose,
    setPrecioJose,
    mensajeError,
    mensajeExito,
    agregarProducto,
  };
}