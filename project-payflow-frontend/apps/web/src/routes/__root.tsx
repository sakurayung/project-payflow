import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

import { ModeToggle } from "@/components/mode-toggle";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "project-payflow-frontend",
      },
      {
        name: "description",
        content: "project-payflow-frontend is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              {isFetching ? <Loader /> : <Outlet />}
            </main>
            <ModeToggle />
          </SidebarProvider>
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
    </QueryClientProvider>
  );
}
