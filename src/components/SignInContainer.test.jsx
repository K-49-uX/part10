import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import SignInContainer from './SignInContainer';

describe('SignInContainer', () => {
  it('calls onSubmit with the entered username and password', async () => {
    const onSubmit = jest.fn();
    await render(<SignInContainer onSubmit={onSubmit} />);

    await fireEvent.changeText(screen.getByPlaceholderText('Username'), 'test-user');
    await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
    await fireEvent.press(screen.getByText('Sign in'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'test-user',
        password: 'password123',
      });
    });
  });
});
