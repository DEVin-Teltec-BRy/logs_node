import * as Yup from 'yup'

const createPostValidation = Yup.object().shape({
  title: Yup.string().required('Titulo é obrigatório'),
  content: Yup.string().required('Titulo é obrigatório'),
  url_cover: Yup.string(),
  category_id: Yup.number().required('Categoria é obrigatória'),
  user_id: Yup.number().required('Usuario é obrigatório'),
});

export default createPostValidation;