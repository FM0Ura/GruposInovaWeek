import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Certifique-se de configurar o Supabase no seu projeto
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; // Ícones da barra de navegação

const HomeScreen = () => {
  const [topGrupos, setTopGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTopGrupos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('avaliacoes')
        .select('grupo_id, nota, grupos(nome, tema, descricao, alunos(nome, curso))')
        .order('nota', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Erro ao buscar grupos:', error);
      } else {
        setTopGrupos(data || []);
      }
      setLoading(false);
    };

    fetchTopGrupos();
  }, []);

  const handleCardPress = (group: any) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const renderGrupo = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Text style={styles.groupName}>{item.grupos.nome}</Text>
      <Text style={styles.groupTheme}>Tema: {item.grupos.tema}</Text>
      <Text style={styles.groupNota}>Nota: {item.nota.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho de boas-vindas */}
      <Text style={styles.header}>Seja bem-vindo!</Text>

      {/* Título de destaques */}
      <Text style={styles.subHeader}>Mais destacados!</Text>

      {/* Lista de Grupos */}
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={topGrupos}
          renderItem={renderGrupo}
          keyExtractor={(item) => item.grupo_id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal para detalhes do grupo */}
      {selectedGroup && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Botão Fechar */}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              {/* Detalhes do Grupo */}
              <Text style={styles.modalHeader}>{selectedGroup.grupos.nome}</Text>
              <Text style={styles.modalTheme}>Tema: {selectedGroup.grupos.tema}</Text>
              <Text style={styles.modalDescription}>{selectedGroup.grupos.descricao}</Text>
              <Text style={styles.modalMembersHeader}>Integrantes:</Text>
              {selectedGroup.grupos.alunos.map((aluno: any, index: number) => (
                <Text key={index} style={styles.modalMember}>
                  {aluno.nome} - {aluno.curso}
                </Text>
              ))}
              <Text style={styles.modalNota}>Nota: {selectedGroup.nota.toFixed(2)}</Text>
            </View>
          </View>
        </Modal>
      )}

      {/* Barra de navegação */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('./main')} style={styles.navItem}>
          <TabBarIcon name="home" color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./all-groups')} style={styles.navItem}>
          <TabBarIcon name="people" color="#fff" />
          <Text style={styles.navText}>Grupos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  groupTheme: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  groupNota: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FF6F61',
    borderRadius: 15,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalTheme: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMembersHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalMember: {
    fontSize: 14,
    color: '#666',
  },
  modalNota: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  },
});

export default HomeScreen;
