import * as Yup from 'yup';

export const signupFormSchemaValidator = Yup.object({
  email: Yup.string()
    .required('Required Field')
    .matches(/^.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid Email'),
  name: Yup.string()
    .required('Required Field')
    .min(3)
    .max(40)
    .transform((o, v: string) => v.trim()),
  username: Yup.string()
    .required('Required Field')
    .min(3)
    .max(30)
    .transform((o, v: string) => v.trim()),
  password: Yup.string()
    .required('Required Field')
    .min(8)
    .matches(/[A-Z]+/, 'Password Must Contains At least 1 upper case character')
    .matches(/[a-z]+/, 'Password Must Contains At least 1 lower case character')
    .matches(/[0-9]+/, 'password must contain strings')
    .matches(/(?=.*[@$!%*#?&])/, 'password must symbolize')
    .transform((o, v: string) => v.trim()),
  gender: Yup.string()
    .required('Required Field')
    .oneOf(['MALE', 'FEMALE'], 'Are U male? female? freak?'),
  year: Yup.string().required('Required Field').not(['year'], 'year Required.'),
  month: Yup.string()
    .required('Required Field')
    .not(['month'], 'month Required.'),
  day: Yup.string().required('Required Field').not(['day'], 'day Required.'),
  conditions: Yup.boolean().required('Required Field'),
});
