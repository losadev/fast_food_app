import {create} from "zustand/react";
import {User} from "@/type";
import {isLoading} from "expo-font";
import {getCurrentUser} from "@/lib/appwrite";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    setIsAuthenticated: (value: boolean) => {set({isAuthenticated: value})},
    setUser: (user) => {set({user: user})},
    setLoading: (value) => {set({isLoading: value})},
    fetchAuthenticatedUser: async () => {
        set({isLoading: false});

        try {
            const user = await getCurrentUser();
            if(user) {
                set({isAuthenticated: true, user: user as unknown as User});
            }
        }catch (e) {
            console.log("fetchAuthenticatedUser error",e);
            set({isAuthenticated: false, user: null});
        }finally {
            set({isLoading: false});
        }
    },
}));

export default useAuthStore;