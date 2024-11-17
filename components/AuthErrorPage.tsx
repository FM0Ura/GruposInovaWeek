import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const AuthErrorPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso Negado</Text>
      <Text style={styles.message}>
        Você tentou acessar uma página protegida, mas não está autenticado.
      </Text>
      <Text style={styles.message}>
        Por favor, faça login para continuar.
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>Ir para a página de Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF6F61',
    padding: 15,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthErrorPage;
