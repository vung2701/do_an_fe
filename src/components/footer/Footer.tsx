import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <Container>
        <Grid container>
          <Grid item xs={3}>
            <ul className={styles.list}>
              <li>
                <Link to={"/"}>Logo</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs={4}>
                <ul className={styles.list}>
                  <li>
                    <Link to={"/"}>COMPANY</Link>
                  </li>
                  <li>
                    <Link to={"/"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Careers</Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={4}>
                <ul className={styles.list}>
                  <li>
                    <Link to={"/"}>COMPANY</Link>
                  </li>
                  <li>
                    <Link to={"/"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Careers</Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={4}>
                <ul className={styles.list}>
                  <li>
                    <Link to={"/"}>COMPANY</Link>
                  </li>
                  <li>
                    <Link to={"/"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Careers</Link>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container> */}
      <section className={styles.footerBotom}>
        <p>© 2023 AVTVN. All Rights Reserved</p>
      </section>
    </footer>
  );
}
