import React, { FormEvent, ReactNode, useEffect, useState } from 'react';

import ButtonComponent from '../ButtonComponent';
import InputField from '../InputField';
import Checkbox from '../../components/Checkbox';

interface AuthFormProps {
  formConfig?: {
    fields: {
      name: string;
      label?: string;
      type: string;
      placeholder?: string;
      value?: string;
      disabled?: boolean;
      required?: boolean;
      inputGroupClass?: string;
      inputDivClass?: string;
      inputClass?: string;
      phonePrefix?: boolean;
    }[];
    btnText?: string;
    authFormClass?: string;
    bottomSectionClass?: string; // New optional prop
  };
  additionalFields?: { [key: string]: any };
  children?: ReactNode;
}

interface FormErrors {
  [key: string]: string | null;
}

interface FormValues {
  [key: string]: string;
}

function AuthForm({ formConfig, additionalFields, children }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<FormValues>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (formConfig?.fields) {
      const initialErrors: FormErrors = {};
      const initialValues: FormValues = {};
      formConfig.fields.forEach(field => {
        initialErrors[field.name] = null;
        initialValues[field.name] = field.value || '';
      });
      setErrors(initialErrors);
      setValues(initialValues);
    }
  }, [formConfig?.fields]);

  useEffect(() => {
    if (!formConfig?.fields) return;

    const hasErrors = Object.values(errors).some(error => error !== null);
    if (hasErrors) {
      setIsFormValid(false);
      return;
    }

    const isValid = formConfig.fields.every(field => {
      if (field.required) {
        const fieldValue = values[field.name];
        return fieldValue && fieldValue.trim().length > 0;
      }
      return true;
    });

    // If a checkbox is provided as a child, ensure it's checked
    const checkboxChild = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === Checkbox
    );

    const isCheckboxValid = checkboxChild 
      ? (checkboxChild as React.ReactElement).props.initialChecked 
      : true;

    setIsFormValid(isValid && isCheckboxValid);
  }, [errors, values, formConfig?.fields, children]);

  const handleFieldChange = (name: string, value: string, error: string | null) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      console.log('Additional Fields:', additionalFields);
      console.log('Form Data:', data);

      setLoading(false);
    } catch (error) {
      alert('Error: Failed to submit');
      console.error(error);
      setLoading(false);
    }
  };

  const bottomSectionClass = formConfig?.bottomSectionClass || 'authform-bottom';

  return (
    <form
      id="authForm"
      onSubmit={handleSubmit}
      className={`${formConfig?.authFormClass || ''}`}
    >
      {formConfig?.fields.map(field => (
        <InputField
          key={field.name}
          id={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={values[field.name]}
          disabled={field.disabled}
          placeholder={field.placeholder}
          onFieldChange={handleFieldChange}
          required={field.required}
          inputGroupClass={field.inputGroupClass}
          inputDivClass={field.inputDivClass}
          inputClass={field.inputClass}
          phonePrefix={field.phonePrefix}
        />
      ))}

      {children}

      <div className={bottomSectionClass}>
        <ButtonComponent
          buttonText={formConfig?.btnText || 'Submit'}
          buttonType="submit"
          loading={loading}
          disabled={!isFormValid}
          buttonClass="button-component"
        />
      </div>
    </form>
  );
}

export default AuthForm;