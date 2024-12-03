import { useLocation } from 'react-router-dom';

import cnyBody from '../../assets/images/cny-body.png';
import cnyTop from '../../assets/images/cny-top.png';
import AuthForm from '../../components/AuthForm';
import Header from '../../components/Header';

const Login: React.FC = () => {
  const location = useLocation();

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full" />
      </div>

      <div className="relative -mt-[115px] overflow-hidden z-[3]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative">
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
        <div className="footer-div">
          <p className="text-white text-center relative z-20 pt-[190px]">
            Not registered yet? Sign up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
