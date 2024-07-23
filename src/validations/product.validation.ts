import Joi from 'joi'
import ProductInterface from '../types/product.type'

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}
