import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import { CREATE_USER } from '../graphql/mutations';
import SignUpContainer from './SignUpContainer';

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }, { setStatus }) => {
    setStatus(undefined);

    try {
      await createUser({
        variables: {
          user: { username, password },
        },
      });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      setStatus(error.message || 'Unable to sign up. Please try again.');
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
