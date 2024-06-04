import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfileUser, profileUser, uploadAvatar } from '../../services';
import Titles from '../../components/titles/Titles';
import Articles from './Articles';
import InfomationUser from './InfomationUser';
import styles from './profile.module.css';
import { useAuth } from '../../context/AuthContext';
import { getObjFromLocal } from '../../types/utils';
import { TypeProfile } from '../../types';
import Posts from './Posts';
import SrcCodes from './SrcCodes';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  let { id } = useParams();
  const { updateProfile } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memberId, setMemberId] = useState<TypeProfile>();
  const [oppen, setOppen] = useState(false);
  const [user, setUser] = useState();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      await handleUploadFile(event.target.files[0]);
    }
  };

  const handleFileClick = async () => {
    inputRef.current?.click();
  };

  const handleUploadFile = async (fileInput: File) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && fileInput) {
      const fileURL = await uploadAvatar(fileInput);
      const userProfile = {
        profile_id: id,
        image: fileURL
      };

      try {
        await profileUser(userProfile);
        updateProfile();
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.log(error);
        toast.error('Image upload failed');
      }
    }
  };

  const handleShowEditProfile = () => {
    setOppen(!oppen);
  };

  const fecthMemberId = async () => {
    try {
      if (id) {
        const res = await getProfileUser(id);
        setMemberId(res.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthMemberId();
  }, [updateProfile, id]);

  useEffect(() => {
    const user = getObjFromLocal('user');
    if (user) {
      setUser(user.user_id);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Container className="container-1">
      <Box className={styles.profile}>
        <div className={styles.profileTitle}>
          <Titles classNameAdd={styles.titleLogin} name={t('PROFILE')} />
          {id === user && (
            <button onClick={handleShowEditProfile}>
              {oppen ? <CloseIcon /> : <CreateIcon />}
            </button>
          )}
        </div>
        <InfomationUser
          memberId={memberId}
          selectedFile={selectedFile}
          handleFileClick={handleFileClick}
          inputRef={inputRef}
          handleFileChange={handleFileChange}
          oppen={oppen}
          handleShowEdit={handleShowEditProfile}
        />
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4, lg: 4 }}
          className={styles.profileBootom}
        >
          <Grid item xs={12}>
            <Articles />
            <Posts />
            <SrcCodes />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
