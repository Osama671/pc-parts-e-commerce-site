import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DisplayOrderProducts from '../components/DisplayOrderProducts.jsx'

export default function Success() {
  const [searchParams] = useSearchParams()
  const [orderProducts, setOrderProducts] = useState()
  const orderId = searchParams.get('orderId')
  console.log(orderId)

  // useEffect(() => {
  //   const getOrderInfo = async () => {
  //     await getOrderById(orderId).then((orderInfo) => setOrderProducts(orderInfo))
  //   }
  //   getOrderInfo()
  // }, [orderId])
  return (
    <div className="container py-3">
      <h3 className="h3 text-center mt-4">
        Hooray!! Your order has been placed!
      </h3>
      <div className="  ">
        <h3 className="h3 mt-8">Order Summary</h3>
        <p className="fs-4">
          Your order ID: <strong className="order-id fs-4">ABC12356</strong>
        </p>

        <ul className="order-items p-0"></ul>
        <DisplayOrderProducts products={orderProducts} />
      </div>
    </div>
  )
}
