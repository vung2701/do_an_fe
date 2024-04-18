import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomButton from '../customButton/CustomButton';
import styles from './dialogs.module.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export default function Dialogs({
  open,
  handleClose,
  baseUrl
}: {
  open: boolean;
  handleClose: () => void;
  baseUrl: string;
}) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Share
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 40
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 50
              }
            }}
            modules={[Navigation]}
            className={styles.swiperDialogs}
          >
            <SwiperSlide>
              <Box className={styles.iconList}>
                <FacebookIcon />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className={styles.iconList}>
                <WhatsAppIcon />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className={styles.iconList}>
                <EmailIcon />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box className={styles.iconList}>
                <LinkedInIcon />
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
        <Box className={styles.link}>
          <input type="text" value={baseUrl} readOnly />
          <CustomButton name="Copy" classNameAdd="btnDialogs" />
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
