import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Page1 from './pages/page1';

export default function App() {
  return (
    <View style={styles.container}>
      <Page1 />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
