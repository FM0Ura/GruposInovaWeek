import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // Certifique-se de configurar o Supabase no seu projeto
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const AllGroupsScreen = () => {
  const [grupos, setGrupos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null); // Estado para armazenar o grupo selecionado
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // Roteador para navegação

  const LIMIT = 10; // Quantidade de grupos por página

  const fetchGroups = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('avaliacoes')
      .select('grupo_id, nota, grupos(nome, tema, descricao, alunos(nome, curso))')
      .order('nota', { ascending: false })
      .range(offset, offset + LIMIT - 1);

    if (error) {
      console.error('Erro ao buscar grupos:', error);
    } else {
      setGrupos((prevGrupos) => [...prevGrupos, ...(data || [])]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
  };

  const openGroupDetails = (group: any) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const renderGrupo = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => openGroupDetails(item)} style={styles.card}>
      <Text style={styles.groupName}>{item.grupos.nome}</Text>
      <Text style={styles.groupTheme}>Tema: {item.grupos.tema}</Text>
      <Text style={styles.groupNota}>Nota: {item.nota.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('./main')}>
        <Text style={styles.backButtonText}>{"<"} Destaques</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Todos os Grupos</Text>

      {/* Lista de Grupos */}
      <FlatList
        data={grupos}
        renderItem={renderGrupo}
        keyExtractor={(item) => item.grupo_id.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          !loading && (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
              <Text style={styles.loadMoreText}>Carregar mais</Text>
            </TouchableOpacity>
          )
        }
      />

      {loading && <Text style={styles.loadingText}>Carregando...</Text>}

      {/* Modal de Detalhes */}
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
  {/* Botão para a página principal */}
  <TouchableOpacity onPress={() => router.push('./main')} style={styles.navItem}>
    <TabBarIcon name="home" color="#fff" />
    <Text style={styles.navText}>Home</Text>
  </TouchableOpacity>

  {/* Botão para a página de todos os grupos */}
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
    color: '#333',
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
  loadMoreButton: {
    paddingVertical: 15,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
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
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6F61',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    alignItems: 'center', // Centraliza o ícone e o texto
  },
  navText: {
    marginTop: 4, // Espaçamento entre o ícone e o texto
    fontSize: 12, // Tamanho do texto
    color: '#fff', // Cor do texto
  },
  
});

export default AllGroupsScreen;
