// config.js
// export const apiBaseUrl = 'http://localhost:8085'
// export const contentSecurityPolicy = `default-src 'self'; script-src 'self' ${apiBaseUrl}; style-src 'self' 'unsafe-inline'; connect-src 'self' ${apiBaseUrl}`
export const contentSecurityPolicy =
  "default-src 'self'; script-src 'self' %RENDERER_VITE_EXPRES_URL%; style-src 'self' 'unsafe-inline'; connect-src 'self' %RENDERER_VITE_EXPRES_URL%"
