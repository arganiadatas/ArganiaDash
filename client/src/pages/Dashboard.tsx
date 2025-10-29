import { useQuery } from "@tanstack/react-query";
import { CurrencyCard } from "@/components/CurrencyCard";
import { CurrencyChart } from "@/components/CurrencyChart";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Clock } from "lucide-react";
import type { CurrencyData } from "@shared/schema";

export default function Dashboard() {
  const { data: currencies, isLoading } = useQuery<CurrencyData[]>({
    queryKey: ["/api/currencies"],
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getLastUpdateTime = () => {
    if (!currencies || currencies.length === 0) return "";
    const lastQuote = currencies[0].history[currencies[0].history.length - 1];
    return lastQuote ? formatDate(lastQuote.time) : "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <header className="py-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="h-9 w-64 bg-muted animate-pulse rounded-md"></div>
              <ThemeToggle />
            </div>
          </header>
          <main className="py-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-card border border-card-border rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-card border border-card-border rounded-lg animate-pulse"></div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <header className="py-6 border-b border-border">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
                Cotizaciones de Divisas
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground" data-testid="text-last-update">
                  Última actualización: {getLastUpdateTime()}
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="py-8 space-y-8">
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currencies?.map((currency) => (
                <CurrencyCard key={currency.code} currency={currency} />
              ))}
            </div>
          </section>

          <section className="space-y-8">
            {currencies?.map((currency) => (
              <CurrencyChart
                key={currency.code}
                currencyName={currency.name}
                currencyCode={currency.code}
                data={currency.history}
              />
            ))}
          </section>
        </main>

        <footer className="py-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Los datos son referenciales y pueden variar según la fuente consultada
          </p>
        </footer>
      </div>
    </div>
  );
}
