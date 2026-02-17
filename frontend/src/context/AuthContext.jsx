import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
            axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const { data } = await axios.post('/api/auth/register', { name, email, password, role });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
