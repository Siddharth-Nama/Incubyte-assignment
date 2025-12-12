import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import client, { setAuthToken } from '../api/client';

const DashboardScreen = ({ setIsLoggedIn }) => {
    const [sweets, setSweets] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchSweets = async () => {
        try {
            const response = await client.get('/sweets/');
            setSweets(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch sweets');
        }
    };

    const handleSearch = async () => {
        try {
            const params = {};
            if (name) params.name = name;
            if (category) params.category = category;
            if (minPrice) params.min_price = minPrice;
            if (maxPrice) params.max_price = maxPrice;

            const response = await client.get('/sweets/search/', { params });
            setSweets(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Search failed');
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const logout = () => {
        setAuthToken(null);
        setIsLoggedIn(false);
    };

    const handlePurchase = async (id) => {
        try {
            const response = await client.post(`/sweets/${id}/purchase/`);
            Alert.alert('Success', 'Purchase successful!');
            setSweets(prevSweets => prevSweets.map(sweet => 
                sweet.id === id ? { ...sweet, quantity: response.data.quantity } : sweet
            ));
        } catch (error) {
             console.error(error);
             Alert.alert('Error', error.response?.data?.error || 'Purchase failed');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Stock: {item.quantity}</Text>
            <Button title="Purchase" disabled={item.quantity === 0} onPress={() => handlePurchase(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Sweets</Text>
                <Button title="Logout" onPress={logout} color="red" />
            </View>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Name" value={name} onChangeText={setName} />
                <TextInput style={styles.searchInput} placeholder="Category" value={category} onChangeText={setCategory} />
                <View style={styles.priceRow}>
                    <TextInput style={[styles.searchInput, styles.priceInput]} placeholder="Min Price" value={minPrice} onChangeText={setMinPrice} keyboardType="numeric" />
                    <TextInput style={[styles.searchInput, styles.priceInput]} placeholder="Max Price" value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
                </View>
                <Button title="Search" onPress={handleSearch} />
                <Button title="Reset" onPress={() => { setName(''); setCategory(''); setMinPrice(''); setMaxPrice(''); fetchSweets(); }} color="gray" />
            </View>
            <FlatList
                data={sweets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    title: { fontSize: 20, fontWeight: 'bold' },
    searchContainer: { marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
    searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 5, marginBottom: 5, borderRadius: 5, backgroundColor: '#fff' },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between' },
    priceInput: { flex: 0.48 },
    list: { paddingBottom: 20 },
    card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 }
});

export default DashboardScreen;
