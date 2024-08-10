/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const HooksLazyImport = createFileRoute('/hooks')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const HooksLazyRoute = HooksLazyImport.update({
  path: '/hooks',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/hooks.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/hooks': {
      id: '/hooks'
      path: '/hooks'
      fullPath: '/hooks'
      preLoaderRoute: typeof HooksLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  HooksLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/hooks"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/hooks": {
      "filePath": "hooks.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
