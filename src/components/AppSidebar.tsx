import {
  Calendar,
  Phone,
  Users,
  ArrowRightLeft,
  Rocket,
  User,
  Settings,
  BarChart3,
  Clock,
  Video,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { title: "Launcher", icon: Rocket, url: "/dashboard" },
  { title: "Contacts", icon: User, url: "/contacts" },
  { title: "Settings", icon: Settings, url: "/settings" },
  { title: "Analytics", icon: BarChart3, url: "/analytics" },
  { title: "Recent", icon: Clock, url: "/recent" },
  { title: "Video", icon: Video, url: "/video" },
  { title: "Messages", icon: MessageSquare, url: "/messages" },
  { title: "Help", icon: HelpCircle, url: "/help" },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent";

  return (
    <Sidebar className="w-16" collapsible="none">
      <SidebarContent className="bg-gray-50">
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mx-auto">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} w-10 h-10 rounded-lg flex items-center justify-center`}
                      title={item.title}
                    >
                      <item.icon className="h-5 w-5" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Avatar at Bottom */}
        <div className="mt-auto p-4 border-t">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto text-white font-semibold text-sm">
            AO
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}