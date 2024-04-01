import React from 'react';
import { Result, Button, Image } from 'antd';

const Error500 = () => (
  <Result
    status="500"
    title={<span style={{ fontSize: '36px' }}>500</span>}
    subTitle={<span style={{ fontSize: '24px' }}>Disculpa. Nuestros servidores estan teniendo problemas intenta más tarde</span>}
  />
);
export default Error500;