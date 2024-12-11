import z from 'zod'

export const ZId = z.string().cuid2();