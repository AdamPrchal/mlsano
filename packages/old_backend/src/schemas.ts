import { z } from '@hono/zod-openapi'
import { Prisma } from '@prisma/client'

export const ProductCreateInput = z.object({
  slug: z
    .string()
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().max(100),
  description: z.string().max(1000),
  price: z
    .instanceof(Prisma)
    .refine((price) => price.gte('0.01') && price.lt('1000000.00')),
}) satisfies z.Schema<Prisma.ProductUncheckedCreateInput>
