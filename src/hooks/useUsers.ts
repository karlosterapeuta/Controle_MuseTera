import { create } from 'zustand';
import { User, PaymentStatus } from '@/types/user';

interface UsersStore {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'status' | 'payments' | 'registeredAt'>) => User;
  getUsers: () => User[];
  updateUserStatus: (userId: string, status: PaymentStatus) => void;
}

export const useUsers = create<UsersStore>((set, get) => ({
  users: [],
  addUser: (userData) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...userData,
      status: 'PENDING',
      payments: [],
      registeredAt: new Date().toISOString(),
    };
    set((state) => ({ users: [...state.users, newUser] }));
    return newUser;
  },
  getUsers: () => get().users,
  updateUserStatus: (userId, status) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status } : user
      ),
    }));
  },
}));
