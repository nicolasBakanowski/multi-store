# Vuelta Buena — Brand Guidelines Técnicas

## Identidad

- **Nombre:** La Vuelta Buena
- **Dominio:** vueltabuena.com
- **Tagline principal:** Bebé bien · Pedí fácil
- **Concepto:** E-commerce de bebidas alcohólicas y no alcohólicas. Tono argento, popular-premium, festivo y cercano.

---

## Archivos de logo

Ubicados en `/public/icons/`:

| Archivo | Uso |
|---|---|
| `vueltabuena_logo.svg` | Principal — sobre fondos oscuros, navbar, redes |
| `vueltabuena_logo_transparente.svg` | Sobre fondos claros, materiales impresos |
| `vueltabuena_icono.svg` | Favicon, perfil Instagram, app, stickers |

```html
<!-- Navbar (fondo oscuro) -->
<img src="/icons/vueltabuena_logo.svg" alt="La Vuelta Buena" height="48" />

<!-- Sobre fondo claro -->
<img src="/icons/vueltabuena_logo_transparente.svg" alt="La Vuelta Buena" height="48" />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/icons/vueltabuena_icono.svg" />
```

---

## Paleta de colores

```css
:root {
  --vb-negro:   #1C0A00;  /* fondo principal, navbar, footer */
  --vb-ambar:   #E8952A;  /* color primario, CTAs, íconos, precios */
  --vb-dorado:  #F5C96A;  /* acento, texto sobre negro, highlights */
  --vb-rojo:    #C0341A;  /* urgencia, badges de oferta, descuentos */
  --vb-crema:   #F7F1E8;  /* fondo claro, cards, secciones alternas */
}
```

### Uso por contexto

| Elemento | Color |
|---|---|
| Navbar / Hero fondo | `--vb-negro` |
| CTA principal "Comprar" | `--vb-ambar` |
| Texto sobre negro | `--vb-dorado` |
| Precio del producto | `--vb-ambar` |
| Badge oferta / descuento | `--vb-rojo` |
| Fondo cards de producto | `--vb-crema` |
| Footer | `--vb-negro` |
| Hover en botón primario | `--vb-dorado` |

---

## Tipografía

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap');

:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', Arial, sans-serif;
}
```

| Rol | Font | Peso | Tamaño sugerido |
|---|---|---|---|
| Hero / nombre marca | `--font-display` | 400 | 48px |
| Títulos de sección h2 | `--font-display` | 400 | 32px |
| Nombre de producto h3 | `--font-body` | 500 | 15px |
| Precio | `--font-body` | 500 | 24px |
| Botones / labels | `--font-body` | 500 | 13px |
| Body / descripciones | `--font-body` | 400 | 15px |
| Badges / microcopy | `--font-body` | 500 | 11px |

---

## Espaciado

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;

  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;
  --radius-pill: 999px;
}
```

---

## Componentes

### Botón primario
```css
.btn-primary {
  background:     var(--vb-ambar);
  color:          var(--vb-negro);
  font-family:    var(--font-body);
  font-size:      13px;
  font-weight:    500;
  letter-spacing: 0.04em;
  padding:        10px 24px;
  border-radius:  var(--radius-pill);
  border:         none;
  cursor:         pointer;
  transition:     background 0.15s;
}
.btn-primary:hover {
  background: var(--vb-dorado);
}
```

### Botón secundario
```css
.btn-secondary {
  background:     transparent;
  color:          var(--vb-ambar);
  border:         1.5px solid var(--vb-ambar);
  font-family:    var(--font-body);
  font-size:      13px;
  font-weight:    500;
  letter-spacing: 0.04em;
  padding:        10px 24px;
  border-radius:  var(--radius-pill);
  cursor:         pointer;
  transition:     background 0.15s, color 0.15s;
}
.btn-secondary:hover {
  background: var(--vb-ambar);
  color:      var(--vb-negro);
}
```

### Badge de oferta
```css
.badge-oferta {
  background:     var(--vb-rojo);
  color:          var(--vb-crema);
  font-family:    var(--font-body);
  font-size:      11px;
  font-weight:    500;
  letter-spacing: 0.06em;
  padding:        3px 10px;
  border-radius:  var(--radius-pill);
  text-transform: uppercase;
}
```

### Card de producto
```css
.product-card {
  background:    var(--vb-crema);
  border-radius: var(--radius-lg);
  border:        1px solid rgba(28, 10, 0, 0.08);
  overflow:      hidden;
  transition:    border-color 0.15s;
}
.product-card:hover {
  border-color: var(--vb-ambar);
}
.product-card .product-name {
  font-family: var(--font-body);
  font-size:   15px;
  font-weight: 500;
  color:       var(--vb-negro);
}
.product-card .product-price {
  font-family: var(--font-body);
  font-size:   22px;
  font-weight: 500;
  color:       var(--vb-ambar);
}
.product-card .product-desc {
  font-family: var(--font-body);
  font-size:   13px;
  color:       #4A2A10;
  line-height: 1.5;
}
```

### Navbar
```css
.navbar {
  background:      var(--vb-negro);
  padding:         0 40px;
  height:          64px;
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  position:        sticky;
  top:             0;
  z-index:         100;
}
.navbar a {
  font-family:    var(--font-body);
  font-size:      13px;
  font-weight:    500;
  color:          var(--vb-crema);
  text-decoration: none;
  letter-spacing: 0.03em;
}
.navbar a:hover {
  color: var(--vb-ambar);
}
```

### Footer
```css
.footer {
  background:  var(--vb-negro);
  color:       var(--vb-crema);
  font-family: var(--font-body);
  font-size:   13px;
  padding:     48px 40px;
}
.footer a {
  color:           var(--vb-ambar);
  text-decoration: none;
}
.footer a:hover {
  color: var(--vb-dorado);
}
```

---

## Secciones / layout

```css
/* Sección oscura — hero, banners principales, footer */
.section-dark {
  background: var(--vb-negro);
  color:      var(--vb-crema);
}
.section-dark h1,
.section-dark h2 {
  font-family: var(--font-display);
  color:       var(--vb-dorado);
}

/* Sección clara — catálogo, about, FAQ */
.section-light {
  background: var(--vb-crema);
  color:      var(--vb-negro);
}
.section-light h2 {
  font-family: var(--font-display);
  color:       var(--vb-negro);
}

/* Sección ámbar — destacados, promo banners */
.section-amber {
  background: var(--vb-ambar);
  color:      var(--vb-negro);
}
.section-amber h2 {
  font-family: var(--font-display);
  color:       var(--vb-negro);
}
```

---

## Jerarquía tipográfica completa

```css
h1 {
  font-family: var(--font-display);
  font-size:   48px;
  font-weight: 400;
  color:       var(--vb-dorado);
  line-height: 1.1;
}
h2 {
  font-family: var(--font-display);
  font-size:   32px;
  font-weight: 400;
  line-height: 1.2;
}
h3 {
  font-family: var(--font-body);
  font-size:   18px;
  font-weight: 500;
  line-height: 1.3;
}
p {
  font-family: var(--font-body);
  font-size:   15px;
  font-weight: 400;
  color:       #4A2A10;
  line-height: 1.65;
}
small, .microcopy {
  font-family: var(--font-body);
  font-size:   11px;
  color:       #7A5A3A;
  letter-spacing: 0.04em;
}
```

---

## Tailwind config (si usás Tailwind)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        vb: {
          negro:  '#1C0A00',
          ambar:  '#E8952A',
          dorado: '#F5C96A',
          rojo:   '#C0341A',
          crema:  '#F7F1E8',
        }
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      }
    }
  }
}
```

---

## Variables para Figma / tokens JSON

```json
{
  "color": {
    "negro":  { "value": "#1C0A00" },
    "ambar":  { "value": "#E8952A" },
    "dorado": { "value": "#F5C96A" },
    "rojo":   { "value": "#C0341A" },
    "crema":  { "value": "#F7F1E8" }
  },
  "font": {
    "display": { "value": "DM Serif Display" },
    "body":    { "value": "DM Sans" }
  },
  "radius": {
    "sm":   { "value": "6px" },
    "md":   { "value": "10px" },
    "lg":   { "value": "16px" },
    "pill": { "value": "999px" }
  },
  "spacing": {
    "xs":  { "value": "4px" },
    "sm":  { "value": "8px" },
    "md":  { "value": "16px" },
    "lg":  { "value": "24px" },
    "xl":  { "value": "40px" },
    "2xl": { "value": "64px" }
  }
}
```
