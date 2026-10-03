import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: '#24292e',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 2,
  },
  submitError: {
    color: '#d73a4a',
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    minHeight: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const renderInput = (name, placeholder, props = {}) => {
    const hasError = formik.touched[name] && formik.errors[name];

    return (
      <View key={name}>
        <TextInput
          style={[styles.input, hasError && styles.inputError]}
          placeholder={placeholder}
          value={formik.values[name]}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          {...props}
        />
        {hasError ? <Text style={styles.errorText}>{formik.errors[name]}</Text> : null}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {renderInput('username', 'Username', {
        autoCapitalize: 'none',
        autoComplete: 'username',
      })}
      {renderInput('password', 'Password', {
        secureTextEntry: true,
        autoComplete: 'new-password',
      })}
      {renderInput('passwordConfirmation', 'Password confirmation', {
        secureTextEntry: true,
        autoComplete: 'new-password',
      })}

      <Pressable style={styles.button} onPress={formik.handleSubmit} disabled={formik.isSubmitting}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      {formik.status ? (
        <Text accessibilityRole="alert" style={styles.submitError}>
          {formik.status}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default SignUpContainer;
