import * as yup from 'yup';

export const paymentValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  group_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
