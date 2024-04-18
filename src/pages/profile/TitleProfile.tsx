import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import styles from './profile.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface TypeTitle {
  title?: string | undefined;
  clasName?: string;
}

function TitleProfile({ title, onClick, clasName }: TypeTitle) {
  let { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const id = JSON.parse(user);
      setUser(id.user_id);
    }
  }, []);

  return (
    <Box className={`${styles.title} ${clasName}`}>
      <Typography variant="h5">{title}</Typography>
      {
        +id === user ? (
          <></>
          // <button onClick={onClick}>
          //   <AddIcon />
          // </button>
        ) : (
          ''
        )
      }
    </Box >
  );
}

export default TitleProfile;
