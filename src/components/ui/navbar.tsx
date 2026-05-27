"use client"

import { Book, Menu, ShoppingCart, Search, Palette, GraduationCap, History, Users, LayoutDashboard, Sparkles, Boxes, LogOut } from "lucide-react";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// Shims for Vite Compatibility (replacing Next.js imports)
const Link = ({ href, children, className, ...props }: any) => {
  // Check if it's a relative scroll anchor
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};


interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
  // Interactive state mapping
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  } | null;
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  onSignOutClick?: () => void;
}

export default function Navbar({
  logo = {
    url: "#",
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png", // replace with actual logo path if needed
    alt: "Dharani Herbbals",
    title: "Dharani Herbbals",
  },

  menu = [
    { title: "Home", url: "#" },
    {
      title: "Category",
      url: "#catalog",
      items: [
        {
          title: "Hair Care",
          description: "Premium cold-processed herbal hair oils and powders",
          icon: <Boxes className="size-5 shrink-0 text-primary" />,
          url: "#catalog",
        },
        {
          title: "Skin Care",
          description: "Pure botanical clay masks, oils, and cleansers",
          icon: <Sparkles className="size-5 shrink-0 text-primary" />,
          url: "#catalog",
        },
        {
          title: "Baby Care",
          description: "Extra gentle native formulas designed for sensitive skin",
          icon: <Palette className="size-5 shrink-0 text-primary" />,
          url: "#catalog",
        },
        {
          title: "Wellness Essentials",
          description: "Herbal extracts for inner vitality and longevity",
          icon: <LayoutDashboard className="size-5 shrink-0 text-primary" />,
          url: "#catalog",
        },
      ],
    },
    {
      title: "Pages",
      url: "#",
      items: [
        {
          title: "Documentation",
          description: "Ayurvedic botanical references & product guides",
          icon: <Book className="size-5 shrink-0 text-primary" />,
          url: "#benefits",
        },
        {
          title: "Our Heritage",
          description: "Learn about our native harvesters & tribal partnerships",
          icon: <Users className="size-5 shrink-0 text-primary" />,
          url: "#benefits",
        },
        {
          title: "Ayurvedic Tutorials",
          description: "Step-by-step guides for custom oil blend therapies",
          icon: <GraduationCap className="size-5 shrink-0 text-primary" />,
          url: "#benefits",
        },
        {
          title: "Herbal Changelog",
          description: "See our latest bio-diverse sourcing achievements",
          icon: <History className="size-5 shrink-0 text-primary" />,
          url: "#footer",
        },
      ],
    },
    {
      title: "Shop All",
      url: "#catalog",
    },
    {
      title: "Contact Us",
      url: "#footer",
    },
  ],

  mobileExtraLinks = [
    { name: "Press", url: "#footer" },
    { name: "Contact", url: "#footer" },
    { name: "Sourcing", url: "#benefits" },
    { name: "Changelog", url: "#footer" },
  ],

  auth = {
    login: { text: "Sign in", url: "#" },
    signup: { text: "Get Started", url: "#" },
  },
  user = null,
  onSignInClick,
  onSignUpClick,
  onSignOutClick,
}: NavbarProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showDropdown]);

  return (
    <section className="py-4 border-b border-border/40 bg-card/65 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Desktop Navbar */}
        <nav className="hidden justify-between items-center lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2 group">
              {/* leaf SVG Logo */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-[36px] h-[36px] transform transition-transform duration-300 group-hover:scale-105"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M50 90C72.0914 90 90 72.0914 90 50C90 12 50 10 50 10C50 10 10 12 10 50C10 72.0914 27.9086 90 50 90Z" 
                  fill="#7cb43d" 
                />
                <path 
                  d="M50 10C50 10 10 12 10 50C10 68.3 22.3 83.7 39 88.5C39 88.5 50 60 50 10Z" 
                  fill="#569a30" 
                />
                <path 
                  d="M32 30C45 32 58 45 62 60M32 30C28 42 35 55 45 68" 
                  stroke="white" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M48 40C58 42 68 53 72 66M48 40C44 50 49 61 57 72" 
                  stroke="white" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-[16px] font-bold leading-[1.1] text-foreground">
                  Dharani
                </span>
                <span className="font-serif text-[16px] font-extrabold leading-[0.9] text-primary">
                  Herbbals
                </span>
              </div>
            </Link>
            <div className="flex items-center">
              <NavigationMenu className="[&_[data-radix-navigation-menu-viewport]]:rounded-3xl">
                <NavigationMenuList className="rounded-3xl">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 hover:bg-muted"
            >
              <Search className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full size-9 hover:bg-muted"
              onClick={() => {
                const element = document.getElementById("catalog");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ShoppingCart className="size-4 text-muted-foreground hover:text-foreground" />
            </Button>

            {/* Auth Buttons or Avatar */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="focus:outline-none rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all flex items-center justify-center overflow-hidden"
                >
                  <Avatar className="size-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-border/60 mb-1">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        if (onSignOutClick) onSignOutClick();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="size-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full font-semibold px-4 h-9" onClick={onSignInClick}>
                  {auth.login.text}
                </Button>
                <Button size="sm" className="rounded-full font-semibold px-4 h-9 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onSignUpClick}>
                  {auth.signup.text}
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5">
              <svg 
                viewBox="0 0 100 100" 
                className="w-[34px] h-[34px]"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M50 90C72.0914 90 90 72.0914 90 50C90 12 50 10 50 10C50 10 10 12 10 50C10 72.0914 27.9086 90 50 90Z" 
                  fill="#7cb43d" 
                />
                <path 
                  d="M50 10C50 10 10 12 10 50C10 68.3 22.3 83.7 39 88.5C39 88.5 50 60 50 10Z" 
                  fill="#569a30" 
                />
                <path 
                  d="M32 30C45 32 58 45 62 60M32 30C28 42 35 55 45 68" 
                  stroke="white" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M48 40C58 42 68 53 72 66M48 40C44 50 49 61 57 72" 
                  stroke="white" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-[15px] font-bold leading-[1.1] text-foreground">
                  Dharani
                </span>
                <span className="font-serif text-[15px] font-extrabold leading-[0.9] text-primary">
                  Herbbals
                </span>
              </div>
            </a>
            <div className="flex items-center gap-1.5">
              {/* Search button mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full size-8 hover:bg-muted"
              >
                <Search className="size-4 text-muted-foreground" />
              </Button>

              {/* Cart button mobile */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full size-8 hover:bg-muted"
                onClick={() => {
                  const element = document.getElementById("catalog");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ShoppingCart className="size-4 text-muted-foreground" />
              </Button>

              {/* Menu Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full size-8 hover:bg-muted">
                    <Menu className="size-4 text-muted-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="overflow-y-auto w-80 bg-background border-l border-border p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <SheetHeader className="pb-6 border-b border-border/60">
                      <SheetTitle>
                        <div className="flex items-center gap-2.5">
                          <svg 
                            viewBox="0 0 100 100" 
                            className="w-[32px] h-[32px]"
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              d="M50 90C72.0914 90 90 72.0914 90 50C90 12 50 10 50 10C50 10 10 12 10 50C10 72.0914 27.9086 90 50 90Z" 
                              fill="#7cb43d" 
                            />
                            <path 
                              d="M50 10C50 10 10 12 10 50C10 68.3 22.3 83.7 39 88.5C39 88.5 50 60 50 10Z" 
                              fill="#569a30" 
                            />
                            <path 
                              d="M32 30C45 32 58 45 62 60M32 30C28 42 35 55 45 68" 
                              stroke="white" 
                              strokeWidth="3.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            <path 
                              d="M48 40C58 42 68 53 72 66M48 40C44 50 49 61 57 72" 
                              stroke="white" 
                              strokeWidth="3.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                          </svg>
                          <div className="flex flex-col text-left">
                            <span className="font-serif text-[15px] font-bold leading-[1.1] text-foreground">
                              Dharani
                            </span>
                            <span className="font-serif text-[15px] font-extrabold leading-[0.9] text-primary">
                              Herbbals
                            </span>
                          </div>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="my-6 flex flex-col gap-6">
                      <Accordion
                        type="single"
                        collapsible
                        className="flex w-full flex-col gap-4"
                      >
                        {menu.map((item) => renderMobileMenuItem(item))}
                      </Accordion>
                      <div className="border-t border-border/40 py-4">
                        <div className="grid grid-cols-2 justify-start gap-2">
                          {mobileExtraLinks.map((link, idx) => (
                            <a
                              key={idx}
                              className="inline-flex h-9 items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              href={link.url}
                            >
                              {link.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-6 border-t border-border/40">
                    {user ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 p-3 bg-muted/30 border border-border rounded-xl">
                          <Avatar className="size-10">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold truncate text-foreground">{user.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                          </div>
                        </div>
                        <Button 
                          variant="destructive" 
                          className="w-full rounded-xl font-semibold gap-2 h-10" 
                          onClick={() => {
                            // Close Sheet trigger is usually covered by Radix wrapper, click on signout
                            if (onSignOutClick) onSignOutClick();
                          }}
                        >
                          <LogOut className="size-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="w-full rounded-xl font-semibold h-10" onClick={onSignInClick}>
                          {auth.login.text}
                        </Button>
                        <Button className="w-full rounded-xl font-semibold h-10 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onSignUpClick}>
                          {auth.signup.text}
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground !rounded-3xl">
        <NavigationMenuTrigger className="!rounded-3xl hover:text-primary transition-colors focus:bg-transparent font-semibold">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-3xl">
          <ul className="w-80 p-3 bg-card rounded-2xl border border-border shadow-lg">
            <NavigationMenuLink className="!rounded-3xl">
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none gap-4 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground group"
                    href={subItem.url}
                  >
                    <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-200">
                      {subItem.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground mb-1">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-xs leading-normal text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 text-sm font-bold text-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pl-2 border-l-2 border-primary/20 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-3 rounded-lg p-2 leading-none outline-none transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
              href={subItem.url}
            >
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                {subItem.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground mb-0.5 truncate">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-[10px] leading-tight text-muted-foreground line-clamp-1">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="py-2 text-sm font-bold text-foreground hover:text-primary transition-colors block">
      {item.title}
    </a>
  );
};
