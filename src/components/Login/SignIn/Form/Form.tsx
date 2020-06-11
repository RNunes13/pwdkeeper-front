
import * as React from 'react';
import * as Yup from 'yup';
import qs from 'querystring';
import { withRouter, RouteComponentProps } from 'react-router';
import { Input, Button } from '../../../index';
import { openSnackbar } from '../../../Notifier/Notifier';
import { Formik, Form as FormikForm, Field, FormikHelpers, FieldProps, ErrorMessage } from 'formik';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

interface PropsType extends RouteComponentProps {
  showPassword: boolean;
  handleShowPassword(): void;
  handleForgetPass(): void;
};

type FormType = {
  username: string;
  password: string;
};

const Form: React.FunctionComponent<PropsType> = (props) => {
  const { showPassword, handleShowPassword, handleForgetPass, history } = props;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required('Campo obrigatório'),
  });
  
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: FormType, actions: FormikHelpers<FormType>) => {
    const { username, password } = values;
    
    // await auth.signInWithEmailAndPassword(email, password)
    //   .then((resp) => {
    //     openSnackbar({
    //       message: resp.message,
    //       variant: 'success',
    //       delay: 2000,
    //     });

    //     const query = history.location.search.replace('?', '');
    //     const destiny = qs.parse(query).from as string || '/dashboard';

    //     history.push(destiny);
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
      <p className="pk-form__info">Faça o login para acesso a aplicação</p>
      <Formik
        validationSchema={ validationSchema }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        render={({ errors, touched, isSubmitting, submitForm }) =>
          <FormikForm>
            <div className="pk-form__group">
              <Field
                name="username"
                render={(props: FieldProps) =>
                  <Input
                    id="username"
                    type="text"
                    label="Usuário"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.username }
                    touched={ touched.username }
                  />
                }
              />
              <ErrorMessage className="pk-form__error" name="username" component="div" />
            </div>
            <div className="pk-form__group">
              <Field
                name="password"
                render={(props: FieldProps) =>
                  <Input
                    id="password"
                    type={ showPassword ? 'text' : 'password' }
                    label="Senha"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.password }
                    touched={ touched.password }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={ handleShowPassword }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
              <ErrorMessage className="pk-form__error" name="password" component="div" />
            </div>
            <div className="pk-form__group" style={{ marginTop: 5, textAlign: "right" }}>
              <Button
                color="secondary"
                onClick={ handleForgetPass }
                text="Esqueci minha senha"
              />
            </div>
            <div className="pk-form__group button" style={{ marginTop: 20, textAlign: "center" }}>
              <div style={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={ submitForm }
                  disabled={ isSubmitting }
                  loading={ isSubmitting }
                  text="Acessar"
                />
              </div>
            </div>
          </FormikForm>
        }
      />
    </>
  );
};

export default withRouter(Form);
