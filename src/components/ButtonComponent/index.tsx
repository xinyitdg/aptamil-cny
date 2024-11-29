import { Button } from '@headlessui/react';

import Spinner from '../Spinner';

type ButtonType = 'submit' | 'button' | 'reset';
interface ButtonComponentProps {
  loading?: boolean;
  buttonText: string;
  buttonType?: ButtonType;
  disabled?: boolean;
  buttonClass?: string;
  buttonFunction?: () => void;
}

function ButtonComponent({
  loading,
  buttonText,
  buttonType = 'button',
  disabled,
  buttonClass,
  buttonFunction,
}: ButtonComponentProps) {
  return (
    <Button
      type={buttonType}
      className={`${buttonClass || ''}`}
      disabled={loading || disabled}
      onClick={() => (buttonFunction ? buttonFunction() : null)}
    >
      {buttonText}
      {loading && <Spinner color="white" />}
    </Button>
  );
}

export default ButtonComponent;
