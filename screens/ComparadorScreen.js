import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import { useComparador } from '../hooks/useComparador';
import DetalleProducto from '../components/DetalleProducto';
import CompraCompleta from '../components/CompraCompleta';

export default function ComparadorScreen() {
  const [seccionActiva, setSeccionActiva] = useState('precios');

  const {
    negocios,
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
  } = useComparador();

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.contenedorApp}>
        {/* Encabezado principal */}
        <View style={styles.cabecera}>
          <Text style={styles.subtituloMarca}>Compras inteligentes</Text>
          <Text style={styles.tituloPrincipal}>Precios de mi Barrio</Text>
          <Text style={styles.bajada}>
            Compará tus productos favoritos y elegí dónde ahorrar cada día.
          </Text>
        </View>

        {/* Pestañas para que quede todo prolijo y organizado */}
        <View style={styles.barraPestanas}>
          <TouchableOpacity
            onPress={() => setSeccionActiva('precios')}
            style={[
              styles.botonPestana,
              seccionActiva === 'precios' && styles.botonPestanaActivo,
            ]}
          >
            <Text
              style={[
                styles.textoPestana,
                seccionActiva === 'precios' && styles.textoPestanaActivo,
              ]}
            >
              Productos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSeccionActiva('compra')}
            style={[
              styles.botonPestana,
              seccionActiva === 'compra' && styles.botonPestanaActivo,
            ]}
          >
            <Text
              style={[
                styles.textoPestana,
                seccionActiva === 'compra' && styles.textoPestanaActivo,
              ]}
            >
              Mi compra ({compraIds.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSeccionActiva('negocios')}
            style={[
              styles.botonPestana,
              seccionActiva === 'negocios' && styles.botonPestanaActivo,
            ]}
          >
            <Text
              style={[
                styles.textoPestana,
                seccionActiva === 'negocios' && styles.textoPestanaActivo,
              ]}
            >
              Negocios
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECCIÓN 1: PRODUCTOS Y COMPARACIÓN */}
        {seccionActiva === 'precios' && (
          <View style={styles.bloqueSeccion}>
            <View style={styles.tarjeta}>
              <Text style={styles.subtitulo}>Buscar un producto</Text>
              <TextInput
                style={styles.input}
                placeholder="Escribí para buscar (ej: Yerba, Leche)..."
                placeholderTextColor="#B08D9E"
                value={busqueda}
                onChangeText={setBusqueda}
              />

              {productosFiltrados.length === 0 ? (
                <View style={styles.vacioContenedor}>
                  <Text style={styles.vacioTexto}>
                    No encontramos ese producto en la lista.
                  </Text>
                  <Button
                    title="Mostrar todos"
                    color="#BE185D"
                    onPress={() => setBusqueda('')}
                  />
                </View>
              ) : (
                <View style={styles.grillaSeleccion}>
                  {productosFiltrados.map((prod) => {
                    const seleccionado = prod.id === productoActual.id;
                    return (
                      <TouchableOpacity
                        key={prod.id}
                        onPress={() => setProductoSeleccionadoId(prod.id)}
                        style={[
                          styles.pastillaProducto,
                          seleccionado && styles.pastillaSeleccionada,
                        ]}
                      >
                        <Text
                          style={[
                            styles.textoPastilla,
                            seleccionado && styles.textoPastillaSeleccionada,
                          ]}
                        >
                          {prod.nombre}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            <DetalleProducto
              producto={productoActual}
              menorPrecio={menorPrecioActual}
            />
          </View>
        )}

        {/* SECCIÓN 2: COMPRA COMPLETA */}
        {seccionActiva === 'compra' && (
          <CompraCompleta
            productos={productos}
            compraIds={compraIds}
            onAlternarProducto={alternarProductoEnCompra}
            totalesPorNegocio={totalesCompraPorNegocio}
            mejorNegocio={mejorNegocioCompra}
          />
        )}

        {/* SECCIÓN 3: NEGOCIOS Y AGREGAR PRODUCTO */}
        {seccionActiva === 'negocios' && (
          <View style={styles.bloqueSeccion}>
            <View style={styles.tarjeta}>
              <Text style={styles.subtitulo}>Comercios del barrio</Text>
              {negocios.map((neg) => (
                <View key={neg.id} style={styles.itemNegocio}>
                  <Text style={styles.nombreNegocio}>{neg.nombre}</Text>
                  <Text style={styles.infoNegocio}>{neg.direccion}</Text>
                  {neg.horario ? (
                    <Text style={styles.horarioNegocio}>{neg.horario}</Text>
                  ) : null}
                </View>
              ))}
            </View>

            <View style={styles.tarjeta}>
              <Text style={styles.subtitulo}>Sumar un producto nuevo</Text>
              <Text style={styles.ayuda}>
                Cargá los precios que viste hoy en cada negocio:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nombre del producto (ej: Galletitas)"
                placeholderTextColor="#B08D9E"
                value={nuevoNombre}
                onChangeText={setNuevoNombre}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio en Despensa María ($)"
                placeholderTextColor="#B08D9E"
                keyboardType="numeric"
                value={precioMaria}
                onChangeText={setPrecioMaria}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio en Supermercado Norte ($)"
                placeholderTextColor="#B08D9E"
                keyboardType="numeric"
                value={precioNorte}
                onChangeText={setPrecioNorte}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio en Almacén Don José ($)"
                placeholderTextColor="#B08D9E"
                keyboardType="numeric"
                value={precioJose}
                onChangeText={setPrecioJose}
              />

              {mensajeError !== '' && (
                <Text style={styles.error}>{mensajeError}</Text>
              )}
              {mensajeExito !== '' && (
                <Text style={styles.exito}>{mensajeExito}</Text>
              )}

              <TouchableOpacity
                style={styles.botonPrincipal}
                onPress={agregarProducto}
              >
                <Text style={styles.textoBotonPrincipal}>
                  Guardar producto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FDF6F9',
  },
  contenedorApp: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    gap: 16,
  },
  cabecera: {
    backgroundColor: '#831843',
    padding: 22,
    borderRadius: 24,
    gap: 4,
  },
  subtituloMarca: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FBCFE8',
  },
  tituloPrincipal: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bajada: {
    fontSize: 13,
    color: '#FCE7F3',
    marginTop: 2,
    lineHeight: 18,
  },
  barraPestanas: {
    flexDirection: 'row',
    backgroundColor: '#F8E5EE',
    padding: 5,
    borderRadius: 18,
    gap: 4,
  },
  botonPestana: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  botonPestanaActivo: {
    backgroundColor: '#FFFFFF',
  },
  textoPestana: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D4E63',
  },
  textoPestanaActivo: {
    color: '#BE185D',
    fontWeight: '700',
  },
  bloqueSeccion: {
    gap: 16,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F5DCE8',
    gap: 12,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B1929',
  },
  ayuda: {
    fontSize: 13,
    color: '#7D5A6B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBCAD9',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    backgroundColor: '#FFFBFD',
    color: '#3B1929',
  },
  grillaSeleccion: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  pastillaProducto: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 14,
    backgroundColor: '#FAF0F5',
    borderWidth: 1,
    borderColor: '#F3D6E4',
  },
  pastillaSeleccionada: {
    backgroundColor: '#BE185D',
    borderColor: '#BE185D',
  },
  textoPastilla: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B3850',
  },
  textoPastillaSeleccionada: {
    color: '#FFFFFF',
  },
  vacioContenedor: {
    gap: 10,
    paddingVertical: 8,
  },
  vacioTexto: {
    fontSize: 14,
    color: '#7D5A6B',
    textAlign: 'center',
  },
  itemNegocio: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FCF9FB',
    borderWidth: 1,
    borderColor: '#F6E4ED',
    gap: 2,
  },
  nombreNegocio: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B1929',
  },
  infoNegocio: {
    fontSize: 13,
    color: '#6B495A',
  },
  horarioNegocio: {
    fontSize: 12,
    color: '#9D174D',
    marginTop: 2,
  },
  botonPrincipal: {
    backgroundColor: '#BE185D',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  error: {
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '600',
  },
  exito: {
    fontSize: 13,
    color: '#9D174D',
    fontWeight: '600',
  },
});