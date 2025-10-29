# Design Guidelines: Currency Exchange Rate Dashboard

## Design Approach

**Selected Approach:** Design System - Material Design
**Justification:** This is a utility-focused, data-heavy financial dashboard requiring clarity, precision, and professional presentation. Material Design provides excellent patterns for data visualization and card-based layouts suitable for financial applications.

**Reference Inspiration:** Modern financial dashboards (TradingView, Coinbase, Bloomberg Terminal) - emphasizing clean data presentation, hierarchical information architecture, and professional aesthetics.

## Core Design Principles

1. **Data First:** Information hierarchy prioritizes numerical accuracy and readability
2. **Scanability:** Users should quickly compare rates across currencies
3. **Professional Trust:** Clean, structured layout conveys reliability
4. **Responsive Density:** Optimal information density without overwhelming

## Typography System

**Font Family:** 
- Primary: 'Inter' or 'Roboto' (Google Fonts) - excellent for numerical data
- Monospace: 'Roboto Mono' for currency values and prices

**Hierarchy:**
- Page Title: text-3xl font-bold (Dashboard header)
- Currency Labels: text-xl font-semibold (USD, EUR, ARS)
- Price Labels: text-sm font-medium uppercase tracking-wide (COMPRA, VENTA)
- Price Values: text-2xl md:text-3xl font-bold tabular-nums (actual prices)
- Chart Titles: text-lg font-semibold
- Metadata: text-xs (timestamps, last updated)

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, and 8
- Component padding: p-6
- Section spacing: space-y-8
- Card internal spacing: space-y-4
- Grid gaps: gap-4 md:gap-6

**Container Structure:**
- Main container: max-w-7xl mx-auto px-4
- Full viewport width utilization for charts
- Responsive breakpoints at md: and lg:

## Component Architecture

### Page Layout Structure

**Header Section:**
- Full-width container with page title
- Last updated timestamp
- Padding: py-6

**Currency Cards Grid:**
- Desktop: 3-column grid (grid-cols-1 md:grid-cols-3)
- Mobile: Single column stack
- Cards display: Currency name, buy price, sell price, percentage change indicator
- Card elevation with subtle shadow
- Padding: p-6
- Border radius: rounded-lg

**Card Internal Structure:**
```
- Currency Icon/Flag (24x24px) + Currency Name
- Buy Section:
  - Label: "Compra"
  - Price value (large, bold, tabular numerals)
- Sell Section:
  - Label: "Venta"  
  - Price value (large, bold, tabular numerals)
- Change Indicator (small, with arrow icon)
```

**Charts Section:**
- Each currency gets dedicated chart container
- Chart title above each graph
- Full-width responsive containers
- Vertical spacing between charts: space-y-8
- Chart height: Fixed at h-96 for consistency

### Navigation & Controls

**Top Bar:**
- Simple horizontal layout
- Title on left
- Utility info on right (last updated)
- Border bottom separator

### Data Display Components

**Price Cards:**
- Structured grid layout within each card
- Clear label-value pairs
- Tabular numerals for price alignment
- Prominent visual separation between buy/sell

**Chart Containers:**
- Canvas/container for TradingView library
- Minimal chrome - focus on data
- Responsive width, fixed height
- Currency identifier clearly labeled

### Interactive Elements

**Buttons/Links:** (if needed for future expansion)
- Medium size: px-4 py-2
- Border radius: rounded-md
- Font weight: font-medium

## Responsive Behavior

**Mobile (base):**
- Single column currency cards
- Full-width charts
- Reduced padding: p-4
- Smaller typography scale

**Tablet (md:):**
- 2-column card grid
- Increased spacing
- Standard typography

**Desktop (lg:):**
- 3-column card grid
- Maximum spacing and padding
- Full typography hierarchy

## Layout Composition

**Vertical Flow:**
1. Header section (py-6)
2. Currency cards grid (py-8)
3. Charts section with individual currency charts (py-8 each)
4. Footer with data source attribution (py-6)

**Horizontal Organization:**
- Centered content with max-width constraint
- Consistent horizontal padding throughout
- Grid-based card arrangement for visual balance

## Accessibility Considerations

- High contrast for numerical data
- Tabular numerals for price alignment
- Clear label associations
- Keyboard navigation support
- ARIA labels for chart containers
- Semantic HTML structure (header, main, section)

## Icons

**Library:** Heroicons (via CDN)
- Currency icons/flags for visual identification
- Arrow icons for percentage change (up/down)
- Calendar/clock icon for timestamp
- Minimal, functional usage only

## Animation Guidelines

**Minimal Motion:**
- Subtle transitions on card hover (if any): transition-colors duration-200
- No chart animations beyond TradingView defaults
- Focus on stability and data clarity

## Special Considerations

**Financial Data Presentation:**
- Always use tabular-nums for numerical alignment
- Consistent decimal places across all prices
- Clear visual hierarchy: currency > buy/sell label > price value
- Percentage changes should have directional indicators
- Timestamps in Spanish format: "Última actualización: DD/MM/YYYY HH:mm"

**Chart Integration:**
- TradingView lightweight charts library
- Consistent styling across all three charts
- Clear x-axis (dates) and y-axis (prices) labels
- Grid lines for easier reading
- No unnecessary decorative elements

This dashboard prioritizes **clarity, precision, and professional presentation** suitable for financial data monitoring.