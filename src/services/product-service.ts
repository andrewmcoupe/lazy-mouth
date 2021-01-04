import { v4 as uuidv4 } from 'uuid'
import { Product } from '../functions/add-product/add-product'
import { insertProduct, getProductById } from '../data-access/product'

export async function addProduct(product: Product) {
  try {
    return await insertProduct({ ...product, _id: uuidv4() })
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getProduct = async (id: string): Promise<Product | false> => {
  try {
    return await getProductById(id)
  } catch (e) {
    console.log(e)
    return false
  }
}
