
import * as React from 'react';
import * as Yup from 'yup';
import qs from 'querystring';
import { Input, Button } from '../../../index';
import { Formik, Form as FormikForm, FormikHelpers, Field, FieldProps, ErrorMessage } from 'formik';
import { openSnackbar } from '../../../Notifier/Notifier';
import { withRouter, RouteComponentProps } from 'react-router';

// Material UI
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

interface PropsType extends RouteComponentProps {
  showPassword: boolean;
  handleShowPassword(): void;
  handleSignUp(): void;
};

type FormType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const Form: React.FunctionComponent<PropsType> = (props) => {
  const { showPassword, handleShowPassword, handleSignUp, history } = props;

  const [ showTooltip, handleTooltipState ] = React.useState(false);

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
    const { name, email, username, password } = values;

    // await auth.signUpWithEmailAndPassword(email, password.trim(), name)
    //   .then((resp) => {
    //     openSnackbar({
    //       message: resp.message,
    //       variant: 'success',
    //       delay: 2000,
    //     });
    //     actions.resetForm();
        
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
                    inputProps={{ maxLength: 100 }}
                    placeholder="Qual será seu usuário?"
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
                    placeholder="Onde podemos entrar em contato?"
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
                style={{ marginRight: 10 }}
                onClick={ submitForm }
                disabled={ isSubmitting }
                loading={ isSubmitting }
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

export default withRouter(Form);
