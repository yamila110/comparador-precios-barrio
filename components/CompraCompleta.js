import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CompraCompleta({
  productos,
  compraIds,
  onAlternarProducto,
  totalesPorNegocio,
  mejorNegocio,
}) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.subtitulo}>Armar mi lista de compra</Text>
      <Text style={styles.ayuda}>
        Tocá los productos que quieras llevar para comparar cuánto gastarías en total en cada negocio:
      </Text>

      <View style={styles.grillaProductos}>
        {productos.map((prod) => {
          const estaEnCompra = compraIds.includes(prod.id);
          return (
            <TouchableOpacity
              key={prod.id}
              onPress={() => onAlternarProducto(prod.id)}
              style={[
                styles.chipProducto,
                estaEnCompra && styles.chipProductoActivo,
              ]}
            >
              <Text
                style={[
                  styles.textoChip,
                  estaEnCompra && styles.textoChipActivo,
                ]}
              >
                {estaEnCompra ? '♥ ' : '+ '}
                {prod.nombre}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {compraIds.length === 0 ? (
        <View style={styles.cajaVacia}>
          <Text style={styles.ayuda}>
            Elegí al menos un producto arriba para calcular tu compra.
          </Text>
        </View>
      ) : (
        <View style={styles.bloqueTotales}>
          {mejorNegocio && (
            <View style={styles.bannerConviene}>
              <Text style={styles.etiquetaConviene}>
                ✨ Donde más te conviene comprar todo:
              </Text>
              <Text style={styles.nombreConviene}>{mejorNegocio.negocio}</Text>
              <Text style={styles.montoConviene}>
                Total: ${mejorNegocio.monto.toLocaleString('es-AR')}
              </Text>
            </View>
          )}

          <Text style={styles.tituloTotales}>Total de la lista por comercio:</Text>

          {totalesPorNegocio.map((item) => {
            const esMejor =
              mejorNegocio && item.monto === mejorNegocio.monto;
            return (
              <View
                key={item.negocio}
                style={[styles.filaTotal, esMejor && styles.filaTotalMejor]}
              >
                <Text style={styles.nombreComercio}>{item.negocio}</Text>
                <Text
                  style={[styles.montoTotal, esMejor && styles.montoTotalMejor]}
                >
                  ${item.monto.toLocaleString('es-AR')}
                </Text>
              </View>
            );
          })}
        </View>
      )}
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
    gap: 12,
  },
  subtitulo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#3B1929',
  },
  ayuda: {
    fontSize: 13,
    color: '#7D5A6B',
    lineHeight: 18,
  },
  grillaProductos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 4,
  },
  chipProducto: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FAF0F5',
    borderWidth: 1,
    borderColor: '#F3D6E4',
  },
  chipProductoActivo: {
    backgroundColor: '#BE185D',
    borderColor: '#BE185D',
  },
  textoChip: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B3850',
  },
  textoChipActivo: {
    color: '#FFFFFF',
  },
  cajaVacia: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  bloqueTotales: {
    marginTop: 6,
    gap: 8,
  },
  bannerConviene: {
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FBCFE8',
    borderRadius: 16,
    padding: 16,
    gap: 2,
    marginBottom: 4,
  },
  etiquetaConviene: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9D174D',
  },
  nombreConviene: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B1929',
    marginTop: 2,
  },
  montoConviene: {
    fontSize: 20,
    fontWeight: '700',
    color: '#BE185D',
  },
  tituloTotales: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D5A6B',
    marginTop: 4,
  },
  filaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FCF9FB',
  },
  filaTotalMejor: {
    backgroundColor: '#FFF5F9',
    borderWidth: 1,
    borderColor: '#F9A8D4',
  },
  nombreComercio: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3B1929',
  },
  montoTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B1929',
  },
  montoTotalMejor: {
    color: '#BE185D',
  },
});