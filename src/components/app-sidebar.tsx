"use client";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { footerNavLinks, navGroups } from "@/components/app-shared";
import { LatestChange } from "@/components/latest-change";
import { PlusIcon, SearchIcon } from "lucide-react";

import { CATEGORIES, BRANDS, PRODUCT_TYPES } from "@/lib/products-data";
import { useProductFilter } from "@/lib/product-filter-context";
export function AppSidebar() {
	  const { category, setCategory, brand, setBrand, productType, setProductType, sort, setSort } = useProductFilter();
  return (
		<Sidebar collapsible="icon" variant="floating" className="sticky top-0 h-screen">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton asChild>
					<a href="#link">
						<LogoIcon />
						<span className="font-medium">Efferd</span>
					</a>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
							tooltip="Add product"
						>
							<PlusIcon
							/>
							<span>Add product</span>
						</SidebarMenuButton>
						<Button
							aria-label="Search store"
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							size="icon"
							variant="outline"
						>
							<SearchIcon
							/>
							<span className="sr-only">Search store</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>
{/* Filter selects */}
<SidebarGroup>
  <SidebarMenuItem className="flex flex-col gap-2 p-2">
    {/* Category Filter */}
    <label className="text-sm font-medium">Category</label>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full rounded border border-gray-300 p-1"
    >
      <option value="All">All</option>
      {CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
    {/* Brand Filter */}
    <label className="text-sm font-medium mt-2">Brand</label>
    <select
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="w-full rounded border border-gray-300 p-1"
    >
      <option value="All Brands">All Brands</option>
      {BRANDS.map((b) => (
        <option key={b} value={b}>
          {b}
        </option>
      ))}
    </select>
    {/* Product Type Filter */}
    <label className="text-sm font-medium mt-2">Product Type</label>
    <select
      value={productType}
      onChange={(e) => setProductType(e.target.value)}
      className="w-full rounded border border-gray-300 p-1"
    >
      <option value="All Types">All Types</option>
      {PRODUCT_TYPES.map((pt) => (
        <option key={pt} value={pt}>
          {pt}
        </option>
      ))}
    </select>
    {/* Sort Filter */}
<label className="text-sm font-medium mt-2">Sort By</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded border border-gray-300 p-1"
        >
          <option value="price-asc">Price: Low to High</option>
        </select>
      </SidebarMenuItem>
    </SidebarGroup>
    {navGroups.map((group, index) => (
					<NavGroup key={`sidebar-group-${index}`} {...group} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<LatestChange />
				<SidebarMenu className="mt-2">
					{footerNavLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								className="text-muted-foreground"
								isActive={item.isActive}
								size="sm"
							>
								<a href={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
