import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import CreateReviewContainer from './CreateReviewContainer';

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values, { setStatus }) => {
    setStatus(undefined);

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text || undefined,
          },
        },
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      setStatus(error.message || 'Unable to create the review. Please try again.');
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
