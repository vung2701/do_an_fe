import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMemberId, getSkilId, profileUser, uploadAvatar } from '../../services';
import { TypeMemberId } from '../../types';
import Titles from '../../components/titles/Titles';
import Articles from './Articles';
import InfomationUser from './InfomationUser';
import styles from './profile.module.css';
import { useAuth } from '../../context/AuthContext';
import { getObjFromLocal } from '../../types/untils';
import BookRequest from './BookRequest';

export default function Profile() {
  let { id } = useParams();
  const { updateProfile } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memberId, setMemberId] = useState<TypeMemberId>();
  const [oppen, setOppen] = useState(false);
  const [user, setUser] = useState();
  const [skills, setSkills] = useState([]);

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
        const profileId = await getMemberId(id);
        setMemberId(profileId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fecthSkills = async () => {
    try {
      const res = await getSkilId(memberId?.my_skill);
      setSkills(res?.skill);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthSkills();
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
          <Titles
            classNameAdd={styles.titleLogin}
            name={`${memberId?.first_name} ${memberId?.last_name} Profile`}
          />
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
            {id === user && <BookRequest />}

            {/* <Projects user={memberId?.user} userId={user} idProfile={+id} /> */}
            <Articles />
          </Grid>
          {/* <Grid item xs={4}>
            <Certifications userId={user} idProfile={+id} />
            <Skills userId={user} idProfile={+id} skills={skills} />
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
}
