import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: antiquewhite;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 60px;
  height: 90px;
  margin-right: 20px;
`;

const Name = styled.div`
  font-size: 24px;
  margin-right: 20px;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #666;
  }
`;
const Shows = () => {

     const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setShows(data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Shows</Title>
      <List>
        {shows.map((show) => (
          <Item key={show.show.id} whileHover={{ scale: 1.05 }}>
            <Image src={show.show.image?.medium} alt={show.show.name} />
            <Name>{show.show.name}</Name>
            <Button to={`/show/${show.show.id}`}>Summary</Button>
          </Item>
        ))}
      </List>
    </Container>
  )
}

export default Shows;
