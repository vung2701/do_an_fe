import { Box } from '@mui/material';
import { useState } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import styles from './shares.module.css';

interface TypeUrl {
  baseUrl?: string;
}

export default function Shares({ baseUrl = '' }: TypeUrl) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(baseUrl);
    setCopied(true);
  };

  // const share = 'https://avtvn.com/';
  return (
    <Box className={styles.container}>
      <div className={styles.content}>
        <FacebookShareButton url={baseUrl || ''} className={styles.shareButton}>
          <FacebookIcon size={32} round />
          To facebook
        </FacebookShareButton>
        <div className={styles.button}>
          <input type="text" value={baseUrl} readOnly />
          {copied ? (
            <button type="button" onClick={handleCopy}>
              Copied
            </button>
          ) : (
            <button type="button" onClick={handleCopy}>
              Copy
            </button>
          )}
        </div>
      </div>
    </Box>
  );
}
