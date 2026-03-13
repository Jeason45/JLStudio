import type { Order } from '@/types/ecommerce'
import { formatPrice } from '@/types/ecommerce'

// Uses Resend if configured, otherwise logs to console
const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com'

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[Email] To: ${to}, Subject: ${subject}`)
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })
}

export async function sendOrderConfirmation(order: Order) {
  const itemsHtml = order.items.map(i =>
    `<tr><td>${i.name}${i.variantLabel ? ` (${i.variantLabel})` : ''}</td><td>x${i.quantity}</td><td>${formatPrice(i.price * i.quantity, order.currency)}</td></tr>`
  ).join('')

  const html = `
    <h1>Confirmation de commande #${order.orderNumber}</h1>
    <table>${itemsHtml}</table>
    <p><strong>Sous-total :</strong> ${formatPrice(order.subtotal, order.currency)}</p>
    ${order.shipping ? `<p><strong>Livraison :</strong> ${formatPrice(order.shipping, order.currency)}</p>` : ''}
    ${order.tax ? `<p><strong>Taxes :</strong> ${formatPrice(order.tax, order.currency)}</p>` : ''}
    ${order.discount ? `<p><strong>Remise :</strong> -${formatPrice(order.discount, order.currency)}</p>` : ''}
    <p><strong>Total :</strong> ${formatPrice(order.total, order.currency)}</p>
  `

  await sendEmail(order.email, `Commande #${order.orderNumber} confirmée`, html)
}

export async function sendShippingNotification(order: Order, trackingNumber: string) {
  const html = `
    <h1>Votre commande #${order.orderNumber} a été expédiée</h1>
    <p>Numéro de suivi : <strong>${trackingNumber}</strong></p>
  `
  await sendEmail(order.email, `Commande #${order.orderNumber} expédiée`, html)
}

export async function sendDigitalProductDelivery(order: Order, downloadLinks: { name: string; url: string }[]) {
  const linksHtml = downloadLinks.map(l =>
    `<li><a href="${l.url}">${l.name}</a></li>`
  ).join('')

  const html = `
    <h1>Vos produits numériques — Commande #${order.orderNumber}</h1>
    <ul>${linksHtml}</ul>
  `
  await sendEmail(order.email, `Vos téléchargements — Commande #${order.orderNumber}`, html)
}
