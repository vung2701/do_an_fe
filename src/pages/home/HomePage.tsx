import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSpotlight } from '../../services';
import Blogs from './blogs/Blogs';
import styles from './homePage.module.css';
import { TypeSpotlight } from '../../types';

export default function HomePage() {
  const [spotlight, setSpotlight] = useState<TypeSpotlight[]>([]);

  const fetchSpotlight = async () => {
    try {
      const spotlight = await getSpotlight();
      setSpotlight(spotlight);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSpotlight();
  }, []);

  return (
    <>
      <Container className="container">
        <Box className={styles.container}>
          <Blogs spotlight={spotlight} />
        </Box>
      </Container>
    </>
  );
}
