// AuthCallback.js
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
  const navigate = useNavigate();
  const getToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      localStorage.setItem('authorization_code', code);
    }
    try {
      // const code = localStorage.getItem('authorization_code');
      const response = await axios.post('http://127.0.0.1:8000/o/token/', {
        grant_type: 'authorization_code',
        client_id: 'v0kTLZZ87VxcN2MGMjJw0xGa9bqTzc1AHzi2OBm5',
        client_secret:
          'eEisYPqcUMCTH4kc6jl4Fikkm9IGX8oJLwNbGXjQPv6CcPbK67SFq4PT3bIpe2lLEf4SWfxwW6h2NWaXzsGT0udo60LPDhijfAw0Ih4u2cnHAzSO4EtjDpFYLDu2un0h',
        code: code,
        redirect_uri: 'http://localhost:5173/callback/'
      });

      const accessToken = response.data.access_token;
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getToken();
    navigate('/login');
  }, []);
  return (
    <div>
      <p>Authentication Successful! You can close this window now.</p>
    </div>
  );
}

export default AuthCallback;
