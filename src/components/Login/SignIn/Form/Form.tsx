
import * as React from 'react';
import * as Yup from 'yup';
import qs from 'querystring';
import { Auth } from '../../../../services';
import { Input, Button } from '../../../index';
import { USER_TOKEN } from '../../../../models/typings';
import { openSnackbar } from '../../../Notifier/Notifier';
import { withRouter, RouteComponentProps } from 'react-router';
import { Formik, Form as FormikForm, Field, FormikHelpers, FieldProps, ErrorMessage } from 'formik';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import { AuthState } from '../../../../store/auth/types';
import * as AuthActions from '../../../../store/auth/actions';

interface PropsType extends RouteComponentProps {
  showPassword: boolean;
  auth: AuthState;
  handleShowPassword(): void;
  handleForgetPass(): void;
  setUser: typeof AuthActions.setUser;
};

type FormType = {
  username: string;
  password: string;
};

const authService: Auth = new Auth();

const Form: React.FunctionComponent<PropsType> = (props) => {
  const { showPassword, handleShowPassword, handleForgetPass, history, setUser } = props;

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

  const handleSubmit = (values: FormType, actions: FormikHelpers<FormType>) => {
    const { username, password } = values;

    openSnackbar({
      message: 'Autenticando',
      variant: 'info',
      delay: 5000,
    });

    authService.signIn(username, password)
      .then((user) => {
        openSnackbar({
          message: 'Login aceito',
          variant: 'success',
          delay: 2000,
        });

        window.localStorage.setItem(USER_TOKEN, user.token);
        setUser(user);

        const query = history.location.search.replace('?', '');
        const destiny = qs.parse(query).from as string || '/dashboard';

        setTimeout(() => history.push(destiny), 500);
      })
      .catch((error) => {
        console.error(error);

        openSnackbar({
          message: 'Ocorreu um erro e não foi possível autenticar',
          variant: 'error',
          delay: 10000,
        });
      })
      .finally(() => actions.setSubmitting(false));
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
            {/* <div className="pk-form__group" style={{ marginTop: 5, textAlign: "right" }}>
              <Button
                color="secondary"
                onClick={ handleForgetPass }
                text="Esqueci minha senha"
              />
            </div> */}
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


const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...AuthActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Form));
