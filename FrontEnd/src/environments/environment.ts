// Entorno LOCAL — el proxy de Angular redirige /api/* a localhost:8080
export const environment = {
  production: false,
  apiUrl: ''   // cadena vacía → usa el proxy (proxy.conf.json)
};
