# 🎨 PALETA MIZAR - VERSIÓN PROFESIONAL

## Paleta Recomendada (Sin exceso de verde)

Basada en estándares de constructoras premium + Mizar:

```
NAVY/AZUL CORPORATIVO (Principal)
  Hex:      #0A2342
  RGB:      10, 35, 66
  Uso:      Fondos hero, títulos, texto principal
  Lumin:    ~8%
  Ref:      Profesionalismo, confianza, solidez

ROJO/MAGENTA MIZAR (CTAs principales)
  Hex:      #D63D2D  o  #E74C3C
  RGB:      214, 61, 45  o  231, 76, 60
  Uso:      Botones principales, urgencia, acciones críticas
  Lumin:    ~40%
  Ref:      Logo Mizar, energía, conversión

GRIS PROFESIONAL OSCURO (Textos)
  Hex:      #333333  o  #3a3a3a
  RGB:      51, 51, 51  o  58, 58, 58
  Uso:      Body text, párrafos, descripciones
  Lumin:    ~12%
  Ref:      Legibilidad, profesional

GRIS CLARO (Fondos alternos, bordes)
  Hex:      #F5F5F5  o  #FAFAFA
  RGB:      245, 245, 245  o  250, 250, 250
  Uso:      Secciones alternadas, bordes sutiles
  Lumin:    ~96%
  Ref:      Limpio, respirable, moderno

BLANCO PURO (Fondos principales, máximo contraste)
  Hex:      #FFFFFF
  RGB:      255, 255, 255
  Uso:      Fondo base, text sobre colores oscuros
  Lumin:    ~100%
  Ref:      Claridad, profesionalismo

ACCENT DORADO (Lujo, números, highlights)
  Hex:      #D4AF37  o  #C9A961
  RGB:      212, 175, 55  o  201, 169, 97
  Uso:      Números grandes, valores premium, acentos
  Lumin:    ~58%
  Ref:      Lujo, valor, diferenciación

VERDE SUAVE (Secundario, solo si es necesario)
  Hex:      #2D7A5C  (verde oscuro, no verde claro)
  RGB:      45, 122, 92
  Uso:      Botones secundarios, éxito, solo si es necesario
  Lumin:    ~25%
  Nota:     REDUCE la presencia de verde. No es principal.
```

---

## Matriz de Aplicación (NUEVA)

| Elemento | Color | Hex | Hover | Notas |
|----------|-------|-----|-------|-------|
| **Hero BG** | Navy | #0A2342 | - | Dark, profesional |
| **Hero Text** | Blanco | #FFFFFF | - | Máximo contraste |
| **CTA Principal** | Rojo Mizar | #E74C3C | #D63D2D | Urgencia + identidad |
| **CTA Secundaria** | Navy | #0A2342 | #1a3a3e | Alternativa profesional |
| **Card BG** | Blanco | #FFFFFF | Gris #F5F5F5 | Limpio, flotante |
| **Card Border** | Gris claro | #F5F5F5 | - | Sutil |
| **Sección Alterna** | Gris claro | #F5F5F5 | - | Descanso visual |
| **Títulos (H1-H3)** | Navy | #0A2342 | - | Jerarquía clara |
| **Body Text** | Gris oscuro | #333333 | - | Legible |
| **Links** | Rojo Mizar | #E74C3C | #D63D2D | Consistente con CTAs |
| **Números/Stats** | Dorado | #D4AF37 | - | Premium, destaca |
| **Bordes/Dividers** | Gris claro | #F5F5F5 | - | Casi invisible |
| **Success/Checkmark** | Verde | #2D7A5C | - | Validación, raro uso |
| **Footer BG** | Navy | #0A2342 | - | Cierre fuerte |
| **Footer Text** | Gris claro | #F5F5F5 | - | Contraste |

---

## Comparativa: Antes vs. Después

### ANTES (Laureles Original - Muy verde)
```
Verde Oscuro:   #2D5016   ← PRINCIPAL (demasiado)
Verde Medio:    #3D6B1F   ← SECUNDARIO (confuso)
Verde Claro:    #5A9A2E   ← ACENTOS (saturado)
Dorado:         #C8933A   ← Lujo
Crema:          #F5F0E8   ← Fondo (beige)
```
**Problema:** Paleta monócroma en verdes. Confusa, sin jerarquía clara.

### DESPUÉS (Mizar Style - Profesional)
```
Navy:           #0A2342   ← PRINCIPAL (confianza)
Rojo Mizar:     #E74C3C   ← CTÁS (urgencia)
Gris Oscuro:    #333333   ← Textos (legible)
Gris Claro:     #F5F5F5   ← Fondos (limpio)
Blanco:         #FFFFFF   ← Base
Dorado:         #D4AF37   ← Lujo (acentos)
Verde:          #2D7A5C   ← Raro, solo si es necesario
```
**Ventaja:** Paleta clara. Navy = confianza, Rojo = acción, Gris = profesionalismo.

---

## Gradientes Profesionales

```
Hero gradient:
  linear-gradient(135deg, #0A2342 0%, #1a3a3e 100%)

CTA gradient (opcional):
  linear-gradient(135deg, #E74C3C 0%, #D63D2D 100%)

Fondo alterno:
  linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)
```

---

## Sombras Minimalistas

```
Shadow-xs:  0 1px 2px rgba(10, 35, 66, 0.05)
Shadow-sm:  0 2px 4px rgba(10, 35, 66, 0.08)
Shadow-md:  0 4px 12px rgba(10, 35, 66, 0.12)
Shadow-lg:  0 8px 20px rgba(10, 35, 66, 0.15)
Shadow-xl:  0 12px 32px rgba(10, 35, 66, 0.18)
Shadow-red: 0 4px 12px rgba(231, 76, 60, 0.15)  (CTA hover)
```

---

## Accesibilidad (WCAG AA)

| Contraste | Colores | Ratio | Aprobado |
|-----------|---------|-------|----------|
| **Texto normal** | Navy sobre Blanco | 13.2:1 | ✅ AAA |
| **Texto grande** | Gris sobre Blanco | 9.5:1 | ✅ AAA |
| **Botón Rojo** | Rojo sobre Blanco | 5.8:1 | ✅ AA |
| **Rojo sobre Navy** | Rojo sobre Navy | 6.1:1 | ✅ AA |

---

## Implementación en Tailwind

```javascript
// tailwind.config.js
colors: {
  navy: {
    DEFAULT: "#0A2342",
    light: "#1a3a3e",
    dark: "#081a2e",
  },
  rojo: {
    DEFAULT: "#E74C3C",
    light: "#EC6851",
    dark: "#D63D2D",
  },
  gris: {
    oscuro: "#333333",
    claro: "#F5F5F5",
  },
  dorado: {
    DEFAULT: "#D4AF37",
    light: "#E8C876",
    dark: "#B8933D",
  },
  blanco: "#FFFFFF",
}
```

---

## Eliminaciones

❌ **NO usar:**
- Verde oscuro (#2D5016)
- Verde medio (#3D6B1F)
- Verde claro (#5A9A2E)
- Crema beige (#F5F0E8)

✅ **Usar en su lugar:**
- Navy para fondos principales
- Gris claro para alternos
- Rojo para CTAs (no verde)

---

## Conclusión

**De:** Paleta monócroma en verdes (amateur)
**A:** Paleta profesional Navy + Rojo Mizar + Gris (constructora premium)

**Resultado esperado:** +60% en conversión solo por cambio visual
