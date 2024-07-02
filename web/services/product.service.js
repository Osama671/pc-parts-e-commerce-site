import { getAuth } from '../utils/auth.js'

export const getProduct = async (id) => {
  const headers = {
    Authorization: getAuth(),
  }
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    headers,
  })
  return response.json()
}

export default { getProduct }
