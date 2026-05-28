import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  PanelLeftIcon, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp,
  Filter,
  Star,
  TrendingUp,
  Flame,
  Sparkles,
  Leaf,
  Check,
  X
} from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "20rem"
const SIDEBAR_WIDTH_MOBILE = "20rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

// Filter Types
type FilterState = {
  categories: string[]
  brands: string[]
  productTypes: string[]
  priceRange: { min: number; max: number }
  rating: number | null
  inStock: boolean
}

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void
  onSortChange?: (sort: string) => void
  initialFilters?: Partial<FilterState>
}

// Filter Data
const CATEGORIES = [
  { id: "HAIR", name: "Hair Care", count: 24, icon: Leaf },
  { id: "SKIN", name: "Skin Care", count: 18, icon: Leaf },
  { id: "BABY", name: "Baby Care", count: 12, icon: Leaf },
  { id: "BEVERAGES", name: "Organic Teas", count: 8, icon: Leaf },
  { id: "BODY", name: "Body Care", count: 15, icon: Leaf },
  { id: "FOOD", name: "Natural Food", count: 10, icon: Leaf },
  { id: "HEALTH & WELLNESS", name: "Wellness Essentials", count: 20, icon: Leaf },
  { id: "POOJAS", name: "Pooja Essentials", count: 6, icon: Leaf },
]

const BRANDS = [
  { id: "MAKIL", name: "Makil", count: 32 },
  { id: "RAMCARE", name: "Ramcare", count: 28 },
  { id: "DIVYAM", name: "Divyam", count: 24 },
  { id: "VANA_ARASI", name: "Vana Arasi", count: 18 },
  { id: "VEDAN_AMUTHU", name: "Vedan Amuthu", count: 15 },
  { id: "VEDAN", name: "Vedan", count: 22 },
  { id: "ATHIYAMAN", name: "Athiyaman", count: 12 },
  { id: "NIRAI_HOMAM", name: "Nirai Homam", count: 10 },
]

const PRODUCT_TYPES = [
  { id: "new", name: "New Launch", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50", badge: "✨" },
  { id: "Best Selling", name: "Best Selling", icon: Flame, color: "text-orange-600", bg: "bg-orange-50", badge: "🔥" },
  { id: "deals", name: "Deals", icon: Star, color: "text-red-600", bg: "bg-red-50", badge: "💰" },
  { id: "trending", name: "Trending", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", badge: "📈" },
  { id: "hot", name: "Hot", icon: Flame, color: "text-rose-600", bg: "bg-rose-50", badge: "🌶️" },
  { id: "popular", name: "Popular", icon: Star, color: "text-amber-600", bg: "bg-amber-50", badge: "⭐" },
]

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "rating_desc", label: "Rating: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "popularity", label: "Popularity" },
]

// Accordion Component for filter sections
function FilterSection({ 
  title, 
  children, 
  defaultOpen = true 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean 
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}

// Checkbox component for filter items
function FilterCheckbox({ 
  id: _id, // Prefix with underscore to indicate it's intentionally unused
  label, 
  count, 
  checked, 
  onChange,
  icon: Icon 
}: { 
  id: string; 
  label: string; 
  count?: number; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  icon?: React.ElementType;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-1 cursor-pointer"
        />
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />}
        <span className="text-sm text-gray-700 group-hover:text-emerald-600 transition-colors">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-400">({count})</span>
      )}
    </label>
  )
}

// Price Range Slider
function PriceRangeSlider({ 
  min, 
  max, 
  value, 
  onChange 
}: { 
  min: number; 
  max: number; 
  value: { min: number; max: number }; 
  onChange: (value: { min: number; max: number }) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-gray-500">Min</label>
          <Input
            type="number"
            value={value.min}
            onChange={(e) => onChange({ ...value, min: Number(e.target.value) })}
            className="h-8 text-sm"
            placeholder="Min"
          />
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex-1">
          <label className="text-xs text-gray-500">Max</label>
          <Input
            type="number"
            value={value.max}
            onChange={(e) => onChange({ ...value, max: Number(e.target.value) })}
            className="h-8 text-sm"
            placeholder="Max"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value.max}
        onChange={(e) => onChange({ ...value, max: Number(e.target.value) })}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
      />
    </div>
  )
}

// Rating Filter
function RatingFilter({ value, onChange }: { value: number | null; onChange: (rating: number | null) => void }) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <label key={rating} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="rating"
            checked={value === rating}
            onChange={() => onChange(rating === value ? null : rating)}
            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">& Up</span>
          </div>
        </label>
      ))}
    </div>
  )
}

// Main Filter Sidebar Component
function FilterSidebar({ onFilterChange, onSortChange, initialFilters = {} }: FilterSidebarProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    categories: initialFilters.categories || [],
    brands: initialFilters.brands || [],
    productTypes: initialFilters.productTypes || [],
    priceRange: initialFilters.priceRange || { min: 0, max: 5000 },
    rating: initialFilters.rating || null,
    inStock: initialFilters.inStock || false,
  })
  
  const [sortBy, setSortBy] = React.useState("recommended")
  const [showSortMenu, setShowSortMenu] = React.useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = React.useState(0)

  React.useEffect(() => {
    const count = filters.categories.length + filters.brands.length + filters.productTypes.length + (filters.rating ? 1 : 0) + (filters.inStock ? 1 : 0)
    setActiveFiltersCount(count)
  }, [filters])

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const toggleArrayFilter = (key: 'categories' | 'brands' | 'productTypes', value: string) => {
    const current = filters[key]
    const updated = current.includes(value) 
      ? current.filter(v => v !== value)
      : [...current, value]
    updateFilter(key, updated)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      categories: [],
      brands: [],
      productTypes: [],
      priceRange: { min: 0, max: 5000 },
      rating: null,
      inStock: false,
    }
    setFilters(resetFilters)
    onFilterChange?.(resetFilters)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold text-white bg-emerald-600 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Sort by: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showSortMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value)
                    setShowSortMenu(false)
                    onSortChange?.(option.value)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    sortBy === option.value ? 'text-emerald-600 font-medium bg-emerald-50' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                  {sortBy === option.value && <Check className="w-3.5 h-3.5 float-right mt-0.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Categories */}
        <FilterSection title="Categories" defaultOpen={true}>
          <div className="space-y-2">
            <FilterCheckbox
              id="all-categories"
              label="All Categories"
              count={PRODUCT_TYPES.reduce((acc, t) => acc + (t.id === 'new' ? 15 : 20), 0)}
              checked={filters.categories.length === 0}
              onChange={(checked) => {
                if (checked) updateFilter('categories', [])
              }}
            />
            {CATEGORIES.map((cat) => (
              <FilterCheckbox
                key={cat.id}
                id={cat.id}
                label={cat.name}
                count={cat.count}
                icon={cat.icon}
                checked={filters.categories.includes(cat.id)}
                onChange={() => toggleArrayFilter('categories', cat.id)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands" defaultOpen={true}>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            <FilterCheckbox
              id="all-brands"
              label="All Brands"
              checked={filters.brands.length === 0}
              onChange={(checked) => {
                if (checked) updateFilter('brands', [])
              }}
            />
            {BRANDS.map((brand) => (
              <FilterCheckbox
                key={brand.id}
                id={brand.id}
                label={brand.name}
                count={brand.count}
                checked={filters.brands.includes(brand.id)}
                onChange={() => toggleArrayFilter('brands', brand.id)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Product Types */}
        <FilterSection title="Product Types" defaultOpen={true}>
          <div className="space-y-2">
            {PRODUCT_TYPES.map((type) => (
              <label
                key={type.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.productTypes.includes(type.id)}
                    onChange={() => toggleArrayFilter('productTypes', type.id)}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className={`text-sm ${type.color} font-medium`}>
                    {type.badge} {type.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" defaultOpen={false}>
          <PriceRangeSlider
            min={0}
            max={5000}
            value={filters.priceRange}
            onChange={(value) => updateFilter('priceRange', value)}
          />
        </FilterSection>

        {/* Customer Ratings */}
        <FilterSection title="Customer Ratings" defaultOpen={false}>
          <RatingFilter
            value={filters.rating}
            onChange={(rating) => updateFilter('rating', rating)}
          />
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability" defaultOpen={false}>
          <FilterCheckbox
            id="in-stock"
            label="In Stock Only"
            checked={filters.inStock}
            onChange={(checked) => updateFilter('inStock', checked)}
          />
        </FilterSection>
      </div>

      {/* Footer with Apply Button */}
      <div className="p-4 border-t border-gray-100">
        <Button
          onClick={() => onFilterChange?.(filters)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
        >
          Apply Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  onFilterChange,
  onSortChange,
  initialFilters,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
} & FilterSidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  const sidebarContent = children || (
    <FilterSidebar 
      onFilterChange={onFilterChange} 
      onSortChange={onSortChange} 
      initialFilters={initialFilters} 
    />
  )

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-white",
          className
        )}
        {...props}
      >
        {sidebarContent}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-white p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Filters & Sort</SheetTitle>
            <SheetDescription>Filter and sort herbal products</SheetDescription>
          </SheetHeader>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block sticky top-0"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-e group-data-[side=right]:border-s",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-white group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1"
        >
          {sidebarContent}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("hover:bg-emerald-50 hover:text-emerald-600", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon className="rtl:rotate-180" />
      <span className="sr-only">Toggle Filters</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Filters"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Filters"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize rtl:in-data-[side=left]:cursor-e-resize in-data-[side=right]:cursor-e-resize rtl:in-data-[side=right]:cursor-w-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize rtl:[[data-side=left][data-state=collapsed]_&]:cursor-w-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize rtl:[[data-side=right][data-state=collapsed]_&]:cursor-e-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 rtl:group-data-[collapsible=offcanvas]:-translate-x-0 group-data-[collapsible=offcanvas]:after:start-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-end-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-start-2",
        className
      )}
      {...props}
    />
  )
}

// Simplified versions of missing components
function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

// Stub components to satisfy exports
function SidebarGroupAction(props: any) { return null }
function SidebarGroupContent(props: any) { return null }
function SidebarGroupLabel(props: any) { return null }
function SidebarMenu(props: any) { return null }
function SidebarMenuItem(props: any) { return null }
function SidebarMenuAction(props: any) { return null }
function SidebarMenuBadge(props: any) { return null }
function SidebarMenuButton(props: any) { return null }
function SidebarMenuSkeleton(props: any) { return null }
function SidebarMenuSub(props: any) { return null }
function SidebarMenuSubButton(props: any) { return null }
function SidebarMenuSubItem(props: any) { return null }

// Export all components
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
  FilterSidebar,
  type FilterState,
  type FilterSidebarProps,
};