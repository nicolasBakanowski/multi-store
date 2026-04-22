# Camino hacia cookie HttpOnly (JWT)

Hoy el token vive en **redux-persist** (`localStorage`), lo que es simple pero expone el JWT a XSS.

Pasos típicos de endurecimiento:

1. **Route Handlers** en Next que establezcan `Set-Cookie` con flags `HttpOnly`, `Secure`, `SameSite` (y duración acotada).
2. **API** que acepte sesión por cookie además de (o en lugar de) `Authorization: Bearer` durante una ventana de migración.
3. **Refresh tokens** o rotación en servidor; revocación en logout.
4. Ajustar **axios/fetch** a `credentials: 'include'` y CORS con `credentials: true` + orígenes explícitos (ya alineado en el backend con `CORS_ORIGINS`).

No está implementado de extremo a extremo en este repo; este documento fija el plan técnico cuando se priorice.
