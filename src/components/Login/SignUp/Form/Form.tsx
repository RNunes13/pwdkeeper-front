
import * as React from 'react';
import * as Yup from 'yup';
import qs from 'querystring';
import { Auth } from '../../../../services';
import { Input, Button } from '../../../index';
import { USER_TOKEN } from '../../../../models/typings';
import { openSnackbar } from '../../../Notifier/Notifier';
import { withRouter, RouteComponentProps } from 'react-router';
import { Formik, Form as FormikForm, FormikHelpers, Field, FieldProps, ErrorMessage } from 'formik';

// Material UI
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import { AuthState } from '../../../../store/auth/types';
import * as AuthActions from '../../../../store/auth/actions';

interface PropsType extends RouteComponentProps {
  auth: AuthState,
  showPassword: boolean;
  handleShowPassword(): void;
  handleSignUp(): void;
  setUser: typeof AuthActions.setUser;
};

type FormType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const authService: Auth = new Auth();

const Form: React.FunctionComponent<PropsType> = (props) => {
  const { showPassword, handleShowPassword, handleSignUp, history, setUser } = props;

  const [ showTooltip, handleTooltipState ] = React.useState(false);
  const [ checkingEmail, setCheckingEmail ] = React.useState(false);
  const [ emailAvailable, setEmailAvailable ] = React.useState(true);
  const [ checkingUsername, setCheckingUsername ] = React.useState(false);
  const [ usernameAvailable, setUsernameAvailable ] = React.useState(true);

  const handleTooltip = (open: boolean) => () => handleTooltipState(open);
  
  const checkMark = `\u{2713}`;

  const tooltipTitle = (text: string) => (
    <div style={{ padding: 10, textAlign: "left"}}>
      <h4 style={{ marginBottom: 10 }}>Requisitos mínimos</h4>
      <ul style={{ fontSize: 13, listStyleType: "disc", marginLeft: 15 }}>
        <li>8 caracteres { text.length >= 8 ? checkMark : '' }</li>
        <li>1 letra maiúscula { /(?=.*[A-Z])/.test(text) ? checkMark : '' }</li>
        <li>1 letra minúscula { /(?=.*[a-z])/.test(text) ? checkMark : '' }</li>
        <li>1 número { /(?=.*[0-9])/.test(text) ? checkMark : '' }</li>
        <li>1 símbolo (! @ # $ % ^ & *) { /(?=[!@#\$%\^&\*])/.test(text) ? checkMark : '' }</li>
      </ul>
    </div>
  );
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campo obrigatório'),
    username: Yup.string()
      .required('Campo obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        'A senha não atende todos os requisitos mínimos'
      ),
  });
  
  const initialValues = {
    name: '',
    email: '',
    username: '',
    password: '',
  };

  const handleSubmit = async (values: FormType, actions: FormikHelpers<FormType>) => {
    if (!usernameAvailable) {
      openSnackbar({
        message: 'Usuário já está em uso',
        variant: 'warning',
        delay: 5000,
      });

      actions.setSubmitting(false)
      return;
    }

    if (!emailAvailable) {
      openSnackbar({
        message: 'Email já está em uso',
        variant: 'warning',
        delay: 5000,
      });

      actions.setSubmitting(false)
      return;
    }

    openSnackbar({
      message: 'Realizando o cadastro',
      variant: 'info',
      delay: 5000,
    });

    authService.signUp(values)
      .then((user) => {
        openSnackbar({
          message: 'Cadastro realizado!',
          variant: 'success',
          delay: 3000,
        });

        window.localStorage.setItem(USER_TOKEN, user.token);
        setUser(user);

        const query = history.location.search.replace('?', '');
        const destiny = qs.parse(query).from as string || '/';

        setTimeout(() => history.push(destiny), 500);
      })
      .catch((error) => {
        console.error(error);

        openSnackbar({
          message: 'Ocorreu um erro e não foi possível cadastrar',
          variant: 'error',
          delay: 5000,
        });
      })
      .finally(() => actions.setSubmitting(false));
  };

  const checkAvailability = async (field: 'email' | 'username', value: string) => {
    if (!value) return;
    
    try {
      if (field === 'email') {
        setCheckingEmail(true);
        const available = await authService.checkEmailAvailability(value);

        setEmailAvailable(available);

        if (!available) {
          openSnackbar({
            message: 'Email já está em uso',
            variant: 'warning',
            delay: 5000,
          });
        }
      } else if (field === 'username') {
        setCheckingUsername(true);
        const available = await authService.checkUsernameAvailability(value);
        
        setUsernameAvailable(available);

        if (!available) {
          openSnackbar({
            message: 'Usuário já está em uso',
            variant: 'warning',
            delay: 5000,
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCheckingEmail(false);
      setCheckingUsername(false);
    }
  }

  return (
    <>
      <p className="pk-form__info">Preencha os campos abaixo para fazer o cadastro, é rapidinho.</p>
      <Formik
        validationSchema={ validationSchema }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        render={({ errors, touched, isSubmitting, submitForm, values }) =>
          <FormikForm>
            <div className="pk-form__group">
              <Field
                name="name"
                render={(props: FieldProps) =>
                  <Input
                    id="name"
                    type="text"
                    label="Nome"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.name }
                    touched={ touched.name }
                    inputProps={{ maxLength: 200 }}
                    placeholder="Como gostaria de ser chamado?"
                    autoFocus
                  />
                }
              />
              <ErrorMessage className="pk-form__error" name="name" component="div" />
            </div>
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
                    disabled={ checkingUsername }
                    inputProps={{ maxLength: 100 }}
                    placeholder="Qual será seu usuário?"
                    onBlur={ (e) => {
                      props.field.onBlur(e);
                      checkAvailability('username', values.username);
                    }}
                  />
                }
              />
              <ErrorMessage className="pk-form__error" name="username" component="div" />
            </div>
            <div className="pk-form__group">
              <Field
                name="email"
                render={(props: FieldProps) =>
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.email }
                    touched={ touched.email }
                    disabled={ checkingEmail }
                    placeholder="Onde podemos entrar em contato?"
                    onBlur={ (e) => {
                      props.field.onBlur(e);
                      checkAvailability('email', values.email);
                    }}
                  />
                }
              />
              <ErrorMessage className="pk-form__error" name="email" component="div" />
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
                    placeholder="Defina uma senha agora"
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
            <div className="pk-form__group" style={{ textAlign: "right" }}>
              <ClickAwayListener onClickAway={ handleTooltip(false) }>
                <Tooltip
                  PopperProps={{ disablePortal: true }}
                  onClose={ handleTooltip(false) }
                  open={ showTooltip }
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={ tooltipTitle(values.password) }
                >
                  <Button
                    color="secondary"
                    text="Requisitos para a senha"
                    onClick={ handleTooltip(true) }
                  />
                </Tooltip>
              </ClickAwayListener>
            </div>
            <div className="pk-form__group" style={{ marginTop: 20, marginBottom: 15, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                text="Cadastrar"
                onClick={ submitForm }
                style={{ marginRight: 10 }}
                loading={ isSubmitting }
                disabled={ isSubmitting || checkingEmail || checkingUsername }
              />
              <Button
                color="secondary"
                text="Voltar"
                onClick={ handleSignUp }
                disabled={ isSubmitting }
              />
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
