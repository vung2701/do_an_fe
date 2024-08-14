import React, { useEffect, useState } from 'react';

const CallComponent = () => {
  const [client, setClient] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);

  useEffect(() => {
    const stringeeClient = new window.StringeeClient();

    stringeeClient.on('connect', (data) => {
      console.log('Connected:', data);
      setClient(stringeeClient);
    });

    stringeeClient.on('authen', (res) => {
      if (res.r === 0) {
        console.log('Auth success:', res);
      } else {
        console.error('Auth failed:', res.message);
      }
    });

    stringeeClient.on('disconnected', () => {
      console.log('Disconnected');
      setClient(null);
    });

    stringeeClient.on('connectError', (error) => {
      console.error('Connection Error:', error);
    });

    stringeeClient.on('requestNewToken', () => {
      console.log('Requesting new token');
    });

    stringeeClient.on('otherDeviceLogin', () => {
      console.warn('Logged in on another device');
    });

    stringeeClient.on('incomingCall', (data) => {
      console.log('Incoming Call:', data);
      const incomingCall = new window.StringeeCall(client, data.callId);

      incomingCall.on('addremotestream', (stream) => {
        console.log('Received remote stream:', stream);
        const remoteVideo = document.getElementById('remoteVideo') ;
        if (remoteVideo) {
          remoteVideo.srcObject = stream;
        }
      });

      incomingCall.on('signalingstate', (state) => {
        console.log('Signaling state:', state);
        if (state.code === 6) { // Call ended
          setCurrentCall(null);
        }
      });

      // Automatically answer the call or show a UI to allow the user to answer
      incomingCall.answer((res) => {
        if (res.r === 0) {
          console.log('Call answered successfully');
          setCurrentCall(incomingCall);
        } else {
          console.error('Failed to answer the call:', res.message);
        }
      });

      // Optional: Handle call rejection or other actions
      // incomingCall.reject((res) => {
      //   console.log('Call rejected:', res);
      // });

    });

    const token =
      'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTSy4wLnVaQ3ZXRTkxaFZhSExSaEdDc1ZsVW1zbGI3eEZaa1FvLTE3MjM2MzExMDQiLCJpc3MiOiJTSy4wLnVaQ3ZXRTkxaFZhSExSaEdDc1ZsVW1zbGI3eEZaa1FvIiwiZXhwIjoxNzI2MjIzMTA0LCJ1c2VySWQiOiJ1c2VyXzEifQ.Lt7AVerRuM0vGLGNHlKlI4lYxXiaHc7XxUxok4pqOUE';
    stringeeClient.connect(token);

    return () => {
      stringeeClient.disconnect();
    };
  }, []);

const makeCall = () => {
  if (!client) {
    console.error('Client is not connected');
    return;
  }

  const callParams = {
    from: 'user_2',
    to: 'user_1',
    isPhoneCall: true,
  };

  const outgoingCall = new window.StringeeCall(client, callParams);
  console.log('Outgoing call:', outgoingCall);

  outgoingCall.on('signalingstate', state => {
    console.log('Signaling state:', state);
    if (state.code === 6) {
      // Call ended
      setCurrentCall(null);
    }
  });

  outgoingCall.on('addremotestream', stream => {
    const remoteVideo = document.getElementById('remoteVideo');
    if (remoteVideo) {
      remoteVideo.srcObject = stream;
    }
  });

  outgoingCall.makeCall(res => {
    if (res.r === 0) {
      console.log('Call success:', res);
      setCurrentCall(outgoingCall);
    } else {
      console.error('Call failed:', res.message);
    }
  });
};

  return (
    <div>
      <button onClick={makeCall}>Make Call</button>
      <div>
        <video id="remoteVideo" autoPlay playsInline></video>
      </div>
    </div>
  );
};

export default CallComponent;
