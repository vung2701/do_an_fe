import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const clientId = 'YOUR_CLIENT_ID_FROM_APP2';
const clientSecret = 'YOUR_CLIENT_SECRET_FROM_APP2';
const authorizationUrl = 'http://localhost:8000/o/authorize/';
const tokenUrl = 'http://localhost:8000/o/token/';
const redirectUri = 'http://localhost:3000/callback';

export const useOAuth2Auth = () => {
  const [state] = useState(uuidv4());

  const getToken = async (authCode) => {
    const response = await axios.post(tokenUrl, {
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    });
    return response.data.access_token;
  };

  return { state, getToken };
};
