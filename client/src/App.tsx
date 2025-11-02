import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/StudentDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import WardenDashboard from "@/pages/WardenDashboard";
import RoomAllotment from "@/pages/RoomAllotment";
import NotFound from "@/pages/not-found";

function DashboardLayout({ role }: { role: "student" | "warden" | "admin" }) {
  const [location] = useLocation();
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  let content;
  if (role === "student") {
    if (location === "/student/allotment") {
      content = <RoomAllotment />;
    } else {
      content = <StudentDashboard />;
    }
  } else if (role === "admin") {
    content = <AdminDashboard />;
  } else {
    content = <WardenDashboard />;
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role={role} />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            {content}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Login} />
          <Route path="/student">
            <DashboardLayout role="student" />
          </Route>
          <Route path="/student/allotment">
            <DashboardLayout role="student" />
          </Route>
          <Route path="/admin">
            <DashboardLayout role="admin" />
          </Route>
          <Route path="/warden">
            <DashboardLayout role="warden" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
