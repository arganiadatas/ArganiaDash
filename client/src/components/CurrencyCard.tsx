import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Euro, Banknote } from "lucide-react";
import type { CurrencyData } from "@shared/schema";

interface CurrencyCardProps {
  currency: CurrencyData;
}

const getCurrencyIcon = (code: string) => {
  switch (code) {
    case "USD":
      return <DollarSign className="w-6 h-6" />;
    case "EUR":
      return <Euro className="w-6 h-6" />;
    case "ARS":
      return <Banknote className="w-6 h-6" />;
    default:
      return <DollarSign className="w-6 h-6" />;
  }
};

export function CurrencyCard({ currency }: CurrencyCardProps) {
  const isPositive = currency.change >= 0;

  return (
    <Card 
      className="p-6 space-y-4 hover-elevate transition-colors duration-200"
      data-testid={`card-currency-${currency.code.toLowerCase()}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-primary">
          {getCurrencyIcon(currency.code)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground" data-testid={`text-currency-name-${currency.code.toLowerCase()}`}>
            {currency.name}
          </h3>
          <p className="text-xs text-muted-foreground">{currency.code}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Compra
          </p>
          <p 
            className="text-2xl md:text-3xl font-bold tabular-nums text-foreground"
            data-testid={`text-buy-price-${currency.code.toLowerCase()}`}
          >
            ${currency.buy.toFixed(2)}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Venta
          </p>
          <p 
            className="text-2xl md:text-3xl font-bold tabular-nums text-foreground"
            data-testid={`text-sell-price-${currency.code.toLowerCase()}`}
          >
            ${currency.sell.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <div className={`flex items-center gap-1 ${isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium tabular-nums" data-testid={`text-change-${currency.code.toLowerCase()}`}>
            {isPositive ? "+" : ""}{currency.change.toFixed(2)}%
          </span>
        </div>
        <span className="text-xs text-muted-foreground">vs. día anterior</span>
      </div>
    </Card>
  );
}
