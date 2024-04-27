import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from './listComments.module.css';
import { concatLinkImage } from '../../../../types/utils';

interface TypeListComments {
  description?: string | undefined;
  created_by_image?: string | undefined;
  created_by_last_name?: string | undefined;
  created_by_first_name?: string | undefined;
}

export default function ListComments({
  description,
  created_by_image,
  created_by_last_name,
  created_by_first_name
}: TypeListComments) {
  return (
    <li className={styles.listDescription}>
      <img
        src={
          created_by_image
            ? concatLinkImage(created_by_image)
            : '/images/6596121.png'
        }
        alt="image"
      />
      <div className={styles.contents}>
        <div className={styles.name}>
          <span>{created_by_first_name}</span>
          <span>{created_by_last_name}</span>
        </div>
        <span className={styles.description}>{description}</span>
        <ul className={styles.subList}>
          {/* <li>
            <button>Like</button>
          </li>
          <li>
            <button>Reply</button>
          </li> */}
        </ul>
      </div>
      <MoreHorizIcon className={styles.dots} />
    </li>
  );
}
