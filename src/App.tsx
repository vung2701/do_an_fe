import { useEffect } from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AppRouters from './routers/AppRouters';
import { ClientJS } from 'clientjs';
import sha256 from 'crypto-js/sha256';

function App() {
  const encryptData = (data: any) => {
    // Mã hóa dữ liệu bằng SHA-256 và chuyển thành chuỗi hex
    const encryptedData = sha256(data).toString();
    return encryptedData;
  };

  useEffect(() => {
    const clientJs = new ClientJS();
    const sw = clientJs.getSoftwareVersion();
    const osVersion = clientJs.getOSVersion();
    const cpu = clientJs.getCPU();
    const os = clientJs.getOS();
    const screen = clientJs.getScreenPrint();
    const timeZone = clientJs.getTimeZone();
    const webBrowse = {
      sw,
      osVersion,
      cpu,
      os,
      screen,
      timeZone
    };

    // Chuyển đối thông tin thành chuỗi JSON và mã hóa
    const encryptedData = encryptData(JSON.stringify(webBrowse));

    // Nếu thông tin chưa tồn tại, ghi vào localStorage
    if (encryptedData) {
      localStorage.setItem('public_user', encryptedData);
    }
  }, []);
  return (
    <>
      <Header />
      <AppRouters />
      <Footer />
    </>
  );
}

export default App;
