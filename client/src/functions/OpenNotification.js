import { notification} from 'antd'
 
const OpenNotificationWithIcon = type => {
  notification[type]({
    message: 'Success',
    description:
      'Your upload was successful!',
    duration: 1.2,
  });
};

export default OpenNotificationWithIcon