import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieCard = ({ movie }) => (
  <View style={styles.card}>
    <Image source={{ uri: movie.image?.medium }} style={styles.image} />
    <Text style={styles.title}>{movie.name}</Text>
    <Text style={styles.summary}>{movie.summary}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  summary: {
    padding: 10,
  },
});

export default MovieCard;
