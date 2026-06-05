# DESIGN.md — Identidad Visual Laureles Campestre

## Referencia: Identidad Mizar

**Logo:** Mizar (tipografía + elemento gráfico)
**Colores principales:**
- Rojo/Magenta: #E74C3C (o similar, según kit)
- Azul oscuro: #0a2342
- Blanco: #ffffff

**Principio:** Confianza + Calidez + Urgencia

---

## Paleta Laureles Campestre (OPTIMIZADA)

### Colores Principales

```
NAVY (Fondos, títulos)
  Color:     #1a3a3e
  Uso:       Hero, secciones principales, h1-h2
  Lumin:     ~15%
  
ROJO MIZAR (CTAs principales, urgencia)
  Color:     #E74C3C (o #D63D2D según kit Mizar)
  Uso:       Botones de acción critica, alerts
  Lumin:     ~40%
  Nota:      Reemplaza el Teal anterior como CTA principal
  
VERDE LAURELES (Secundario, identidad local)
  Color:     #2d5a2e
  Uso:       Fondos alternados, bordes, acentos
  Lumin:     ~18%
  
DORADO (Lujo, acentos de valor)
  Color:     #d4af5c
  Uso:       Números grandes, highlights, premium messaging
  Lumin:     ~58%
  
CREMA (Fondos limpios)
  Color:     #faf9f7
  Uso:       Fondos de secciones, espacios respirable
  Lumin:     ~98%
  
GRIS OSCURO (Textos primarios)
  Color:     #5a5a5a
  Uso:       Body text, párrafos, descripciones
  Lumin:     ~35%
  
GRIS CLARO (Bordes, dividers)
  Color:     #e8e8e8
  Uso:       Bordes de cards, líneas separadoras
  Lumin:     ~91%
  
BLANCO (Máximo contraste)
  Color:     #ffffff
  Uso:       Texto sobre Navy, fondos puros
  Lumin:     ~100%
```

### Matriz de Aplicación

| Elemento | Color | Hover | Texto |
|----------|-------|-------|-------|
| **Hero BG** | Navy | - | Blanco |
| **CTA Principal** | Rojo Mizar | Rojo oscuro | Blanco |
| **CTA Secundaria** | Verde Laureles | Verde oscuro | Blanco |
| **Card BG** | Blanco | Crema | Gris oscuro |
| **Sección Alterna** | Crema | - | Gris oscuro |
| **Títulos (H1-H3)** | Navy | - | - |
| **Body Text** | Gris oscuro | - | - |
| **Bordes** | Gris claro | - | - |
| **Números/Stats** | Dorado | - | - |

---

## Tipografía

### Serif (Display)
- **Familia:** Playfair Display
- **Pesos:** 400 (regular), 700 (bold), 900 (heavy)
- **Uso:** H1, H2, headings principales, titulares emocionales
- **Tamaño desktop:** H1 = 48-60px, H2 = 36-42px, H3 = 24-28px
- **Tamaño móvil:** H1 = 32-36px, H2 = 24-28px, H3 = 18-22px

### Sans-Serif (Body)
- **Familia:** DM Sans
- **Pesos:** 400 (regular), 500 (medium), 600 (semibold)
- **Uso:** Body text, CTAs, labels, descripciones
- **Tamaño:** 14px (mobile small), 16px (body), 18px (body large), 20px (subtítulos)

### Jerarquía
```
H1 (Playfair 48-60px bold)  — Promesa principal
  Subheadline (DM Sans 18-20px) — Benefit statement
  
H2 (Playfair 36-42px)       — Títulos de sección
H3 (DM Sans 20px semibold)  — Subtítulos de cards
Body (DM Sans 16px)         — Párrafos
  Caption (DM Sans 14px)    — Descripciones, notas
```

---

## Componentes Base

### Botones

**Primary (Rojo Mizar)**
```
Background: #E74C3C
Text: Blanco
Padding: 12px 32px (desktop), 12px 24px (móvil)
Border radius: 8px
Font: DM Sans 16px semibold
Min height: 48px (accesibilidad)
Hover: #D63D2D (rojo oscuro)
Shadow: 0 4px 12px rgba(231, 76, 60, 0.2)
```

**Secondary (Verde Laureles)**
```
Background: #2d5a2e
Text: Blanco
Padding: 12px 32px
Border radius: 8px
Font: DM Sans 16px semibold
Min height: 48px
Hover: #1d3a1e (verde oscuro)
Shadow: 0 4px 12px rgba(45, 90, 46, 0.15)
```

**Tertiary (Navy Border)**
```
Background: Transparente
Border: 2px Navy #1a3a3e
Text: Navy
Padding: 10px 30px
Border radius: 8px
Font: DM Sans 16px semibold
Hover: Fondo Navy 10% opacidad
```

### Cards

```
Background: Blanco (#ffffff)
Border: 1px #e8e8e8
Border radius: 12px
Padding: 24px
Shadow: 0 4px 12px rgba(26, 58, 62, 0.08)
Hover shadow: 0 8px 20px rgba(231, 76, 60, 0.15)
Transition: 300ms ease
```

### Secciones

**Hero**
```
BG: Navy #1a3a3e con overlay oscuro 70%
Min height: 100vh (desktop), 80vh (móvil)
Text: Blanco
CTA: Rojo Mizar (botón grande)
```

**Alternadas**
```
Par: Crema #faf9f7
Impar: Blanco #ffffff
Padding: 80px 24px (desktop), 60px 20px (móvil)
Max width: 1280px
```

**Oscuras**
```
BG: Navy #1a3a3e
Text: Blanco
CTA: Rojo Mizar o Verde (según contexto)
```

---

## Iconografía

**Sistema:** Lucide React
**Tamaño:** 
- Micro: 16px
- Normal: 24px
- Large: 32px
- XL: 48px

**Color:**
- Sobre Navy: Blanco o Rojo
- Sobre Crema: Navy o Rojo
- Sobre Blanco: Navy o Rojo

**Uso:** Ubicación, apartamentos, dinero, seguridad, gente, etc.

---

## Espaciado (Escala)

```
xs: 4px   (borders, minimal spacing)
sm: 8px   (padding pequeño, gaps)
md: 16px  (padding normal, margins)
lg: 24px  (section padding)
xl: 32px  (large spacing)
2xl: 48px (generous spacing)
```

---

## Breakpoints

```
Mobile:  < 640px  (default)
Tablet:  640px - 1024px
Desktop: > 1024px
```

---

## Sombras

```
Shadow-sm:  0 2px 4px rgba(26, 58, 62, 0.04)
Shadow-md:  0 4px 12px rgba(26, 58, 62, 0.08)
Shadow-lg:  0 8px 20px rgba(26, 58, 62, 0.15)
Shadow-red: 0 4px 12px rgba(231, 76, 60, 0.2)
```

---

## Referencias Visuales

**Logo:** Mizar (rojo/magenta + blue)
**Inspiración paleta:** Mizar.com.co
**Inspiración flujo:** 30x.com/inmersivo30x
**Componentes UI:** shadcn/ui con custom Tailwind tokens

---

## CSS Variables (Tailwind)

```css
:root {
  --color-navy: #1a3a3e;
  --color-rojo: #E74C3C;
  --color-verde: #2d5a2e;
  --color-dorado: #d4af5c;
  --color-crema: #faf9f7;
  --color-gris-oscuro: #5a5a5a;
  --color-gris-claro: #e8e8e8;
  
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'DM Sans', sans-serif;
  
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

---

## Cambios vs. Análisis Anterior

| Elemento | Anterior | Ahora | Razón |
|----------|----------|-------|-------|
| **CTA Principal** | Teal #00a896 | Rojo Mizar #E74C3C | Identidad Mizar, mayor urgencia |
| **Secundaria** | Verde Laureles | Se mantiene | Identidad local |
| **Navy** | Color alternativo | Principal | Profesionalismo, confianza |
| **Estructura** | 8 colores | 8 colores (rebalanceados) | Claridad, menos confusión |

---

## Próximos Pasos

1. ✅ Revisar paleta con kit de diseño Mizar
2. 🔜 Incorporar logo Mizar (si aplica) en footer/branding
3. 🔜 Actualizar tailwind.config.js con Rojo en lugar de Teal
4. 🔜 Reimplementar Hero, Botones, CTAs con Rojo
5. 🔜 Testing visual en desktop + móvil
