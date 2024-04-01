import React from 'react';
import { Button, Result } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const Error403 = () => (
    <Result
        icon={<LockOutlined />}
        status="403"
        title="403"
        subTitle="Disculpa, no estas autorizado para accesar a esta pagina ."
        extra={<Button type="primary">Back Home</Button>}
    />
);
export default Error403;