import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  fetchMe: async () => {
    set({ isLoading: true });
    // MOCKED FOR DEMO: Automatically "log in" a fake user instead of hitting the backend
    setTimeout(() => {
      set({ 
        user: { id: 'demo-user', name: 'Demo User', email: 'demo@agenthire.com', role: 'client' }, 
        isLoading: false 
      });
    }, 500);
  },

  logout: async () => {
    set({ user: null });
  },
}));

export default useAuthStore;
