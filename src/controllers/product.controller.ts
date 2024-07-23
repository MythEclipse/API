import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import { addProductToDB, getProductFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import ProductInterface from '../types/product.type'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERROR = product create', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  try {
    await addProductToDB(value)
    logger.info('success post product')
    return res.status(201).send({ status: true, statusCode: 200, message: 'Add product success' })
  } catch (error) {
    logger.error('ERROR = product create', error)
    return res.status(422).send({ status: false, statusCode: 422, message: 'Add product failed' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()
  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product: ProductInterface) => {
      if (product.name === name) {
        return product
      }
    })
    if (filterProduct.length === 0) {
      logger.error('ERROR = product not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Product not found', data: {} })
    }
    logger.info('success get product')
    return res.status(200).send({ status: true, statusCode: 200, data: filterProduct })
  }

  logger.info('success get product')
  return res.status(200).send({ status: true, statusCode: 200, data: products })
}
