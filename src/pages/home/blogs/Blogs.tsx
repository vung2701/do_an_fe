import { Box, Grid } from '@mui/material';
import Spotlight from '../spotlight/Spotlight';
import Articles from './Articles';
import styles from './blogs.module.css';
import NewMember from '../newMember/NewMember';
import PostHome from './postHome/PostHome';
import { TypeSpotlight } from '../../../types';

export default function Blogs({ spotlight }: { spotlight: TypeSpotlight[] }) {
  return (
    <>
      <Box className={styles.blogs}>
        <Grid container>
          <Grid item xs={8} sx={{ pr: 2 }}>
            <Spotlight spotlight={spotlight} />
            <Articles />
          </Grid>
          <Grid item xs={4} sx={{ pl: 2 }}>
            <PostHome />
          </Grid>
        </Grid>
        <NewMember />
      </Box>
    </>
  );
}
