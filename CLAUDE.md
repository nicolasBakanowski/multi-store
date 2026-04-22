# multi-store — Frontend

Next.js 14 App Router. Redux + redux-persist. Tailwind + styled-components. Socket.io. Framer Motion.

## Stack

| Lib | Rol |
|-----|-----|
| Next.js 14 (App Router) | Routing, SSR, Server Actions |
| Redux Toolkit + redux-persist | Estado global persistido |
| Tailwind CSS | Estilos utilitarios |
| styled-components | Solo GlobalStyles (fuentes) |
| framer-motion | Animaciones de UI |
| socket.io-client | Tiempo real (órdenes) |
| jose | Verificación JWT en middleware |

---

## Estructura de carpetas

```
multi-store/
├── app/                        # App Router — páginas y server actions
│   ├── actions/                # Server Actions (llamadas al backend)
│   │   ├── auth.ts             # login, register
│   │   ├── category.ts         # CRUD categorías
│   │   ├── product.ts          # CRUD productos
│   │   └── order.ts            # crear orden, cambiar estado
│   │
│   ├── [ruta]/
│   │   ├── page.tsx            # Server Component: fetch + pasa data al client
│   │   └── [Ruta]Client.tsx    # Client Component: interactividad, Redux, socket
│   │
│   ├── layout.tsx              # Root layout — providers, navbar
│   ├── providers.tsx           # Redux store + redux-persist wrapper
│   ├── GlobalStylesClient.tsx  # styled-components GlobalStyles (solo fuentes)
│   └── CategoryGrid.tsx        # Client component animado (framer-motion)
│
├── components/                 # Componentes reutilizables
│   │                           # Convención: PascalCase, un componente por archivo
│   ├── navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductEditModal.tsx
│   ├── CartItemCard.tsx
│   ├── CartIcon.tsx / CartLink.tsx
│   ├── AddProductForm.tsx / AddCategoryForm.tsx
│   ├── DeliveryForm.tsx
│   ├── Notification.tsx        # Toast global, lee Redux notificationSlice
│   ├── ApiAndSocketSync.tsx    # Sincroniza token Redux → socket auth (no renderiza)
│   └── Spinner.tsx
│
├── redux/                      # Estado global
│   ├── store.ts                # Configuración store + persistor
│   └── slices/
│       ├── cartSlice.ts        # items[], acciones: add/remove/discount/clear
│       ├── userSlice.ts        # user, token, acciones: setUserInfoAndToken/logout
│       ├── productSlice.ts     # products[], currentProduct
│       └── notificationSlice.ts # message, type (success|error)
│
├── interfaces/                 # Tipos TypeScript compartidos
│   ├── Products.ts             # Product, ProductEdit, ProductEditModalProps
│   └── Cart.ts                 # CartItem
│
├── animations/                 # Variantes framer-motion (solo config, sin JSX)
│   ├── categoryAnimation.ts    # Stagger para grilla de categorías
│   ├── productAnimation.ts     # Spring para cards de productos
│   └── adminChargeForm.ts      # Scale para formularios admin
│
├── utils/                      # Funciones puras sin side effects
│   ├── ImageConversor.ts       # convertToWebP(file) — convierte imagen a WebP
│   ├── orderDataFormater.ts    # formatOrderData(api) — normaliza respuesta de órdenes
│   └── whatsapp.ts             # generateWhatsAppMessage(order) — abre WhatsApp
│
├── socket/
│   └── socketConfig.ts         # Instancia socket.io-client + setSocketAuthToken(token)
│
├── constants/
│   └── orderConstants.ts       # ORDER_STATUS_* ids numéricos
│
├── styles/
│   ├── GlobalStyles.ts         # Font-face (Crimson Text, Roboto) via styled-components
│   └── globals.css             # Tailwind directives (@tailwind base/components/utilities)
│
├── middleware.ts               # Protege /admin (roleId=1) y /orders — verifica JWT cookie
└── .env                        # NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SOCKET_URL, API_URL
```

---

## Convenciones

### Páginas (`app/[ruta]/`)
- `page.tsx` = Server Component. Solo fetch y pasar props. Sin hooks.
- `[Ruta]Client.tsx` = Client Component con `"use client"`. Interactividad, Redux, socket.

### Server Actions (`app/actions/`)
- Siempre `"use server"` arriba.
- Retornan datos o lanzan `Error` — nunca retornan `{ ok, error }`.
- Usan `fetch` nativo, no axios.

### Componentes
- PascalCase, un componente por archivo.
- Si solo sincroniza estado (sin JSX visible) → va en `components/` igual (ej. `ApiAndSocketSync`).

### Redux
- Un slice por dominio: `cart`, `user`, `product`, `notification`.
- Tipos del slice se definen en `interfaces/` si se usan en múltiples archivos.

### Estilos
- Tailwind para todo.
- styled-components solo para `GlobalStyles` (fuentes globales).
- No mezclar CSS Modules.

### Variables de entorno
- `NEXT_PUBLIC_*` → accesibles en cliente y servidor.
- Sin prefijo → solo servidor (server actions, middleware).
- `API_URL` y `NEXT_PUBLIC_API_URL` deben coincidir en valor.

---

## Flujo de datos

```
Usuario → page.tsx (SSR fetch)
              ↓
         Client Component
              ↓
         Server Action (app/actions/)
              ↓
         Backend REST API (port 30001)
              ↓
         Redux slice → UI re-render

Socket.io → OrdersClient.tsx → Redux → UI
```

---

## Backend

Corre en Docker. Desde `/home/nbaka/MULTISTOREFULL`:

```bash
make up       # levanta MySQL + API
make down     # baja
make logs     # logs del contenedor api
make migrate  # corre migraciones pendientes
make seed     # corre seeders
```

Puerto: `30001`. Configurado en `be_multi_store/.env.development`.
