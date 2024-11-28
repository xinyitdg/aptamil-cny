import { useEffect, useState } from 'react';

import { Input } from '@headlessui/react';

import { checkInputFormat } from '../../utils/validator';

interface AuthInputFieldType {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  inputGroupClass?: string;
  inputClass?: string;
  onFieldChange: (name: string, value: string, error: string | null) => void;
}

function InputField({
  type,
  id,
  name,
  label,
  placeholder,
  value,
  disabled,
  required,
  inputGroupClass,
  inputClass,
  onFieldChange,
}: AuthInputFieldType) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = input.target.value;
    const { result, message } = checkInputFormat({ [id]: userInput });
    const newError = !result ? message : null;
    setError(newError);
    onFieldChange(name, userInput, newError);
  };

  useEffect(() => {
    if (value) {
      const { result, message } = checkInputFormat({ [id]: value });
      const newError = !result ? message : null;
      setError(newError);
      onFieldChange(name, value, newError);
    }
  }, []);

  return (
    <div className={`${inputGroupClass || ''}`}>
      <label>{label}</label>
      {required && <span className="text-red-500">*</span>}
      <Input
        required={required}
        type={type}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${error ? 'border-red-600' : 'border-black'} ${inputClass || ''}`}
      />
      <span className="text-red-600">{error}</span>
    </div>
  );
}

export default InputField;
