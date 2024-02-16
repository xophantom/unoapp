/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useUsers } from '../../contexts/useUsers';
import { Container } from './styles';

const HomeScreen: React.FC = () => {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </Container>
  );
};

export default HomeScreen;
