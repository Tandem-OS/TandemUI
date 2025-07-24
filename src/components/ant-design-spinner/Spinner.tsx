import { Spin } from 'antd';

const GlobalSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-8">
      <Spin size="large" />
    </div>
  );
};

export default GlobalSpinner;
