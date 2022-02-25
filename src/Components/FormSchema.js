import * as yup from 'yup'

const FormSchema = yup.object().shape({
    name: yup
        .string()
        .required('Must enter a name')
        .min(2, 'name must be at least 2 characters'),
    sauce: yup
        .string()
        .oneOf(['red sauce', 'buffalo', 'garlic']),
    size: yup
        .string()
        .oneOf(['small', 'medium', 'large', 'extra large']),
    chicken: yup.boolean(),
    bacon: yup.boolean(),
    grilled_peppers: yup.boolean(),
    grilled_onions: yup.boolean(),
})


export default FormSchema