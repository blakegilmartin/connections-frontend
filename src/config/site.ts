export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Latest",
      href: "/latest",
    },
    {
      label: "Create",
      href: "/create",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Latest",
      href: "/latest",
    },
    {
      label: "Create",
      href: "/create",
    },
  ],
  links: {
    github: "https://github.com/blakegilmartin",
  },
};
