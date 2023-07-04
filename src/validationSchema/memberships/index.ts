import * as yup from 'yup';

export const membershipValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  group_id: yup.string().nullable(),
});
