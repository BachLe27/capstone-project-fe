import { Messages } from '@/errors';
import { message } from 'antd';

export const displayError = (errorCode) => {
  if (errorCode && Messages[errorCode]) {
    message.error(Messages[errorCode]);
  } else {
    message.error(Messages.CO02);
  }
};
