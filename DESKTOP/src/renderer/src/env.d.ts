/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly M_VITE_DATABASE_URL: string
  readonly M_VITE_EXPRES_PORT: string
  readonly M_VITE_EXPRES_URL: string
  readonly M_VITE_SOCKET_URL: string
  readonly M_VITE_REACT_URL: string
  readonly M_VITE_REACT_PORT: string
  readonly M_VITE_SECRET: string
  readonly RENDERER_VITE_EXPRES_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}

// ver 1
// MAIN_VITE_DATABASE_URL=postgresql://admin:123@localhost:5432/key_magic
// MAIN_VITE_EXPRES_PORT=8085
// MAIN_VITE_EXPRES_URL=http://localhost:8085
// MAIN_VITE_SOCKET_URL=http://localhost:3001
// MAIN_VITE_REACT_URL=http://localhost:5173
// M_VITE_REACT_PORT=5173
// M_VITE_SECRET=8f8f8cd1-c941-4210-8499-d3cbf88701d9

// ver 2
// # DATABASE_URL=postgres://keymagic:uL4kF93LpjsC5WsrtakyI10yZZY4Pd3B@dpg-clkfre4jtl8s73e44oq0-a.oregon-postgres.render.com/kemagic
// M_VITE_DATABASE_URL=postgres://keymagic:uL4kF93LpjsC5WsrtakyI10yZZY4Pd3B@dpg-clkfre4jtl8s73e44oq0-a.oregon-postgres.render.com/kemagic
// # MAIN_VITE_DATABASE_URL=postgresql://admin:123@localhost:5432/key_magic
// M_VITE_EXPRES_PORT=8085
// M_VITE_EXPRES_URL=http://localhost:8085
// M_VITE_SOCKET_URL=https://keymagic-rooms.onrender.com/
// # MAIN_VITE_SOCKET_URL=http://localhost:3001
// MAIN_VITE_REACT_URL=http://localhost:5173
// M_VITE_REACT_PORT=5173
// M_VITE_SECRET=8f8f8cd1-c941-4210-8499-d3cbf88701d9
// RENDERER_VITE_EXPRES_URL=http://localhost:8085
