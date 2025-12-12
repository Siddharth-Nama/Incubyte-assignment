import React, { useEffect, useState } from 'react';
import client, { setAuthToken } from '../api/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsLoggedIn }) => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useState({ name: '', category: '', min_price: '', max_price: '' });
    const navigate = useNavigate();

    const fetchSweets = async (params = {}) => {
        setLoading(true);
        try {
            const response = await client.get('/sweets/search/', { params });
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
        fetchSweets(); // Initial load
    }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchSweets(searchParams);
    };

    const handleReset = () => {
        setSearchParams({ name: '', category: '', min_price: '', max_price: '' });
        fetchSweets();
    };

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

            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input type="text" name="name" placeholder="Name" value={searchParams.name} onChange={handleSearchChange} />
                <input type="text" name="category" placeholder="Category" value={searchParams.category} onChange={handleSearchChange} />
                <input type="number" name="min_price" placeholder="Min Price" value={searchParams.min_price} onChange={handleSearchChange} />
                <input type="number" name="max_price" placeholder="Max Price" value={searchParams.max_price} onChange={handleSearchChange} />
                <button type="submit">Search</button>
                <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
            </form>

            {error && <p className="error">{error}</p>}
            {loading ? <p>Loading...</p> : (
                <div className="sweets-grid">
                    {sweets.length === 0 ? <p>No sweets found.</p> : sweets.map(sweet => (
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
