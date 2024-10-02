import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './styles.css?url'

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <script src="/assets/js/pannellum.js"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration /> 
        <Scripts />
      </body>
    </html>
  );
}


export function links(){

  return [{
    rel: 'stylesheet',
    href: styles
  }]
}