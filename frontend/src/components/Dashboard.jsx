import React, { useEffect, useState } from 'react';
import client, { setAuthToken } from '../api/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsLoggedIn }) => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchSweets = async (params = {}) => {
        setLoading(true);
        try {
            const response = await client.get('/sweets/', { params });
            setSweets(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to fetch sweets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const handleLogout = () => {
        setAuthToken(null);
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handlePurchase = async (id) => {
        try {
            const response = await client.post(`/sweets/${id}/purchase/`);
            alert(`Purchased! New quantity: ${response.data.quantity}`);
            setSweets(prevSweets => prevSweets.map(sweet => 
                sweet.id === id ? { ...sweet, quantity: response.data.quantity } : sweet
            ));
        } catch (err) {
            alert(err.response?.data?.error || 'Purchase failed');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Available Sweets</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            {error && <p className="error">{error}</p>}
            {loading ? <p>Loading...</p> : (
                <div className="sweets-grid">
                    {sweets.map(sweet => (
                        <div key={sweet.id} className="sweet-card">
                            <h3>{sweet.name}</h3>
                            <p className="category">{sweet.category}</p>
                            <p className="price">${sweet.price}</p>
                            <p className="stock">Stock: {sweet.quantity}</p>
                            <button 
                                onClick={() => handlePurchase(sweet.id)} 
                                disabled={sweet.quantity === 0}
                                className="purchase-btn"
                            >
                                {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
