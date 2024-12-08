import { useState } from 'react';

import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal';
import Spinner from '../Spinner';

type ButtonType = 'submit' | 'button' | 'reset';
interface ButtonComponentProps {
  loading?: boolean;
  buttonText: string;
  buttonType?: ButtonType;
  disabled?: boolean;
  buttonClass?: string;
  buttonFunction?: () => void;
  navigateTo?: string;
  modal?: {
    logo: string;
    title: string;
    message: string;
    modalButtonText: string;
    modalButtonClass: string;
  };
}

function ButtonComponent({
  loading,
  buttonText,
  buttonType = 'button',
  disabled,
  buttonClass,
  buttonFunction,
  navigateTo,
  modal,
}: ButtonComponentProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonFunction) {
      buttonFunction();
    }

    if (navigateTo) {
      navigate(navigateTo);
    } else if (modal) {
      setIsModalVisible(true);
    }
  };
  
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type={buttonType}
        className={`${buttonClass || ''}`}
        disabled={loading || disabled}
        onClick={handleButtonClick}
      >
        {buttonText}
        {loading && <Spinner color="white" />}
      </Button>

      {isModalVisible && modal && (
        <Modal
          logo={modal.logo}
          title={modal.title}
          message={modal.message}
          buttonText={modal.modalButtonText}
          buttonClass={modal.modalButtonClass}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default ButtonComponent;
