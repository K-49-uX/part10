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
  reviewInput: {
    minHeight: 64,
    textAlignVertical: 'top',
    paddingTop: 15,
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Rating must be a number')
    .required('Rating is required')
    .integer('Rating must be a whole number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const CreateReviewContainer = ({ onSubmit }) => {
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
          style={[styles.input, hasError && styles.inputError, props.multiline && styles.reviewInput]}
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
      {renderInput('ownerName', 'Repository owner name', { autoCapitalize: 'none' })}
      {renderInput('repositoryName', 'Repository name', { autoCapitalize: 'none' })}
      {renderInput('rating', 'Rating between 0 and 100', { keyboardType: 'numeric' })}
      {renderInput('text', 'Review', { multiline: true })}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
      {formik.status ? (
        <Text accessibilityRole="alert" style={styles.submitError}>
          {formik.status}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default CreateReviewContainer;
