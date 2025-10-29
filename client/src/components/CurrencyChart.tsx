import { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";
import type { CurrencyQuote } from "@shared/schema";

interface CurrencyChartProps {
  currencyName: string;
  currencyCode: string;
  data: CurrencyQuote[];
}

export function CurrencyChart({ currencyName, currencyCode, data }: CurrencyChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const areaSeriesRef = useRef<ReturnType<ReturnType<typeof createChart>["addSeries"]> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");
    
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDark ? "#d1d5db" : "#374151",
      },
      width: chartContainerRef.current.clientWidth,
      height: 384,
      grid: {
        vertLines: { color: isDark ? "#1f2937" : "#e5e7eb" },
        horzLines: { color: isDark ? "#1f2937" : "#e5e7eb" },
      },
      rightPriceScale: {
        borderColor: isDark ? "#374151" : "#d1d5db",
      },
      timeScale: {
        borderColor: isDark ? "#374151" : "#d1d5db",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: {
          color: isDark ? "#6b7280" : "#9ca3af",
          width: 1,
          style: 1,
          labelBackgroundColor: isDark ? "#3b82f6" : "#2563eb",
        },
        horzLine: {
          color: isDark ? "#6b7280" : "#9ca3af",
          width: 1,
          style: 1,
          labelBackgroundColor: isDark ? "#3b82f6" : "#2563eb",
        },
      },
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: isDark ? "#3b82f6" : "#2563eb",
      topColor: isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(37, 99, 235, 0.4)",
      bottomColor: isDark ? "rgba(59, 130, 246, 0.0)" : "rgba(37, 99, 235, 0.0)",
      lineWidth: 2,
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.01,
      },
    });

    const chartData = data.map((quote) => ({
      time: quote.time as any,
      value: quote.value,
    }));

    areaSeries.setData(chartData);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    areaSeriesRef.current = areaSeries;

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkNow = document.documentElement.classList.contains("dark");
          if (chartRef.current) {
            chartRef.current.applyOptions({
              layout: {
                textColor: isDarkNow ? "#d1d5db" : "#374151",
              },
              grid: {
                vertLines: { color: isDarkNow ? "#1f2937" : "#e5e7eb" },
                horzLines: { color: isDarkNow ? "#1f2937" : "#e5e7eb" },
              },
              rightPriceScale: {
                borderColor: isDarkNow ? "#374151" : "#d1d5db",
              },
              timeScale: {
                borderColor: isDarkNow ? "#374151" : "#d1d5db",
              },
            });
          }
          
          if (areaSeriesRef.current) {
            areaSeriesRef.current.applyOptions({
              lineColor: isDarkNow ? "#3b82f6" : "#2563eb",
              topColor: isDarkNow ? "rgba(59, 130, 246, 0.4)" : "rgba(37, 99, 235, 0.4)",
              bottomColor: isDarkNow ? "rgba(59, 130, 246, 0.0)" : "rgba(37, 99, 235, 0.0)",
            });
          }
        }
      });
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      chart.remove();
    };
  }, [data]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-semibold text-foreground" data-testid={`text-chart-title-${currencyCode.toLowerCase()}`}>
          {currencyName} - Histórico
        </h3>
        <span className="text-xs text-muted-foreground">{currencyCode}</span>
      </div>
      <div 
        ref={chartContainerRef} 
        className="w-full rounded-md border border-border bg-card overflow-hidden"
        data-testid={`chart-${currencyCode.toLowerCase()}`}
      />
    </div>
  );
}
