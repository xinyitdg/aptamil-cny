import { useLocation } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

const Login: React.FC = () => {
  const location = useLocation();

  return (
    <AuthForm
      formConfig={{
        fields: [
          {
            name: 'phone',
            label: 'Phone Number',
            type: 'tel',
            inputGroupClass: 'input-group',
            inputClass: 'input-field',
          },
        ],
        authFormClass: 'auth-form',
      }}
      additionalFields={{
        path: location.pathname,
        params: location.search,
      }}
    />
  );
};

export default Login;
