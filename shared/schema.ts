import { z } from "zod";

export const currencyQuoteSchema = z.object({
  time: z.string(),
  value: z.number(),
});

export const currencyDataSchema = z.object({
  code: z.string(),
  name: z.string(),
  buy: z.number(),
  sell: z.number(),
  change: z.number(),
  history: z.array(currencyQuoteSchema),
});

export type CurrencyQuote = z.infer<typeof currencyQuoteSchema>;
export type CurrencyData = z.infer<typeof currencyDataSchema>;
