import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { concatLinkImage, getShortName } from '../../../types/utils';
import styles from './newMember.module.css';
import { getNewMember } from '../../../services';
import { useTranslation } from 'react-i18next';

interface TypeMember {
  DOB?: string | undefined;
  company?: string | undefined;
  designation?: string | undefined;
  id?: number | undefined;
  image?: string | undefined;
  location?: string | undefined;
  modified_on?: string | undefined;
  phone?: string | undefined;
  last_name?: string | undefined;
  first_name?: string | undefined;
  user?: number | undefined;
  user_id?: string | undefined;
}

const Member = ({
  designation,
  image,
  company,
  last_name,
  first_name,
  user_id
}: TypeMember) => {
  return (
    <Link to={`profile/${user_id}`} className={styles.member}>
      <div className={styles.image}>
        <img
          loading="lazy"
          src={image ? concatLinkImage(image) : '/images/user.png'}
          alt="new member"
        />
      </div>

      <Typography variant="h2" className={styles.title}>
        {getShortName(`${first_name} ${last_name}`)}
      </Typography>
      <div className={styles.info}>
        <span>{designation}</span>
        <span>{company}</span>
      </div>
    </Link>
  );
};

export default function NewMember() {
  const [member, setMember] = useState([]);
  const { t } = useTranslation();
  const fetchMember = async () => {
    try {
      const res = await getNewMember();
      setMember(res?.profile);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <Box>
      {member?.length > 0 && (
        <Box className={styles.newMember}>
          <div className={styles.wrapper1}>
            <h2 className={styles.containerNation}>
              <Link to={'/'}>{t('WELCOME')}</Link>
            </h2>
          </div>
          <Box className={styles.container}>
            {member?.map((m: TypeMember) => (
              <Member
                key={m?.id || m?.user_id}
                user={m?.user}
                image={m?.image}
                designation={m?.designation}
                company={m?.company}
                first_name={m?.first_name}
                last_name={m?.last_name}
                user_id={m?.user_id}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
