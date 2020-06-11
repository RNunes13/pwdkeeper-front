
import * as React from 'react';
import * as Yup from 'yup';
import { Input, Button } from '../../../index';
import { openSnackbar } from '../../../../components/Notifier/Notifier';
import { Formik, Form as FormikForm, FormikHelpers, Field, FieldProps, ErrorMessage } from 'formik';

type PropsType = {
  handleForgetPass(): void;
};

type FormType = {
  email: string;
};

const Form: React.FunctionComponent<PropsType> = ({ handleForgetPass }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
  });
  
  const initialValues = {
    email: '',
  };

  const handleSubmit = async (values: FormType, actions: FormikHelpers<FormType>) => {
    const { email } = values;

    // await auth.resetPassword(email)
    //   .then((resp) => {
    //     openSnackbar({
    //       message: resp.message,
    //       variant: 'success',
    //     });
    //     actions.resetForm();
    //   })
    //   .catch((error) => {
    //     openSnackbar({
    //       message: error.message,
    //       variant: 'error',
    //       delay: 10000,
    //     });
    //   });

    actions.setSubmitting(false);
  };

  return (
    <>
      <p className="pk-form__info">Informe o email cadastrado em sua conta para redefinir a senha</p>
      <Formik
        validationSchema={ validationSchema }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        render={({ errors, touched, isSubmitting, submitForm }) =>
          <FormikForm>
            <div className="pk-form__group">
              <Field
                name="email"
                render={(props: FieldProps) =>
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    error={ errors.email }
                    touched={ touched.email }
                    fieldProps={ props }
                    autoFocus
                  />
                }
              />
              <ErrorMessage className="pk-form__error" name="email" component="div" />
            </div>
            <div className="pk-form__group" style={{ marginTop: 20, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 10 }}
                onClick={ submitForm }
                disabled={ isSubmitting }
                loading={ isSubmitting }
                text="Enviar"
              />
              <Button
                color="secondary"
                onClick={ handleForgetPass }
                disabled={ isSubmitting }
                text="Voltar"
              />
            </div>
          </FormikForm>
        }
      />
    </>
  );
};

export default Form;
