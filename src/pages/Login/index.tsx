import { useLocation } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import Header from '../../components/Header';

const Login: React.FC = () => {
  const location = useLocation();

  return (
    <div className="main-bg w-full h-full mx-auto relative overflow-auto flex flex-col">
      <Header />
      <div className="login-bottom flex flex-col items-center justify-between relative">
        <p className="heading-1 border-b-[3px] border-[#FFDB20] py-2.5 px-[50px]">
          Log In
        </p>
        <p className="heading-2 p-4 text-center leading-none">
          Key in your registered mobile
          <br />
          number to login
        </p>
        <AuthForm
          formConfig={{
            fields: [
              {
                name: 'phone',
                type: 'tel',
                placeholder: 'Phone Number',
                inputGroupClass: 'input-group',
                inputDivClass: 'input-div',
                inputClass: 'input-field',
                phonePrefix: true,
              },
            ],
            btnText: 'Login',
            authFormClass: 'auth-form',
          }}
          additionalFields={{
            path: location.pathname,
            params: location.search,
          }}
        />
      </div>
    </div>
  );
};

export default Login;
