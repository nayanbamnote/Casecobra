'use server'

import { BASE_PRICE, MATERIALS, FINISHES  } from '@/app/constants/constant'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { Order } from '@prisma/client'
import { currentUser } from "@clerk/nextjs/server";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string
}) => {
  const configuration = await db.nayan.findUnique({
    where: { id: configId },
  })

  if (!configuration) {
    throw new Error('No such configuration found')
  }

    const user = await currentUser()
    console.log(user)


  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { finish, material } = configuration

  let price = BASE_PRICE
  if (finish === 'textured') price += FINISHES.options[1].price
  if (material === 'polycarbonate')
    price += MATERIALS.options[1].price

  let order: Order | undefined = undefined

  const existingOrder = await db.order.findFirst({
    where: {
      // userId: user.id,
      clerkId: user.id,
      configurationId: configuration.id,
    },
  })

  console.log(user.id, configuration.id)

  if (existingOrder) {
    order = existingOrder
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: null,
        clerkId: user.id,
        configurationId: configuration.id,
      },
    })
  }

  const product = await stripe.products.create({
    name: 'Custom iPhone Case',
    images: [configuration.croppedImageUrl!],
    default_price_data: {
      currency: 'USD',
      unit_amount: price,
    },
  })

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: {
      clerkId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  })

  return { url: stripeSession.url }
}