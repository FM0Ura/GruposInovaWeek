




//  ******LEIA O README DO PROJETO!.**********







import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Certifique-se de configurar o Supabase no seu projeto

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Armazena mensagens de erro
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

    return '';
  };

  const handleResetPassword = async () => {
    setErrorMessage('');

    if (!email || !newPassword || !confirmPassword) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    const passwordValidationMessage = validatePassword(newPassword);
    if (passwordValidationMessage) {
      setErrorMessage(passwordValidationMessage);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    setLoading(true);

    // Verificando e atualizando a senha do usuário no Supabase
    const { data, error } = await supabase
      .from('usuario') // Certifique-se de que esta é a tabela correta
      .update({ senha: newPassword }) // Atualizando a senha
      .eq('email', email); // Onde o email corresponde

    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao resetar a senha. Por favor, tente novamente.');
    } else if (data) {
      setErrorMessage('Usuário não encontrado com o email informado.');
    } else {
      Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso!');
      router.push('/login'); // Redireciona para a tela de login
    }
  };

  return (
    <View style={styles.container}>

      {/* Title and Description */}
      <Text style={styles.title}>Alterar Senhas</Text>
      <Text style={styles.description}>Escreva algo que você irá se lembrar</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email cadastrado"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Sua nova senha"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
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
          placeholder="Confirme seua nova senha"
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

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={loading}>
        <Text style={styles.resetButtonText}>{loading ? 'Loading...' : 'Alterar senha'}</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

            {/* Redirect to Log in */}
            <Text style={styles.footerText}>
        Lembrou sua senha? Ótimo! Então faça{' '}
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
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
  resetButton: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  resetButtonText: {
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

export default ResetPasswordScreen;
