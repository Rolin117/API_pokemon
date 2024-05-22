import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const NasaApod = () => {
    const [apodData, setApodData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApod = async () => {
            try {
                const apiKey = 'mmxmI7naNbqckIo1if138bnGmvi8NfR3RQyXkJvk';
                const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
                setApodData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchApod();
    }, []);

    return (
        <View style={styles.container}>
            {error ? (
                <Text style={styles.error}>Error al cargar la imagen: {error}</Text>
            ) : (
                apodData && (
                    <View style={styles.card}>
                        <Image source={{ uri: apodData.url }} style={styles.image} />
                        <View style={styles.cardBody}>
                            <Text style={styles.title}>{apodData.title}</Text>
                            <Text style={styles.text}>{apodData.explanation}</Text>
                            <Text style={styles.date}>Fecha: {apodData.date}</Text>
                        </View>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardBody: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
    },
    date: {
        marginTop: 10,
        fontSize: 14,
        color: '#888',
    },
    error: {
        color: 'red',
    },
});

export default NasaApod;
