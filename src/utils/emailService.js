import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const ORDER_CONFIRM_TEMPLATE = import.meta.env.VITE_EMAILJS_ORDER_CONFIRM_TEMPLATE
const NEW_ORDER_TEMPLATE = import.meta.env.VITE_EMAILJS_NEW_ORDER_TEMPLATE
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Send order confirmation to buyer
export const sendOrderConfirmation = async ({ buyerName, buyerEmail, buyerPhone, productName, amount, orderId, isDigital, downloadLink }) => {
  try {
    await emailjs.send(SERVICE_ID, ORDER_CONFIRM_TEMPLATE, {
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      buyer_phone: buyerPhone || 'N/A',
      product_name: productName,
      amount: amount.toLocaleString(),
      order_id: orderId,
      is_digital: isDigital ? 'true' : '',
      is_physical: !isDigital ? 'true' : '',
      download_link: downloadLink || '',
    }, PUBLIC_KEY)
    return { success: true }
  } catch (err) {
    console.error('Email error:', err)
    return { success: false }
  }
}

// Send new order notification to seller
export const sendNewOrderToSeller = async ({ sellerName, sellerEmail, buyerEmail, buyerPhone, productName, amount, orderId, isDigital, deliveryAddress }) => {
  try {
    await emailjs.send(SERVICE_ID, NEW_ORDER_TEMPLATE, {
      seller_name: sellerName,
      seller_email: sellerEmail,
      buyer_email: buyerEmail,
      buyer_phone: buyerPhone || 'N/A',
      product_name: productName,
      amount: amount.toLocaleString(),
      order_id: orderId,
      is_digital: isDigital ? 'true' : '',
      is_physical: !isDigital ? 'true' : '',
      delivery_address: deliveryAddress || 'N/A',
    }, PUBLIC_KEY)
    return { success: true }
  } catch (err) {
    console.error('Email error:', err)
    return { success: false }
  }
}
