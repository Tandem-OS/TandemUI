
import { Spin } from 'antd';
interface GlobalSpinnerProps {
  message?: string;
  subMessage?: string;
}

const GlobalSpinner = ({ message, subMessage }: GlobalSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 gap-lg">
      <Spin size="large" />
      {message && (
        <div className="text-center space-y-xs">
          <p className="text-text-primary text-para-md font-medium">{message}</p>
          {subMessage && (
            <p className="text-text-secondary text-para-sm">{subMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSpinner;