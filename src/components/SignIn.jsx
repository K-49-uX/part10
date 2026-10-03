import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }, { setStatus }) => {
    setStatus(undefined);

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
      setStatus(e.message || 'Unable to sign in. Please try again.');
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
