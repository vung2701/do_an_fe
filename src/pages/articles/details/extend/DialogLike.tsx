import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import styles from './DialogLike.module.css';
import { useEffect, useState } from 'react';
import { getProfileUser } from '../../../../services';
import { TypeProfile } from '../../../../types';
import { concatLinkImage } from '../../../../types/utils';
import { isLogin } from '../../../../middlewares/Authorization';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const DialogLikeItem = ({ id }: { id: string }) => {
  const [user, setUser] = useState<TypeProfile>();

  const fetchUser = async (id: string) => {
    try {
      const data = await getProfileUser(id);
      setUser(data.profile);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);
  return (
    <li>
      <Link to={`/profile/${user?.user_id}`}>
        <img
          loading="lazy"
          src={
            user?.image ? concatLinkImage(user?.image) : '/public/images/user.png'
          }
          alt="user"
        />
        <div className={styles.infomation}>
          <h2>
            <span>{user?.first_name}</span>
            <span>{user?.last_name}</span>
          </h2>
          <div>
            {user?.major} {user?.school}
          </div>
        </div>
      </Link>
    </li>
  );
};

type UserType = {
  user_id: number;
  first_name: string;
  last_name: string;
};

interface TypeDialogLike {
  open: boolean;
  handleClose?: () => void;
  likess?: number;
  likeAuth?: string[];
  listLike?: UserType[];
}

export default function DialogLike({
  open,
  handleClose,
  likess,
  likeAuth
}: TypeDialogLike) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className={styles.containerLike}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {likess} Likes
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
      <DialogContent className={styles.containerListLike}>
        {isLogin() ? (
          <ul className={styles.ListLike}>
            {likeAuth &&
              likeAuth.length > 0 &&
              likeAuth?.map((idItem: string) => (
                <DialogLikeItem key={idItem} id={idItem} />
              ))}
          </ul>
        ) : (
          <div className={styles.notLoginLike}>
            <Link to="/login">Login to see user(s) liked.</Link>
          </div>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
}
