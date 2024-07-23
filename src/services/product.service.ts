import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import ProductInterface from '../types/product.type'

export const addProductToDB = async (payload: ProductInterface) => {
  return await productModel
    .create(payload)
}

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('error get product')
      logger.error(error)
    })
}
