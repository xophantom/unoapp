/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  users: User[];
  fetchUsers: () => void;
}

// Context
export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export const UserProvider: React.FC = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('/users/get-user');
      setUsers(response.data);
      // console.log('response:', response);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook
export function useUsers(): UserContextType {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUsers must be used within a UserProvider');

  return context;
}
