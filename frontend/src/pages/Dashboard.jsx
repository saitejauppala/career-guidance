import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const socket = useSocket();
    const [placements, setPlacements] = useState([]);
    const [pathways, setPathways] = useState([]);

    // Admin states
    const [newPlacement, setNewPlacement] = useState({ companyName: '', role: '' });

    useEffect(() => {
        fetchPlacements();
        fetchPathways();

        if (socket) {
            socket.on('newPlacement', (data) => {
                // Real-time update logic would go here
                // For now, simpler to just refetch or append
                setPlacements((prev) => [data, ...prev]);
                alert(`New Placement: ${data.companyName}`);
            });
        }

        return () => {
            if (socket) socket.off('newPlacement');
        };
    }, [socket]);

    const fetchPlacements = async () => {
        try {
            const { data } = await axios.get('/api/placements');
            setPlacements(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPathways = async () => {
        try {
            const { data } = await axios.get('/api/pathways');
            setPathways(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddPlacement = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/placements', newPlacement);
            setNewPlacement({ companyName: '', role: '' });
            fetchPlacements(); // Refresh list
        } catch (error) {
            alert('Error adding placement');
        }
    };

    return (
        <div className="container">
            <h1>Welcome, {user.name}</h1>
            <p>Role: {user.role}</p>

            {user.role === 'admin' && (
                <div className="card">
                    <h3>Add Placement</h3>
                    <form onSubmit={handleAddPlacement}>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={newPlacement.companyName}
                            onChange={(e) => setNewPlacement({ ...newPlacement, companyName: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={newPlacement.role}
                            onChange={(e) => setNewPlacement({ ...newPlacement, role: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Add</button>
                    </form>
                </div>
            )}

            <div className="dashboard-grid">
                <div className="section">
                    <h2>Active Placements</h2>
                    {placements.map((p) => (
                        <div key={p._id} className="card" style={{ marginBottom: '10px' }}>
                            <h4>{p.companyName}</h4>
                            <p>{p.role}</p>
                            <span className={`status ${p.status}`}>{p.status}</span>
                        </div>
                    ))}
                </div>

                <div className="section">
                    <h2>Career Pathways</h2>
                    {pathways.map((path) => (
                        <div key={path._id} className="card" style={{ marginBottom: '10px' }}>
                            <h4>{path.title}</h4>
                            <p>{path.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
