import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[#F5F0EB]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[#F5F0EB]">Page not found</h2>
        <p className="mt-2 text-sm text-[#8C8C82]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[#C9A96E] px-4 py-2 text-sm font-medium text-[#0A0A0A] transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Reno — Dubai's Home Renovation Platform" },
      { name: "description", content: "Reno manages your full home renovation end-to-end — expert designers, vetted contractors, and milestone-based payments. Specialising in Dubai projects from AED 275,000 to AED 920,000." },
      { name: "author", content: "Reno" },
      { property: "og:title", content: "Reno — Dubai's Home Renovation Platform" },
      { property: "og:description", content: "Transform your home. No stress. No surprises. End-to-end renovation management for Dubai homeowners." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Reno — Dubai's Home Renovation Platform" },
      { name: "twitter:description", content: "Transform your home. No stress. No surprises." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
