import { SafeAreaView, StyleSheet } from 'react-native';
import ComparadorScreen from './screens/ComparadorScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <ComparadorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#FDF6F9',
  },
});