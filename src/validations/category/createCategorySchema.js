import * as Yup from 'yup'

const createCategoryValidation = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório')
});

export default createCategoryValidation;