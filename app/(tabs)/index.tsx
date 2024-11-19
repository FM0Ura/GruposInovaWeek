




//  ******LEIA O README DO PROJETO!.**********






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
          source={require('@/assets/images/uvv-logo.png')} // Substitua pelo caminho correto da imagem
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title and subtitle */}
      <Text style={styles.title}>Grupos Inova Week</Text>
      <Text style={styles.subtitle}>
        Confira os grupos que apresentaram no Inova Week 2024 e suas respectivas notas.
      </Text>
      <Text style={styles.subtitle}>
        LEIA O README DO PROJETO!.
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/login')}>
        <Text style={styles.signInText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountButton} onPress={() => router.push('/register')}>
        <Text style={styles.createAccountText}>Resgistrar-se</Text>
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
    width: 200,
    height: 200,
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
    width: '10%',
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
    width: '10%',
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
