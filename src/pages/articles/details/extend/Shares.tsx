import { Box } from '@mui/material';
import { useState } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import styles from './shares.module.css';
import { useTranslation } from 'react-i18next';

interface TypeUrl {
  baseUrl?: string;
}

export default function Shares({ baseUrl = '' }: TypeUrl) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
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
          {t('TO')} Facebook
        </FacebookShareButton>
        <div className={styles.button}>
          <input type="text" value={baseUrl} readOnly />
          {copied ? (
            <button type="button" onClick={handleCopy}>
              {t('COPIED')}
            </button>
          ) : (
            <button type="button" onClick={handleCopy}>
              {t('COPY')}
            </button>
          )}
        </div>
      </div>
    </Box>
  );
}
