import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Reusable card with glassmorphism and dynamic image
function CategoryCard({ title, path }: { title: string; path: string }) {
  const imageUrl = `https://source.unsplash.com/400x300/?${encodeURIComponent(title)}`;
  return (
    <Link
      to={path}
      className="group relative block w-full overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-t-md mb-2"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors group-hover:text-primary">
          {title}
        </h3>
        <span className="inline-flex items-center gap-1 text-primary font-medium opacity-0 transition-opacity group-hover:opacity-100">
          Explore <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export default function ShopByCategory() {
  const categories = [
    "Hair",
    "Skin",
    "Baby",
    "Beverages",
    "Body",
    "Food",
    "Health & Wellness",
    "Poojas",
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-background via-muted to-background">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <h2 className="text-4xl font-extrabold text-foreground text-center mb-4">
          Shop by Category
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Explore our thoughtfully curated range of natural herbal products, crafted to support your journey to wellness.
        </p>
        {/* Responsive grid of category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat} title={cat} path={`/shop?category=${encodeURIComponent(cat)}`} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-colors hover:bg-primary/90"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
