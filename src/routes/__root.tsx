import { ChatWidget } from "@/components/ChatWidget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { trackEvent, trackPageView } from "../lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const normalizedError = useMemo(
    () => (error instanceof Error ? error : new Error(String(error))),
    [error],
  );
  console.error(normalizedError);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(normalizedError, { boundary: "tanstack_root_error_component" });
  }, [normalizedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "Tp5ErYRGN-cf46XHxIpYWHQAcKsyVrd9E3MlzRxJSsk" },
      {
        title:
          "Get Gutters | Seamless Gutter Installation, Repair & Cleaning — Jacksonville & Orange Park FL",
      },
      {
        name: "description",
        content:
          "Family-owned seamless gutter experts serving Jacksonville, Orange Park and Northeast Florida communities. 5-star rated. Free estimates: (904) 589-0000.",
      },
      { name: "author", content: "Get Gutters" },
      {
        property: "og:title",
        content:
          "Get Gutters | Seamless Gutter Installation, Repair & Cleaning — Jacksonville & Orange Park FL",
      },
      {
        property: "og:description",
        content:
          "Family-owned seamless gutter experts serving Jacksonville, Orange Park and Northeast Florida communities. 5-star rated. Free estimates: (904) 589-0000.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Get Gutters | Seamless Gutter Installation, Repair & Cleaning — Jacksonville & Orange Park FL",
      },
      {
        name: "twitter:description",
        content:
          "Family-owned seamless gutter experts serving Jacksonville, Orange Park and Northeast Florida communities. 5-star rated. Free estimates: (904) 589-0000.",
      },
      { property: "og:image", content: "https://getguttersjax.com/images/get-gutters-social.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://getguttersjax.com/images/get-gutters-social.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const showChat =
    hydrated && !/^\/(admin|estimate|estimator|database)(\/|$)/.test(pathname);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    const trackLeadClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const common = {
        link_url: href,
        link_text: (anchor.textContent || "").trim().slice(0, 100),
        page_path: window.location.pathname,
      };

      if (href.startsWith("tel:")) {
        trackEvent("click_to_call", common);
      } else if (href.startsWith("sms:")) {
        trackEvent("click_to_text", common);
      } else if (href === "/free-estimate" || href.endsWith("/free-estimate")) {
        trackEvent("estimate_cta_click", common);
      }
    };

    document.addEventListener("click", trackLeadClick);
    return () => document.removeEventListener("click", trackLeadClick);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {showChat && <ChatWidget />}
    </QueryClientProvider>
  );
}
