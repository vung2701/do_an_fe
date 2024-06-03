import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSrcCode } from '../../services';
import { TypeSrcCode } from '../../types';
import { getObjFromLocal } from '../../types/utils';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link, useParams } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';

const SrcCodeItems = ({
  src_code_id,
  name,
  content,
  created_by,
  fetchSrcCodes
}: TypeSrcCode) => {
  const user = getObjFromLocal('user');
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleClose = () => {
    setDeleteDialog(false);
  };

  return (
    <Box className={styles.contentProject}>
      <Link to={`/code/${src_code_id}`} className={styles.contentLink}>
        <img src={'/public/images/code.png'} alt="post user" />
        <div className={styles.content}>
          <h6>{name}</h6>
          <p dangerouslySetInnerHTML={{ __html: content || '' }}></p>
        </div>
      </Link>
      {created_by === user.user_id && (
        <div className={styles.icon}>
          <button>
            <Link to={`/codes/update/${src_code_id}`}>
              <CreateIcon />
            </Link>
          </button>
          <button
            onClick={() => {
              setDeleteDialog(true);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      )}

      <DeleteDialog
        isOpen={deleteDialog}
        handleClose={handleClose}
        id={src_code_id}
        fetchData={fetchSrcCodes}
        type="code"
      />
    </Box>
  );
};

export default function SrcCodes() {
  let { id } = useParams();
  const [srcCodes, setSrcCodes] = useState<TypeSrcCode[]>([]);

  const fetchSrcCodes = async () => {
    try {
      const res = await getSrcCode(1, 50);
      setSrcCodes(res.src_code.filter((item: TypeSrcCode) => item.created_by == id));
    } catch (error) {
      console.error('Error fetching src codes:', error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchSrcCodes();
    } else {
      console.error('User data not found in localStorage');
    }
  }, [id]);

  return (
    <Box className={styles.article} sx={{ marginBottom: '30px' }}>
      <TitleProfile title="Codes" />
      <div className={styles.articleContent}>
        {srcCodes.length <= 0 ? (
          <p className={styles.noProject}>No Codes.</p>
        ) : (
          <>
            {srcCodes.length > 0 &&
              srcCodes.map((item: TypeSrcCode) => (
                <SrcCodeItems
                  key={item?.src_code_id}
                  src_code_id={item?.src_code_id}
                  name={item?.name}
                  content={item?.content}
                  created_by={item?.created_by}
                  fetchSrcCodes={fetchSrcCodes}
                />
              ))}
          </>
        )}
      </div>
    </Box>
  );
}
