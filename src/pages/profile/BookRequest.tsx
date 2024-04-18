import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBookRequest } from '../../services';
import { TypeBookRequest } from '../../types';
import TitleProfile from './TitleProfile';
import styles from './profile.module.css';
import { Link, useParams } from 'react-router-dom';
import { concatLinkImage, convertDate } from '../../types/untils';

const BookRequestItems = ({
  book_id,
  book,
  book_author,
  book_image,
  status,
  request_type,
  request_from,
  request_to
}: TypeBookRequest) => {
  return (
    <Link to={`/books/${book_id}`} className={styles.bookRequestItem}>
      <img
        src={book_image ? concatLinkImage(book_image) : '/public/images/6596121.png'}
        alt="book"
      />
      <div className={styles.content}>
        <h6>{book}</h6>
        <span>{book_author}</span>
      </div>
      {request_from && request_to && (
        <div className={styles.contentCenter}>
          <p>
            <b>From:</b> {convertDate(request_from)}
          </p>
          <p>
            <b>To:</b> {convertDate(request_to)}
          </p>
        </div>
      )}
      <div className={styles.contentRight}>
        <p>
          <b>Status:</b> {status}
        </p>
        <p>
          <b>Type:</b> {request_type}
        </p>
      </div>
    </Link>
  );
};

export default function BookRequest() {
  let { id } = useParams();
  const [bookRequests, setBookRequests] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchBookRequest = async () => {
        try {
          const data = await getBookRequest(id);
          setBookRequests(data.book_request.reverse());
        } catch (error) {
          console.error('Error fetching or filtering book request', error);
        }
      };
      fetchBookRequest();
    } else {
      console.error('User data not found in localStorage');
    }
  }, [id]);

  return (
    <Box className={styles.article} sx={{ marginBottom: '30px' }}>
      <TitleProfile title="Book Requests" />
      <div className={styles.articleContent}>
        {bookRequests.length <= 0 ? (
          <p className={styles.noProject}>You have no book requests.</p>
        ) : (
          <>
            {bookRequests.length > 0 &&
              bookRequests.map((item: TypeBookRequest) => (
                <BookRequestItems
                  key={item?.book_request_id}
                  book_id={item?.book_id}
                  book={item?.book}
                  book_author={item?.book_author}
                  book_image={item?.book_image}
                  status={item?.status}
                  request_type={item?.request_type}
                  request_from={item?.request_from}
                  request_to={item?.request_to}
                />
              ))}
          </>
        )}
      </div>
    </Box>
  );
}
