import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Placeholder for the illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/react-logo.png')} // Substitua pelo caminho correto da imagem
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title and subtitle */}
      <Text style={styles.title}>Explore the app</Text>
      <Text style={styles.subtitle}>
        Now your finances are in one place and always under control
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/login')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 30,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
