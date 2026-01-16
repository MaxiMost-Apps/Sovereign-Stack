import {
  LayoutDashboard,
  Layers,
  BookText,
  BookOpen,
  Share2,
  TrendingUp,
  MessageCircle
} from "lucide-react";

export interface SidebarLink {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: SidebarLink[];
  sectionKey: string;
  sectionTitle: string;
}

export const sidebarLinks: SidebarLink[] = [
  // Section: MAIN
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    sectionKey: "main",
    sectionTitle: "MAIN"
  },
  // Settings removed from Sidebar, moved to Header
  // Section: TOOLS
  {
    title: "Progress Analytics",
    href: "/progress",
    icon: <TrendingUp className="h-5 w-5" />,
    sectionKey: "tools",
    sectionTitle: "TOOLS"
  },
  {
    title: "Library",
    href: "/library",
    icon: <Layers className="h-5 w-5" />,
    sectionKey: "tools",
    sectionTitle: "TOOLS"
  },
  {
    title: "Journal",
    href: "/journal",
    icon: <BookText className="h-5 w-5" />,
    sectionKey: "tools",
    sectionTitle: "TOOLS"
  },
  {
    title: "AI Coach",
    href: "/coach",
    icon: <MessageCircle className="h-5 w-5" />,
    sectionKey: "tools",
    sectionTitle: "TOOLS"
  },
  // Section: LEARN
  {
    title: "Habit Building Basics",
    href: "/learn/habit-building-basics",
    icon: <BookOpen className="h-5 w-5" />,
    sectionKey: "learn",
    sectionTitle: "LEARN"
  },
  {
    title: "Atomic Habits Guide",
    href: "/learn/atomic-habits",
    icon: <BookOpen className="h-5 w-5" />,
    sectionKey: "learn",
    sectionTitle: "LEARN"
  },
  {
    title: "Stoic Principles",
    href: "/learn/stoic-principles",
    icon: <BookOpen className="h-5 w-5" />,
    sectionKey: "learn",
    sectionTitle: "LEARN"
  },
  {
    title: "Outlive Summary",
    href: "/learn/outlive-summary",
    icon: <BookOpen className="h-5 w-5" />,
    sectionKey: "learn",
    sectionTitle: "LEARN"
  },
  {
    title: "Dangers of Sugar",
    href: "/learn/dangers-of-sugar",
    icon: <BookOpen className="h-5 w-5" />,
    sectionKey: "learn",
    sectionTitle: "LEARN"
  },
  {
    title: "Top Supplements",
    href: "/learn/supplements",
    icon: <BookOpen className="h-5 w-5" />,
    sectionKey: "learn",
    sectionTitle: "LEARN"
  },
  // Section: CONNECT
  {
    title: "Integrations",
    href: "/integrations",
    icon: <Share2 className="h-5 w-5" />,
    sectionKey: "connect",
    sectionTitle: "CONNECT"
  },
];

export const getGroupedSidebarLinks = () => {
  const groups: { key: string; title: string; links: SidebarLink[] }[] = [];
  const sectionMap = new Map<string, SidebarLink[]>();

  for (const link of sidebarLinks) {
    if (!sectionMap.has(link.sectionKey)) {
      sectionMap.set(link.sectionKey, []);
      groups.push({ key: link.sectionKey, title: link.sectionTitle, links: sectionMap.get(link.sectionKey)! });
    }
    sectionMap.get(link.sectionKey)!.push(link);
  }
  return groups;
};
