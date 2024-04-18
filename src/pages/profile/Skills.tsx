import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSkilId, getSkils } from '../../services';
import { TypeSikll } from '../../types';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';

const SkillItems = ({
  skill,
  userId,
  idProfile
}: {
  userId?: number;
  idProfile?: number;
  skill?: string;
}) => {
  return (
    <div className={styles.items}>
      <div className={styles.content}>
        <span>{skill && skill}</span>
      </div>
      {userId === idProfile ? (
        <div className={styles.icon}>
          <button>
            <ClearIcon />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default function Skills({
  userId,
  idProfile,
  skills
}: {
  userId?: number;
  idProfile?: number;
}) {
  return (
    <Box sx={{ marginBottom: '30px' }}>
      <TitleProfile title="Skills" />
      <Box className={`${styles.contentSkills} ${styles.contentProject} `}>
        {skills?.length > 0 &&
          skills?.map((s: TypeSikll) => (
            <SkillItems
              key={s.id}
              skill={s.skill}
              userId={userId}
              idProfile={idProfile}
            />
          ))}
      </Box>
    </Box>
  );
}
