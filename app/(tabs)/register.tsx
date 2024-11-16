// COMPLETA

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Certifique-se de configurar o Supabase no seu projeto

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string): string => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinimumLength = password.length >= 8;
  
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasMinimumLength) {
      return 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.';
    }
  
    return ''; // Retorna vazio se não houver erro
  };

  const handleSignUp = async () => {
    setErrorMessage('');

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      setErrorMessage(passwordValidationMessage);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    setLoading(true);

    // Inserindo na tabela 'usuario'
    const { data, error } = await supabase
      .from('usuario') // Nome da tabela no banco de dados
      .insert([{ email, senha: password }])
      .select();

    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao registrar. Tente novamente.');
    } else {
      setErrorMessage(''); // Limpa mensagem de erro em caso de sucesso
      router.push('/login'); // Redireciona para a tela de login após o registro
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
      <Text style={styles.title}>Sign up</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="must be 8 characters"
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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="repeat password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={require('@/assets/images/eye.svg')} // Substitua pelo caminho correto do ícone de olho
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'Loading...' : 'Registrar'}</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Redirect to Log in */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.footerLink}
          onPress={() => router.push('/login')} // Redireciona para a rota /login
        >
          Log in
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
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
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
  passwordInput: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#aaa',
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

export default SignUpScreen;