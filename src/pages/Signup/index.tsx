import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';
import Checkbox from '../../components/Checkbox';
import Header from '../../components/Header';

const Signup: React.FC = () => {
  const location = useLocation();
  const [termsChecked, setTermsChecked] = useState(false);

  const handleTermsChange = (checked: boolean) => {
    setTermsChecked(checked);
  };

  return (
    <div className="main-bg w-full h-full mx-auto relative overflow-auto flex flex-col">
      <Header />
      <div className="login-bottom flex flex-col items-center justify-between relative">
        <p className="heading-1 border-b-[3px] border-[#FFDB20] py-2.5 px-[50px]">
          Sign Up
        </p>
        <AuthForm
          formConfig={{
            fields: [
              {
                name: 'name',
                type: 'name',
                placeholder: 'Full Name*',
                inputGroupClass: 'input-signup',
                inputDivClass: 'input-div',
                inputClass: 'input-field',
                required: true,
              },
              {
                name: 'email',
                type: 'email',
                placeholder: 'Email*',
                inputGroupClass: 'input-signup',
                inputDivClass: 'input-div',
                inputClass: 'input-field',
                required: true,
              },
            ],
            btnText: 'Login',
            authFormClass: 'auth-form',
            bottomSectionClass: 'signup-authform',
          }}
          additionalFields={{
            path: location.pathname,
            params: location.search,
          }}
        >
          <div className="mb-4 w-full">
            <Checkbox
              label={
                <div>
                  <span>By submitting this form, I hereby agree to the </span>
                  <a href="/terms" className="underline font-bold">
                    Terms and Conditions
                  </a>
                  <span>
                    {' '}
                    and consent to the collection and processing of my personal data by
                    Danone Specialized Nutrition (Malaysia) Sdn. Bhd. in accordance with
                    the ​
                  </span>
                  <a href="/privacy" className="underline font-bold">
                    Privacy Policy
                  </a>
                </div>
              }
              initialChecked={termsChecked}
              onChange={handleTermsChange}
            />
            <Checkbox
              label={
                <div>
                  <span>
                    I hereby consent to receive AptamilTM KID information via
                    mail/SMS/phone/WhatsApp/Email. Collected data can also be used for
                    customer service purpose.
                  </span>
                </div>
              }
              initialChecked={termsChecked}
              onChange={handleTermsChange}
            />
          </div>
        </AuthForm>
      </div>
    </div>
  );
};

export default Signup;
