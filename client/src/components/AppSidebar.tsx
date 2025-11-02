import { Home, Building2, Bed, Users, LogOut, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

interface AppSidebarProps {
  role: "student" | "warden" | "admin";
}

export function AppSidebar({ role }: AppSidebarProps) {
  const [location, setLocation] = useLocation();

  const studentItems = [
    { title: "Dashboard", url: "/student", icon: Home },
    { title: "Room Allotment", url: "/student/allotment", icon: Bed },
  ];

  const wardenItems = [
    { title: "Dashboard", url: "/warden", icon: Home },
    { title: "Students", url: "/warden/students", icon: Users },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Hostels", url: "/admin/hostels", icon: Building2 },
    { title: "Rooms", url: "/admin/rooms", icon: Bed },
  ];

  const items = role === "student" ? studentItems : role === "warden" ? wardenItems : adminItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role === "student" ? "Student Portal" : role === "warden" ? "Warden Portal" : "Admin Portal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <a href={item.url} onClick={(e) => { e.preventDefault(); setLocation(item.url); }}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-testid="link-profile">
              <a href="#" onClick={(e) => { e.preventDefault(); console.log('Profile clicked'); }}>
                <User />
                <span>Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-testid="button-logout">
              <a href="/" onClick={(e) => { e.preventDefault(); setLocation('/'); }}>
                <LogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
