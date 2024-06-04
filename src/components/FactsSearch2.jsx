import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  flex-grow: 1;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const FactList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FactItem = styled.li`
  background: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const FactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FactDetails = styled.div`
  margin-bottom: 10px;
`;

const FactLink = styled.a`
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LikeButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

const FactsSearch2 = () => {
  const [query, setQuery] = useState('');
  const [facts, setFacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
      setFacts(response.data.result);
      setTotal(response.data.total);
      setError('');
    } catch (error) {
      console.error('Ocurrió un error:', error);
      setError('Ocurrió un error al intentar obtener datos.');
    }
  };

  const handleLike = async (fact) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', fact);
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error('Error agregando a favoritos:', error);
      alert('Ocurrió un error al intentar agregar un fact.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter your search query..."
        />
        <Button type="submit">Search</Button>
      </Form>
      {error && <Error>{error}</Error>}
      {total > 0 && (
        <div>
          <h2>Total Facts: {total}</h2>
          <FactList>
            {facts.map((fact) => (
              <FactItem key={fact.id}>
                <FactHeader>
                  <div>
                    <strong>Fact:</strong> {fact.value}
                  </div>
                  <LikeButton onClick={() => handleLike(fact)}>Like</LikeButton>
                </FactHeader>
                <FactDetails>
                  <div>
                    <strong>Created at:</strong> {new Date(fact.created_at).toLocaleDateString()}
                  </div>
                  {fact.categories.length > 0 && (
                    <div>
                      <strong>Categories:</strong> {fact.categories.join(', ')}
                    </div>
                  )}
                  <FactLink href={fact.url} target="_blank" rel="noopener noreferrer">
                    View Fact
                  </FactLink>
                </FactDetails>
              </FactItem>
            ))}
          </FactList>
        </div>
      )}
    </Container>
  );
};

export default FactsSearch2;


