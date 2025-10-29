import type { Express } from "express";
import { createServer, type Server } from "http";
import { usdHistory } from "./data/usd";
import { eurHistory } from "./data/eur";
import { arsHistory } from "./data/ars";
import type { CurrencyData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/currencies", (req, res) => {
    const calculateChange = (history: any[]) => {
      if (history.length < 2) return 0;
      const current = history[history.length - 1].value;
      const previous = history[history.length - 2].value;
      return ((current - previous) / previous) * 100;
    };

    const calculateBuySell = (currentValue: number) => {
      const spread = 0.02;
      return {
        buy: currentValue * (1 - spread),
        sell: currentValue * (1 + spread),
      };
    };

    const usdCurrent = usdHistory[usdHistory.length - 1].value;
    const eurCurrent = eurHistory[eurHistory.length - 1].value;
    const arsCurrent = arsHistory[arsHistory.length - 1].value;

    const currencies: CurrencyData[] = [
      {
        code: "USD",
        name: "Dólar Estadounidense",
        ...calculateBuySell(usdCurrent),
        change: calculateChange(usdHistory),
        history: usdHistory,
      },
      {
        code: "EUR",
        name: "Euro",
        ...calculateBuySell(eurCurrent),
        change: calculateChange(eurHistory),
        history: eurHistory,
      },
      {
        code: "ARS",
        name: "Peso Argentino",
        ...calculateBuySell(arsCurrent),
        change: calculateChange(arsHistory),
        history: arsHistory,
      },
    ];

    res.json(currencies);
  });

  const httpServer = createServer(app);

  return httpServer;
}
