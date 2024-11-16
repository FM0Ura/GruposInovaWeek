import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Certifique-se de configurar o Supabase no seu projeto

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Autenticação com Supabase
    const { data, error } = await supabase
      .from('usuario') // Nome da tabela no banco de dados
      .select('*')
      .eq('email', email)
      .eq('senha', password);

    setLoading(false);

    if (error) {
      setErrorMessage('Erro no servidor. Tente novamente.');
    } else if (!data || data.length === 0) {
      setErrorMessage('E-mail ou senha incorretos. Por favor, confira e tente novamente.');
    } else {
      setErrorMessage(''); // Limpa mensagem de erro em caso de sucesso
      router.push('./main/main'); // Redireciona para a tela principal
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/react-logo.png')} // Substitua pelo caminho correto do ícone
          style={styles.icon}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Log in</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {email.includes('@') && (
          <Image
            source={require('@/assets/images/check.svg')} // Substitua pelo caminho correto do ícone de check
            style={styles.checkIcon}
          />
        )}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={require('@/assets/images/eye.svg')} // Substitua pelo caminho correto do ícone de olho
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => router.push('/reset-password')}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Log in Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'Loading...' : 'Log in'}</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Redirect to Sign up */}
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.footerLink} onPress={() => router.push('/register')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: 'green',
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#aaa',
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  footerText: {
    color: '#000',
    marginTop: 20,
  },
  footerLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
