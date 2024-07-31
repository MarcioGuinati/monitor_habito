import { Image, StyleSheet, Platform, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style = { styles.box }>
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 1: Try it</Text>
        <Text>
          Edit <Text style={styles.defaultSemiBold}>app/(tabs)/index.tsx</Text> to see changes.
          Press{' '}
          <Text style={styles.defaultSemiBold}>
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 2: Explore</Text>
        <Text>
          Tap the Explore tab to learn more about what's included in this starter app.
        </Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 3: Get a fresh start</Text>
        <Text>
          When you're ready, run{' '}
          <Text style={styles.defaultSemiBold}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={styles.defaultSemiBold}>app</Text> directory. This will move the current{' '}
          <Text style={styles.defaultSemiBold}>app</Text> to{' '}
          <Text style={styles.defaultSemiBold}>app-example</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: 315,
  }, //ABAIXO, TEXTOS
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
