import axios from 'axios';

function Login1() {
  const handleLogin = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/o/authorize/?client_id=v0kTLZZ87VxcN2MGMjJw0xGa9bqTzc1AHzi2OBm5&response_type=code&redirect_uri=http://localhost:5173/callback&scope=read'
      );

      // Chuyển hướng người dùng đến trang xác thực của Django backend
      window.location = response.request.responseURL;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Django</button>
    </div>
  );
}

export default Login1;
