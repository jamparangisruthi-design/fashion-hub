import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types';
import { StorageService } from '../services/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  register: (name: string, email: string, phone?: string) => boolean;
  logout: () => void;
  loginAsDemoCustomer: () => void;
  loginAsDemoAdmin: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => StorageService.getCurrentUser());

  useEffect(() => {
    StorageService.setCurrentUser(user);
  }, [user]);

  const login = (email: string, role: 'customer' | 'admin' = 'customer'): boolean => {
    if (role === 'admin' || email.toLowerCase().includes('admin')) {
      const admin = StorageService.getAdminUser();
      setUser(admin);
      return true;
    }
    const customer = StorageService.getDefaultCustomer();
    setUser({ ...customer, email });
    return true;
  };

  const register = (name: string, email: string, phone?: string): boolean => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      addresses: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const loginAsDemoCustomer = () => {
    setUser(StorageService.getDefaultCustomer());
  };

  const loginAsDemoAdmin = () => {
    setUser(StorageService.getAdminUser());
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 || !!addr.isDefault
    };

    let addresses = user.addresses;
    if (newAddr.isDefault) {
      addresses = addresses.map(a => ({ ...a, isDefault: false }));
    }
    addresses = [...addresses, newAddr];
    setUser({ ...user, addresses });
  };

  const updateAddress = (address: Address) => {
    if (!user) return;
    let addresses = user.addresses.map(a => (a.id === address.id ? address : a));
    if (address.isDefault) {
      addresses = addresses.map(a => ({ ...a, isDefault: a.id === address.id }));
    }
    setUser({ ...user, addresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const addresses = user.addresses.filter(a => a.id !== id);
    if (addresses.length > 0 && !addresses.some(a => a.isDefault)) {
      addresses[0].isDefault = true;
    }
    setUser({ ...user, addresses });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const addresses = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setUser({ ...user, addresses });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        loginAsDemoCustomer,
        loginAsDemoAdmin,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
