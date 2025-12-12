import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import client, { setAuthToken } from '../api/client';

const DashboardScreen = ({ setIsLoggedIn }) => {
    const [sweets, setSweets] = useState([]);

    const fetchSweets = async () => {
        try {
            const response = await client.get('/sweets/');
            setSweets(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch sweets');
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const logout = () => {
        setAuthToken(null);
        setIsLoggedIn(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Stock: {item.quantity}</Text>
            <Button title="Purchase" disabled={item.quantity === 0} onPress={() => {}} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Sweets</Text>
                <Button title="Logout" onPress={logout} color="red" />
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
    list: { paddingBottom: 20 },
    card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 }
});

export default DashboardScreen;
