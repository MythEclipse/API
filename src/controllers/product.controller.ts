import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import { getProductFromDB } from '../services/product.service'

interface ProductType {
  product_id: string
  name: string
  price: number
  size: string
}

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERROR = product create', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  logger.info('success post product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value })
}

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()
  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product: ProductType) => {
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
