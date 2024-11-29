import Header from '../../components/Header';

const Verify: React.FC = () => {
  return (
    <div className="main-bg w-full h-full mx-auto relative overflow-auto flex flex-col">
      <Header />
      <div className="login-bottom flex flex-col items-center justify-between relative">
        <p className="heading-1 border-b-[3px] border-[#FFDB20] py-2.5 px-[50px]">
          OTP Verication
        </p>
        <p className="heading-2 p-4 text-center">
          Please enter the verification code sent to
          <br />
          <strong>0123456789</strong>
        </p>
      </div>
    </div>
  );
};

export default Verify;
