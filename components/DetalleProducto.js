import { View, Text, StyleSheet } from 'react-native';

export default function DetalleProducto({ producto, menorPrecio }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezadoProducto}>
        <View>
          <Text style={styles.etiquetaChica}>Comparativa por negocio</Text>
          <Text style={styles.nombreProducto}>{producto.nombre}</Text>
          {producto.detalle ? (
            <Text style={styles.detalleTexto}>{producto.detalle}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.cajaDestacada}>
        <Text style={styles.etiquetaAhorro}>✨ Precio más bajo encontrado</Text>
        <View style={styles.filaDestacada}>
          <Text style={styles.negocioGanador}>{menorPrecio.negocio}</Text>
          <Text style={styles.montoGanador}>
            ${menorPrecio.monto.toLocaleString('es-AR')}
          </Text>
        </View>
      </View>

      <View style={styles.listaPrecios}>
        {producto.precios.map((item) => {
          const esElMenor = item.monto === menorPrecio.monto;
          const diferencia = item.monto - menorPrecio.monto;

          return (
            <View
              key={item.negocio}
              style={[styles.filaPrecio, esElMenor && styles.filaPrecioMenor]}
            >
              <View>
                <Text
                  style={[
                    styles.nombreNegocio,
                    esElMenor && styles.textoDestacadoOscuro,
                  ]}
                >
                  {item.negocio}
                </Text>
                <Text style={styles.subtextoPrecio}>
                  {esElMenor
                    ? 'Mejor opción del barrio'
                    : `+$${diferencia.toLocaleString('es-AR')} respecto al menor`}
                </Text>
              </View>

              <Text
                style={[styles.monto, esElMenor && styles.montoMenorFila]}
              >
                ${item.monto.toLocaleString('es-AR')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F5DCE8',
    gap: 14,
  },
  encabezadoProducto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etiquetaChica: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BE185D',
    marginBottom: 2,
  },
  nombreProducto: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3B1929',
  },
  detalleTexto: {
    fontSize: 13,
    color: '#8A6476',
    marginTop: 2,
  },
  cajaDestacada: {
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FBCFE8',
    padding: 16,
    borderRadius: 16,
    gap: 4,
  },
  etiquetaAhorro: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9D174D',
  },
  filaDestacada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 2,
  },
  negocioGanador: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3B1929',
  },
  montoGanador: {
    fontSize: 24,
    fontWeight: '700',
    color: '#BE185D',
  },
  listaPrecios: {
    gap: 8,
  },
  filaPrecio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FCF9FB',
  },
  filaPrecioMenor: {
    backgroundColor: '#FFF5F9',
    borderWidth: 1,
    borderColor: '#F9A8D4',
  },
  nombreNegocio: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A2536',
  },
  textoDestacadoOscuro: {
    color: '#831843',
  },
  subtextoPrecio: {
    fontSize: 12,
    color: '#8A6476',
    marginTop: 2,
  },
  monto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B1929',
  },
  montoMenorFila: {
    color: '#BE185D',
  },
});