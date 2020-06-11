
import * as React from 'react';
import { FieldProps } from 'formik';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';

interface InputProps extends OutlinedTextFieldProps {
  error?: any;
  touched?: boolean;
  fieldProps: FieldProps;
}

const Input: React.FunctionComponent<InputProps> = ({
  error,
  onBlur,
  touched,
  rows = 4,
  onChange,
  fieldProps,
  fullWidth = true,
  margin = 'normal',
  ...rest
}) => {
  const { field } = fieldProps;

  return (
    <TextField
      rows={ rows }
      margin={ margin }
      name={ field.name }
      value={ field.value }
      fullWidth={ fullWidth }
      error={ Boolean(error) && touched }
      onBlur={ onBlur ? onBlur : field.onBlur }
      onChange={ onChange ? onChange : field.onChange }
      { ...rest }
    />
  );
};

export default Input;
