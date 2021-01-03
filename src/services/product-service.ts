import { v4 as uuidv4 } from 'uuid'
import { Product } from '../functions/add-product/add-product'
import { insertProduct } from '../data-access/product'

export async function addProduct(product: Product) {
  try {
    return await insertProduct({ ...product, _id: uuidv4() })
  } catch (e) {
    console.log(e)
    return false
  }
}
