import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const FavoriteList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FavoriteItem = styled.li`
  background: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const FavoriteHeader = styled.div`
  margin-bottom: 10px;
`;

const FavoriteDetails = styled.div`
  margin-bottom: 10px;
`;

const FavoriteLink = styled.a`
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('An error occurred while fetching favorites.');
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container>
      <h2>Favorites</h2>
      {error && <Error>{error}</Error>}
      <FavoriteList>
        {favorites.map((favorite) => (
          <FavoriteItem key={favorite.id}>
            <FavoriteHeader>
              <div>
                <strong>Fact:</strong> {favorite.value}
              </div>
            </FavoriteHeader>
            <FavoriteDetails>
              <div>
                <strong>Created at:</strong> {favorite.created_at}
              </div>
              {favorite.categories && favorite.categories.length > 0 && (
                <div>
                  <strong>Categories:</strong> {favorite.categories.join(', ')}
                </div>
              )}
              <FavoriteLink href={favorite.url} target="_blank" rel="noopener noreferrer">
                View Fact
              </FavoriteLink>
            </FavoriteDetails>
          </FavoriteItem>
        ))}
      </FavoriteList>
    </Container>
  );
};

export default Favoritos;

