# Dashboard de Cotizaciones de Divisas

Aplicación web para visualizar las cotizaciones del Dólar Estadounidense (USD), Euro (EUR) y Peso Argentino (ARS) con precios de compra/venta y gráficos históricos.

## Características

- **Tarjetas de Cotizaciones**: Muestra precios de compra y venta actualizados para cada divisa
- **Gráficos Interactivos**: Visualización de datos históricos con gráficos estilo TradingView
- **Modo Oscuro**: Soporte completo para tema claro y oscuro
- **Responsive**: Diseño adaptable a móviles, tablets y desktop
- **Interfaz en Español**: Toda la interfaz está en español

## Estructura del Proyecto

```
├── client/                      # Frontend React
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── CurrencyCard.tsx    # Tarjeta de cotización
│   │   │   ├── CurrencyChart.tsx   # Gráfico de TradingView
│   │   │   └── ThemeToggle.tsx     # Toggle de tema oscuro/claro
│   │   └── pages/
│   │       └── Dashboard.tsx       # Página principal
│   └── index.html              # HTML principal
├── server/                      # Backend Express
│   ├── data/                   # Archivos de datos de cotizaciones
│   │   ├── usd.ts             # Datos históricos del Dólar
│   │   ├── eur.ts             # Datos históricos del Euro
│   │   └── ars.ts             # Datos históricos del Peso Argentino
│   └── routes.ts              # API endpoints
└── shared/
    └── schema.ts              # Tipos TypeScript compartidos
```

## Cómo Agregar Nuevas Cotizaciones

Para agregar cotizaciones diarias, edita los archivos en `server/data/`:

### 1. Dólar (server/data/usd.ts)

```typescript
export const usdHistory: CurrencyQuote[] = [
  { time: "2025-10-23", value: 40.23 },
  { time: "2025-10-24", value: 40.25 },
  // ... cotizaciones existentes
  { time: "2025-10-29", value: 40.35 },  // ← Agrega la nueva cotización aquí
];
```

### 2. Euro (server/data/eur.ts)

```typescript
export const eurHistory: CurrencyQuote[] = [
  { time: "2025-10-23", value: 46.68 },
  { time: "2025-10-24", value: 46.71 },
  // ... cotizaciones existentes
  { time: "2025-10-29", value: 46.75 },  // ← Agrega la nueva cotización aquí
];
```

### 3. Peso Argentino (server/data/ars.ts)

```typescript
export const arsHistory: CurrencyQuote[] = [
  { time: "2025-10-23", value: 36.77 },
  { time: "2025-10-24", value: 37.07 },
  // ... cotizaciones existentes
  { time: "2025-10-29", value: 36.80 },  // ← Agrega la nueva cotización aquí
];
```

### Formato de los Datos

- **time**: Fecha en formato "YYYY-MM-DD"
- **value**: Valor de cotización (número decimal)

**Importante**: El sistema toma automáticamente el **último valor** del array (la fecha más reciente) para mostrar en las tarjetas de compra/venta.

## Cálculo de Precios

El backend calcula automáticamente:

- **Precio de Compra**: Valor actual - 2% (spread de 0.02)
- **Precio de Venta**: Valor actual + 2% (spread de 0.02)
- **Cambio porcentual**: Comparación entre el último valor y el penúltimo

Puedes ajustar el spread editando la función `calculateBuySell` en `server/routes.ts`.

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Gráficos**: TradingView Lightweight Charts v5.0
- **Backend**: Express.js, TypeScript
- **Estado**: TanStack Query (React Query)
- **Routing**: Wouter

## Desarrollo

El proyecto usa una configuración fullstack con Vite:

```bash
npm run dev
```

Esto inicia:
- Backend Express en puerto 5000
- Frontend Vite HMR (Hot Module Replacement)

## API Endpoint

### GET /api/currencies

Retorna todas las divisas con sus datos históricos y precios actuales:

```json
[
  {
    "code": "USD",
    "name": "Dólar Estadounidense",
    "buy": 39.43,
    "sell": 41.01,
    "change": 0.25,
    "history": [
      { "time": "2025-10-23", "value": 40.23 },
      ...
    ]
  },
  ...
]
```

## Notas de Diseño

- Las fuentes Inter y Roboto Mono se usan para óptima legibilidad de datos numéricos
- Los números usan `tabular-nums` para alineación perfecta
- Los gráficos se adaptan automáticamente al tema oscuro/claro
- Diseño basado en Material Design para dashboards financieros

## Próximas Mejoras Sugeridas

- Integración con API real de cotizaciones
- Histórico más extenso (30, 60, 90 días)
- Selector de rango de fechas
- Exportación de datos a CSV/Excel
- Alertas de precio
- Múltiples divisas adicionales
