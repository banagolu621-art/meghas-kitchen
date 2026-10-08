import { useMemo, useState } from "react"

type Page = "home" | "shop" | "product" | "cake" | "reorder" | "confirmation" | "tracking" | "about" | "faq" | "contact" | "policy"
type CheckoutStep = "contact" | "otp" | "delivery" | "payment"
type PolicyType = "terms" | "privacy" | "refund" | "cancellation" | "delivery"

const images = {
  hero: "https://images.unsplash.com/photo-1642453031286-8991becafe19?auto=format&fit=crop&w=1800&q=88",
  brownie:
    "https://images.unsplash.com/photo-1691691214692-d4a3cace1afe?auto=format&fit=crop&w=1000&q=86",
  brownieStack:
    "https://images.unsplash.com/photo-1725791841570-06fa54408b45?auto=format&fit=crop&w=1000&q=86",
  cookie:
    "https://images.unsplash.com/photo-1635585817892-99fdf85c8d33?auto=format&fit=crop&w=1000&q=86",
  cake: "https://images.unsplash.com/photo-1683480711277-cf0165ac56e8?auto=format&fit=crop&w=1000&q=86",
  darkCake:
    "https://images.unsplash.com/photo-1586980026384-5d7f1e6297a2?auto=format&fit=crop&w=1000&q=86",
  coffee:
    "https://images.unsplash.com/photo-1560788843-b93c2f18a3e4?auto=format&fit=crop&w=1000&q=86",
}

const products = [
  {
    id: 1,
    name: "Double Chocolate Protein Brownie",
    price: 199,
    kcal: 148,
    protein: 12,
    badge: "High Protein",
    type: "Brownies",
    image: images.brownie,
  },
  {
    id: 2,
    name: "Sea Salt Protein Cookie",
    price: 179,
    kcal: 165,
    protein: 10,
    badge: "High Protein",
    type: "Cookies",
    image: images.cookie,
  },
  {
    id: 3,
    name: "Dark Chocolate Hazelnut Cookie",
    price: 189,
    kcal: 142,
    protein: 7,
    badge: "Eggless",
    type: "Cookies",
    image: images.coffee,
  },
  {
    id: 4,
    name: "Craving Sampler",
    price: 599,
    kcal: 148,
    protein: 11,
    badge: "Bestseller",
    type: "Packs",
    image: images.brownieStack,
  },
  {
    id: 5,
    name: "Banana Walnut Healthy Cake",
    price: 399,
    kcal: 172,
    protein: 8,
    badge: "Eggless",
    type: "Cakes",
    image: images.cake,
  },
  {
    id: 6,
    name: "Date & Nut Ladoo",
    price: 249,
    kcal: 118,
    protein: 5,
    badge: "Refined Sugar-Free",
    type: "Packs",
    image: images.darkCake,
  },
  {
    id: 7,
    name: "Protein Energy Bites",
    price: 299,
    kcal: 136,
    protein: 9,
    badge: "High Protein",
    type: "Packs",
    image: images.brownieStack,
  },
  {
    id: 8,
    name: "Dark Chocolate Celebration Cake",
    price: 699,
    kcal: 210,
    protein: 9,
    badge: "24h Preorder",
    type: "Cakes",
    image: images.darkCake,
  },
]

const cravings = [
  "Post-Gym",
  "Chocolate Craving",
  "Under 150 Calories",
  "High Protein",
  "Eggless",
  "Late-Night Craving",
  "Gifting",
  "Celebration Cakes",
]

const productDescriptions: Record<number, string> = {
  1: "Fudgy dark chocolate brownie with a soft centre.",
  2: "Chewy protein cookie finished with flaky sea salt.",
  3: "Dark chocolate cookie with roasted hazelnuts.",
  4: "A mixed box of our most-loved healthy desserts.",
  5: "Soft banana cake with toasted walnuts.",
  6: "Naturally sweet date and nut bites.",
  7: "Chocolate energy bites for an easy protein boost.",
  8: "Deep chocolate celebration cake with silky ganache.",
}

function sizedImage(url: string, width: number) {
  return url.replace(/w=\d+/, `w=${width}`)
}

function Icon({
  name,
}: {
  name: "menu" | "bag" | "pin" | "search" | "close" | "arrow" | "whatsapp"
}) {
  const paths = {
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4 4" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" />
        <path d="M9 8.5c.5 3 2 4.5 5 5" />
      </>
    ),
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  onClick,
  kind = "primary",
  disabled = false,
  className = "",
  type = "button",
}: {
  children: React.ReactNode
  onClick?: () => void
  kind?: "primary" | "secondary" | "ghost"
  disabled?: boolean
  className?: string
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      className={`button ${kind} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="logo"
      onClick={onClick}
      aria-label="Megha's Kitchen home"
    >
      <span className="logo-mark">M</span>
      <span>
        Megha's <i>Kitchen</i>
      </span>
    </button>
  )
}

function Header({
  page,
  setPage,
  count,
  openCart,
  openLocation,
  openMenu,
  openSearch,
  goShop,
}: {
  page: Page
  setPage: (p: Page) => void
  count: number
  openCart: () => void
  openLocation: () => void
  openMenu: () => void
  openSearch: () => void
  goShop: (filter?: string) => void
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="icon-button mobile-only menu-trigger"
          aria-label="Open navigation menu"
          onClick={openMenu}
        >
          <Icon name="menu" />
        </button>
        <Logo onClick={() => setPage("home")} />
        <nav className="nav" aria-label="Main navigation">
          <button
            className={page === "shop" ? "active" : ""}
            onClick={() => goShop()}
          >
            Shop
          </button>
          <button onClick={() => goShop("High Protein")}>High Protein</button>
          <button onClick={() => goShop("Under 150 Calories")}>
            Under 150 Calories
          </button>
          <button onClick={() => goShop("Eggless")}>Eggless / Vegan</button>
          <button onClick={() => setPage("reorder")}>Gifting</button>
          <button onClick={() => setPage("cake")}>Celebration Cakes</button>
        </nav>
        <div className="header-actions">
          <button className="location desktop-only" onClick={openLocation}>
            <Icon name="pin" />
            <span>Sheopur · 476337</span>
          </button>
          <button
            className="icon-button desktop-only"
            aria-label="Search desserts"
            onClick={openSearch}
          >
            <Icon name="search" />
          </button>
          <button
            className="cart-button"
            onClick={openCart}
            aria-label={`Open cart with ${count} items`}
          >
            <Icon name="bag" />
            {count > 0 && <span>{count}</span>}
          </button>
        </div>
      </div>
      <button className="mobile-location mobile-only" onClick={openLocation}>
        <span className="mobile-location-label">
          <Icon name="pin" /> Sheopur · 35–45 min
        </span>
        <span>Change</span>
      </button>
    </header>
  )
}

function ProductCard({
  product,
  add,
  open,
  compact = false,
}: {
  product: typeof products[number]
  add: (id: number) => void
  open: (id: number) => void
  compact?: boolean
}) {
  const soldOut = product.id === 7
  return (
    <article className={`product-card ${compact ? "compact" : ""}`}>
      <button
        className="product-image"
        onClick={() => (product.id === 8 ? open(8) : open(product.id))}
        aria-label={`View ${product.name}`}
      >
        <img
          src={sizedImage(product.image, 640)}
          srcSet={`${sizedImage(product.image, 360)} 360w, ${sizedImage(product.image, 640)} 640w, ${product.image} 1000w`}
          sizes="(max-width: 720px) 50vw, (max-width: 1050px) 45vw, 25vw"
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <span className="product-badge">{product.badge}</span>
        {soldOut && <span className="sold-overlay">Sold out today</span>}
      </button>
      <div className="product-copy">
        <button className="product-title" onClick={() => open(product.id)}>
          {product.name}
        </button>
        <p className="product-description">{productDescriptions[product.id]}</p>
        <div className="macro-line">
          {product.kcal} kcal <span>·</span> {product.protein}g protein
        </div>
        <div className="product-bottom">
          <strong>₹{product.price}</strong>
          {soldOut ? (
            <button
              className="text-button"
              onClick={() =>
                alert(
                  "We'll notify you on WhatsApp for tomorrow's 11 AM batch.",
                )
              }
            >
              Notify me
            </button>
          ) : (
            <button className="add-button" onClick={() => add(product.id)}>
              Add <span>+</span>
            </button>
          )}
        </div>
        {soldOut && <small>Next batch: Tomorrow, 11 AM</small>}
      </div>
    </article>
  )
}

function Home({
  setPage,
  add,
  openProduct,
}: {
  setPage: (p: Page) => void
  add: (id: number) => void
  openProduct: (id: number) => void
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Freshly baked in Sheopur</p>
          <h1>
            Dessert that fits <em>your macros.</em>
          </h1>
          <p className="hero-text">
            High-protein, lower-sugar desserts made fresh in Sheopur and
            delivered to your door.
          </p>
          <div className="hero-actions">
            <Button onClick={() => setPage("shop")}>
              Shop desserts <Icon name="arrow" />
            </Button>
            <span className="trust-dot">Freshly delivered in ~45 minutes</span>
          </div>
          <p className="hero-location">
            <span /> Now delivering in Sheopur · 476337
          </p>
        </div>
        <div className="hero-photo">
          <img
            src={images.hero}
            srcSet={`${sizedImage(images.hero, 720)} 720w, ${sizedImage(images.hero, 1200)} 1200w, ${images.hero} 1800w`}
            sizes="(max-width: 720px) 100vw, 56vw"
            alt="Stack of rich, fudgy chocolate brownies"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-note">
            12g protein
            <br />
            <span>in every brownie</span>
          </div>
          <div className="hero-stamp">
            Small batch
            <br />
            Big craving
          </div>
        </div>
      </section>

      <section className="section craving-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pick your mood</p>
            <h2>What are you craving?</h2>
          </div>
          <Button kind="ghost" onClick={() => setPage("shop")}>
            View everything <Icon name="arrow" />
          </Button>
        </div>
        <div className="craving-row">
          {cravings.map((item, i) => (
            <button
              key={item}
              className={`craving-card tone-${i % 4}`}
              onClick={() =>
                item === "Celebration Cakes" ? setPage("cake") : setPage("shop")
              }
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item}
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Customer favourites</p>
            <h2>The good stuff</h2>
          </div>
          <p>Indulgent first. Thoughtfully made, always.</p>
        </div>
        <div className="product-grid home-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} add={add} open={openProduct} />
          ))}
        </div>
      </section>

      <section className="proof">
        {[
          ["01", "Transparent macros", "Know exactly what you're eating."],
          ["02", "Freshly baked", "Made in small batches every day."],
          ["03", "Lower sugar", "Built for cravings, not sugar crashes."],
          ["04", "Fast delivery", "At your door in around 45 minutes."],
        ].map(([n, title, text]) => (
          <div key={title}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <section className="gift-banner">
        <div>
          <p className="eyebrow">Good gifting, sorted</p>
          <h2>
            Team treat without the
            <br />
            food-policy headache.
          </h2>
          <p>
            Eggless, high-protein and lower-sugar options everyone can enjoy.
          </p>
          <Button onClick={() => setPage("reorder")}>
            Explore gifting <Icon name="arrow" />
          </Button>
        </div>
        <img
          src={sizedImage(images.darkCake, 1000)}
          srcSet={`${sizedImage(images.darkCake, 640)} 640w, ${images.darkCake} 1000w`}
          sizes="(max-width: 720px) 100vw, 50vw"
          alt="Premium dark chocolate cake for gifting"
          loading="lazy"
          decoding="async"
        />
      </section>
    </main>
  )
}

function FilterGroup({
  title,
  options,
  active,
  toggle,
}: {
  title: string
  options: string[]
  active: string[]
  toggle: (v: string) => void
}) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {options.map((o) => (
        <label key={o}>
          <input
            type="checkbox"
            checked={active.includes(o)}
            onChange={() => toggle(o)}
          />
          <span className="check" />
          {o}
        </label>
      ))}
    </fieldset>
  )
}

function Shop({
  active,
  toggle,
  clear,
  add,
  openProduct,
  openMobileFilters,
}: {
  active: string[]
  toggle: (v: string) => void
  clear: () => void
  add: (id: number) => void
  openProduct: (id: number) => void
  openMobileFilters: () => void
}) {
  const [sort, setSort] = useState("popular")
  const filtered = useMemo(() => {
    const matches = products.filter((p) => {
      if (!active.length) return true
      return active.every((f) =>
        f === "Under 150 Calories"
          ? p.kcal < 150
          : f === "High Protein"
            ? p.protein >= 10
            : ["Eggless", "Refined Sugar-Free"].includes(f)
              ? p.badge === f
              : f === "Vegan"
                ? p.id === 6
                : p.type === f,
      )
    })
    if (sort === "low") return [...matches].sort((a, b) => a.price - b.price)
    if (sort === "protein")
      return [...matches].sort((a, b) => b.protein - a.protein)
    return matches
  }, [active, sort])
  return (
    <main className="shop-page">
      <div className="shop-intro">
        <p className="eyebrow">Freshly made today</p>
        <h1>Shop all desserts</h1>
        <p>
          Big chocolate energy. Thoughtful ingredients. Nothing clinical about
          it.
        </p>
      </div>
      <div className="shop-layout">
        <aside className="filters desktop-only">
          <div className="filter-title">
            <strong>Filters</strong>
            {active.length > 0 && <button onClick={clear}>Clear all</button>}
          </div>
          <FilterGroup
            title="Goal"
            options={["High Protein", "Under 150 Calories"]}
            active={active}
            toggle={toggle}
          />
          <FilterGroup
            title="Dietary"
            options={["Eggless", "Vegan", "Refined Sugar-Free"]}
            active={active}
            toggle={toggle}
          />
          <FilterGroup
            title="Product type"
            options={["Brownies", "Cookies", "Packs", "Cakes"]}
            active={active}
            toggle={toggle}
          />
        </aside>
        <section className="results">
          <div className="results-bar">
            <span>{filtered.length} desserts</span>
            <button
              className="mobile-filter mobile-only"
              onClick={openMobileFilters}
            >
              Filter {active.length > 0 && `(${active.length})`}
            </button>
            <select
              aria-label="Sort desserts"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="popular">Most popular</option>
              <option value="low">Price: Low to high</option>
              <option value="protein">Highest protein</option>
            </select>
          </div>
          {active.length > 0 && (
            <div className="active-filters">
              {active.map((f) => (
                <button key={f} onClick={() => toggle(f)}>
                  {f} ×
                </button>
              ))}
            </div>
          )}
          {filtered.length ? (
            <div className="product-grid listing-grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  add={add}
                  open={openProduct}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No exact matches</h2>
              <p>Try clearing a filter. The brownies are worth it.</p>
              <Button onClick={clear}>Clear all filters</Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Accordion({
  title,
  children,
  danger = false,
}: {
  title: string
  children: React.ReactNode
  danger?: boolean
}) {
  const [open, setOpen] = useState(danger)
  return (
    <div className={`accordion ${danger ? "danger" : ""}`}>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>
          {danger && <b>!</b>}
          {title}
        </span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  )
}

function ProductDetail({
  add,
  setPage,
}: {
  add: (id: number) => void
  setPage: (p: Page) => void
}) {
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState(images.brownie)
  return (
    <main className="detail-page">
      <button className="back-link" onClick={() => setPage("shop")}>
        ← Back to desserts
      </button>
      <div className="detail-layout">
        <div className="gallery">
          <div className="main-image">
            <img
              src={selectedImage}
              alt="Double Chocolate Protein Brownie with a fudgy centre"
              decoding="async"
            />
            <span>Fresh batch</span>
          </div>
          <div className="thumbnails">
            {[images.brownie, images.brownieStack, images.coffee].map(
              (im, i) => (
                <button
                  key={im}
                  onClick={() => setSelectedImage(im)}
                  aria-label={`Show brownie view ${i + 1}`}
                >
                  <img
                    src={sizedImage(im, 180)}
                    alt={`Brownie view ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ),
            )}
          </div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Megha's bestseller</p>
          <h1>
            Double Chocolate
            <br />
            Protein Brownie
          </h1>
          <p className="description">
            Fudgy dark chocolate brownie with a soft centre and 12g protein. The
            kind of brownie you'd choose even without the macros.
          </p>
          <div className="detail-price">
            ₹199 <span>inclusive of taxes</span>
          </div>
          <div className="macro-panel">
            <div>
              <strong>148</strong>
              <span>kcal</span>
            </div>
            <div>
              <strong>12g</strong>
              <span>protein</span>
            </div>
            <div>
              <strong>7g</strong>
              <span>sugar</span>
            </div>
          </div>
          <div className="chips">
            <span>High Protein</span>
            <span>Eggless</span>
            <span>Refined Sugar-Free</span>
          </div>
          <div className="delivery-note">
            <Icon name="pin" />
            <div>
              <strong>Get it in Sheopur in ~35–45 mins</strong>
              <span>Delivering to 476337</span>
            </div>
          </div>
          <div className="purchase-row">
            <div className="quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <Button
              onClick={() => {
                for (let i = 0; i < qty; i++) add(1)
              }}
            >
              Add to cart — ₹{199 * qty}
            </Button>
          </div>
          <div className="accordions">
            <Accordion title="Nutrition">
              <dl>
                <div>
                  <dt>Calories</dt>
                  <dd>148 kcal</dd>
                </div>
                <div>
                  <dt>Protein</dt>
                  <dd>12g</dd>
                </div>
                <div>
                  <dt>Carbs</dt>
                  <dd>18g</dd>
                </div>
                <div>
                  <dt>Fat</dt>
                  <dd>6g</dd>
                </div>
                <div>
                  <dt>Sugar</dt>
                  <dd>7g</dd>
                </div>
              </dl>
            </Accordion>
            <Accordion title="Ingredients">
              <p>
                Dark chocolate, cocoa, almond flour, whey protein, yogurt,
                natural sweetener, sea salt and vanilla.
              </p>
            </Accordion>
            <Accordion title="Allergens" danger>
              <strong>Contains dairy and nuts.</strong>
              <p>Produced in a facility that handles gluten and soy.</p>
            </Accordion>
            <Accordion title="Storage">
              <p>Keep refrigerated. Best consumed within 3 days.</p>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="mobile-sticky mobile-only">
        <Button onClick={() => add(1)}>Add to cart — ₹199</Button>
      </div>
    </main>
  )
}

function CakePage({ add }: { add: (id: number) => void }) {
  return (
    <main className="detail-page cake-page">
      <div className="detail-layout">
        <div className="gallery">
          <div className="main-image">
            <img
              src={sizedImage(images.darkCake, 1000)}
              alt="Dark Chocolate Celebration Cake"
              decoding="async"
            />
            <span>Made to order</span>
          </div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Celebrations, thoughtfully made</p>
          <h1>Dark Chocolate Celebration Cake</h1>
          <p className="description">
            Deep chocolate sponge, silky ganache and a gently sweet finish.
            Serves 6–8.
          </p>
          <div className="detail-price">₹699</div>
          <div className="preorder-alert">
            <strong>24-hour preorder required</strong>
            <span>Choose tomorrow or a later delivery date.</span>
          </div>
          <div className="form-grid">
            <label>
              Delivery date
              <input type="date" min="2026-01-01" />
            </label>
            <label>
              Time slot
              <select>
                <option>11 AM – 1 PM</option>
                <option>4 PM – 6 PM</option>
                <option>7 PM – 9 PM</option>
              </select>
            </label>
            <label>
              Cake quantity
              <select>
                <option>1 cake</option>
                <option>2 cakes</option>
              </select>
            </label>
            <label>
              Message on cake
              <input placeholder="Happy birthday, Ria!" />
            </label>
            <label className="full">
              Custom requirements
              <textarea placeholder="Tell us about eggless preferences, colours or decoration." />
            </label>
          </div>
          <Button onClick={() => add(8)}>Add preorder to cart — ₹699</Button>
        </div>
      </div>
    </main>
  )
}

function CartDrawer({
  cart,
  close,
  change,
  remove,
  checkout,
}: {
  cart: Record<number, number>
  close: () => void
  change: (id: number, n: number) => void
  remove: (id: number) => void
  checkout: () => void
}) {
  const items = products
    .filter((p) => cart[p.id])
    .map((p) => ({ ...p, qty: cart[p.id] }))
  const subtotal = items.reduce((s, p) => s + p.price * p.qty, 0)
  return (
    <div className="overlay" onMouseDown={close}>
      <aside
        className="cart-drawer"
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Fresh from our kitchen</p>
            <h2>Your box</h2>
          </div>
          <button className="icon-button" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        {items.length ? (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={sizedImage(item.image, 180)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <div className="cart-item-bottom">
                      <div className="quantity small">
                        <button onClick={() => change(item.id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => change(item.id, 1)}>+</button>
                      </div>
                      <b>₹{item.price * item.qty}</b>
                    </div>
                    <button className="remove" onClick={() => remove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="delivery-progress">
              <div>
                <span>
                  ₹{Math.max(0, 450 - subtotal)} away from free delivery
                </span>
                <b>{Math.min(100, subtotal / 4.5).toFixed(0)}%</b>
              </div>
              <i>
                <span style={{ width: `${Math.min(100, subtotal / 4.5)}%` }} />
              </i>
            </div>
            {!cart[2] && (
              <button className="suggestion" onClick={() => change(2, 1)}>
                <img
                  src={sizedImage(images.cookie, 120)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <small>Pairs well with your box</small>
                  <strong>Add a Sea Salt Cookie</strong>
                </span>
                <b>+ ₹179</b>
              </button>
            )}
            <div className="cart-footer">
              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <Button onClick={checkout}>Checkout — ₹{subtotal}</Button>
              <Button kind="ghost" onClick={close}>
                Continue shopping
              </Button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-bag">
              <Icon name="bag" />
            </div>
            <h3>Your box is empty</h3>
            <p>Let's fix that with something chocolatey.</p>
            <Button onClick={close}>Browse desserts</Button>
          </div>
        )}
      </aside>
    </div>
  )
}

function LocationModal({ close }: { close: () => void }) {
  const [pin, setPin] = useState("")
  const [checked, setChecked] = useState(false)
  const supported = pin === "476337"
  return (
    <div className="overlay centered" onMouseDown={close}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close icon-button" onClick={close}>
          <Icon name="close" />
        </button>
        <p className="eyebrow">Delivery check</p>
        <h2>
          Where should we send
          <br />
          the good stuff?
        </h2>
        <label>
          Enter pincode or area
          <input
            value={pin}
            onChange={(e) => {
              setPin(e.target.value)
              setChecked(false)
            }}
            placeholder="e.g. 476337"
          />
        </label>
        <Button onClick={() => setChecked(true)}>Check delivery</Button>
        {checked &&
          (supported ? (
            <div className="location-result success">
              <strong>
                <span>✓</span> We deliver to Sheopur
              </strong>
              <p>Estimated delivery: 35–45 minutes</p>
              <Button onClick={close}>Start ordering</Button>
            </div>
          ) : (
            <div className="location-result unsupported">
              <strong>We're not delivering here yet.</strong>
              <p>
                Drop your number and we'll WhatsApp you when we launch in your
                area.
              </p>
              <Button
                kind="secondary"
                onClick={() => alert("We'll keep you posted on WhatsApp.")}
              >
                <Icon name="whatsapp" /> Notify me on WhatsApp
              </Button>
            </div>
          ))}
      </div>
    </div>
  )
}

function MobileFilters({
  active,
  toggle,
  clear,
  close,
  resultCount,
}: {
  active: string[]
  toggle: (v: string) => void
  clear: () => void
  close: () => void
  resultCount: number
}) {
  return (
    <div className="overlay bottom-overlay" onMouseDown={close}>
      <div className="bottom-sheet" onMouseDown={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="drawer-header">
          <h2>Filter desserts</h2>
          <button className="icon-button" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <FilterGroup
          title="Goal"
          options={["High Protein", "Under 150 Calories"]}
          active={active}
          toggle={toggle}
        />
        <FilterGroup
          title="Dietary"
          options={["Eggless", "Vegan", "Refined Sugar-Free"]}
          active={active}
          toggle={toggle}
        />
        <FilterGroup
          title="Product type"
          options={["Brownies", "Cookies", "Packs", "Cakes"]}
          active={active}
          toggle={toggle}
        />
        <div className="sheet-actions">
          <Button kind="ghost" onClick={clear}>
            Clear all
          </Button>
          <Button onClick={close}>Show {resultCount} desserts</Button>
        </div>
      </div>
    </div>
  )
}

function Checkout({
  step,
  setStep,
  total,
  finish,
  cancel,
}: {
  step: CheckoutStep
  setStep: (s: CheckoutStep) => void
  total: number
  finish: () => void
  cancel: () => void
}) {
  const visible = step === "otp" ? "contact" : step
  const [payment, setPayment] = useState("Google Pay")
  const [resent, setResent] = useState(false)
  const validateAndContinue = (next: CheckoutStep) => {
    const invalid = Array.from(
      document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        ".checkout-card input[required], .checkout-card textarea[required]",
      ),
    ).find((field) => !field.checkValidity())
    if (invalid) {
      invalid.reportValidity()
      invalid.focus()
      return
    }
    setStep(next)
  }
  return (
    <main className="checkout-page">
      <div className="checkout-top">
        <Logo onClick={cancel} />
        <span>Secure checkout</span>
      </div>
      <div className="checkout-shell">
        <div className="progress">
          {["contact", "delivery", "payment"].map((s, i) => (
            <div
              className={
                visible === s
                  ? "active"
                  : ["contact", "delivery", "payment"].indexOf(visible) > i
                    ? "done"
                    : ""
              }
              key={s}
            >
              <span>{i + 1}</span>
              {s[0].toUpperCase() + s.slice(1)}
            </div>
          ))}
        </div>
        <section className="checkout-card">
          {step === "contact" && (
            <>
              <p className="eyebrow">Step 1 of 3</p>
              <h1>Where should we send order updates?</h1>
              <label>
                Mobile number
                <div className="phone-input">
                  <span>+91</span>
                  <input
                    inputMode="tel"
                    placeholder="98765 43210"
                    required
                    pattern="[0-9 ]{10,}"
                  />
                </div>
              </label>
              <p className="form-note">
                We'll use this only for your order and delivery updates.
              </p>
              <Button onClick={() => validateAndContinue("otp")}>
                Send OTP
              </Button>
            </>
          )}
          {step === "otp" && (
            <>
              <p className="eyebrow">Verify your number</p>
              <h1>Enter 6-digit code</h1>
              <p>We sent a code to +91 98765 43210.</p>
              <label>
                One-time password
                <input
                  className="otp-input"
                  inputMode="numeric"
                  maxLength={6}
                  minLength={6}
                  pattern="[0-9]{6}"
                  required
                  placeholder="— — — — — —"
                />
              </label>
              <Button onClick={() => validateAndContinue("delivery")}>
                Verify & continue
              </Button>
              <button
                className="resend"
                type="button"
                onClick={() => setResent(true)}
              >
                {resent ? "New code sent" : "Resend code in 00:24"}
              </button>
            </>
          )}
          {step === "delivery" && (
            <>
              <p className="eyebrow">Step 2 of 3</p>
              <h1>Delivery address</h1>
              <div className="form-grid">
                <label>
                  Name
                  <input placeholder="Full name" required />
                </label>
                <label>
                  Flat / building
                  <input placeholder="Flat 4B, Shree Residency" required />
                </label>
                <label className="full">
                  Street
                  <input placeholder="Street or road" required />
                </label>
                <label>
                  Area
                  <input defaultValue="Sheopur" required />
                </label>
                <label>
                  Pincode
                  <input defaultValue="476337" required pattern="476337" />
                </label>
                <label>
                  City
                  <input defaultValue="Sheopur" required />
                </label>
                <label>
                  State
                  <input defaultValue="Madhya Pradesh" required />
                </label>
                <label className="full">
                  Landmark — optional
                  <input placeholder="Near landmark" />
                </label>
                <label className="full">
                  Delivery instructions — optional
                  <textarea placeholder="Gate instructions, call on arrival..." />
                </label>
              </div>
              <div className="availability">
                ✓ Delivery available · ~35–45 minutes
              </div>
              <Button onClick={() => validateAndContinue("payment")}>
                Continue to payment
              </Button>
            </>
          )}
          {step === "payment" && (
            <>
              <p className="eyebrow">Step 3 of 3</p>
              <h1>Choose payment</h1>
              <div className="payment-feature">
                <div>
                  <span className="upi">UPI</span>
                  <div>
                    <strong>Pay with UPI</strong>
                    <p>Fast, secure and recommended</p>
                  </div>
                  <input
                    type="radio"
                    checked={[
                      "Google Pay",
                      "PhonePe",
                      "Paytm",
                      "Other UPI",
                    ].includes(payment)}
                    readOnly
                    aria-label="UPI selected"
                  />
                </div>
                <div className="upi-options">
                  {["Google Pay", "PhonePe", "Paytm", "Other UPI"].map((x) => (
                    <button
                      key={x}
                      type="button"
                      aria-pressed={payment === x}
                      onClick={() => setPayment(x)}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>
              <div className="other-payments">
                {["Wallet", "Card", "Cash on Delivery"].map((x) => (
                  <label key={x}>
                    <span>{x}</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === x}
                      onChange={() => setPayment(x)}
                    />
                  </label>
                ))}
              </div>
              <div className="pay-summary">
                <span>Order total</span>
                <strong>₹{total || 468}</strong>
              </div>
              <Button onClick={finish}>Pay ₹{total || 468}</Button>
            </>
          )}
        </section>
        <aside className="order-summary desktop-only">
          <p className="eyebrow">Your order</p>
          <h2>Freshness, incoming.</h2>
          <div className="summary-item">
            <img
              src={sizedImage(images.brownie, 120)}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span>
              <strong>Double Chocolate Protein Brownie</strong>
              <small>Qty 1</small>
            </span>
            <b>₹199</b>
          </div>
          <div className="summary-item">
            <img
              src={sizedImage(images.cookie, 120)}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span>
              <strong>Sea Salt Protein Cookie</strong>
              <small>Qty 1</small>
            </span>
            <b>₹179</b>
          </div>
          <hr />
          <div>
            <span>Subtotal</span>
            <b>₹378</b>
          </div>
          <div>
            <span>Delivery</span>
            <b>₹90</b>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <b>₹{total || 468}</b>
          </div>
        </aside>
      </div>
    </main>
  )
}

function Confirmation({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main className="status-page">
      <div className="status-visual">
        <span className="steam s1" />
        <span className="steam s2" />
        <img
          src={sizedImage(images.brownieStack, 480)}
          alt="Fresh chocolate brownies being prepared"
          decoding="async"
        />
      </div>
      <p className="eyebrow">Order #HD1024 confirmed</p>
      <h1>
        Your dessert is
        <br />
        <em>being prepared</em>
      </h1>
      <p className="status-eta">
        Arriving around <strong>7:40–7:55 PM</strong>
      </p>
      <Timeline current={1} />
      <div className="status-actions">
        <Button onClick={() => setPage("tracking")}>
          Track order <Icon name="arrow" />
        </Button>
        <Button kind="ghost" onClick={() => setPage("home")}>
          Continue shopping
        </Button>
      </div>
      <p className="whatsapp-note">
        <Icon name="whatsapp" /> We'll also send updates on WhatsApp.
      </p>
    </main>
  )
}

function Timeline({ current }: { current: number }) {
  return (
    <div className="timeline">
      {["Order received", "Preparing", "Out for delivery", "Delivered"].map(
        (s, i) => (
          <div
            className={i < current ? "done" : i === current ? "current" : ""}
            key={s}
          >
            <span>{i < current ? "✓" : i + 1}</span>
            <b>{s}</b>
          </div>
        ),
      )}
    </div>
  )
}

function Tracking() {
  return (
    <main className="tracking-page">
      <div className="tracking-hero">
        <p className="eyebrow">Order #HD1024</p>
        <h1>
          Your brownies
          <br />
          are on the way
        </h1>
        <p>Estimated arrival</p>
        <strong>7:40–7:55 PM</strong>
      </div>
      <div className="tracking-card">
        <div className="current-status">
          <span />
          <div>
            <small>Current status</small>
            <h2>Preparing</h2>
            <p>Megha's kitchen is baking your order fresh.</p>
          </div>
        </div>
        <Timeline current={1} />
        <div className="order-details">
          <div>
            <span>Items</span>
            <strong>
              1 × Protein Brownie
              <br />1 × Sea Salt Cookie
            </strong>
          </div>
          <div>
            <span>Delivering to</span>
            <strong>
              Flat 4B, Sheopur
              <br />
              Madhya Pradesh 476337
            </strong>
          </div>
          <div>
            <span>Payment</span>
            <strong>UPI · ₹468 paid</strong>
          </div>
        </div>
        <Button
          kind="secondary"
          onClick={() => alert("Opening WhatsApp support.")}
        >
          <Icon name="whatsapp" /> Need help? WhatsApp us
        </Button>
      </div>
    </main>
  )
}

function Reorder({
  checkout,
  edit,
}: {
  checkout: () => void
  edit: () => void
}) {
  return (
    <main className="reorder-page">
      <div className="reorder-card">
        <div className="reorder-image">
          <img
            src={sizedImage(images.brownieStack, 1000)}
            alt="Your previous brownie order"
            decoding="async"
          />
          <span>Last ordered 2 weeks ago</span>
        </div>
        <div className="reorder-copy">
          <p className="eyebrow">Good to see you again</p>
          <h1>
            Your favourite
            <br />
            is waiting
          </h1>
          <div className="previous-order">
            <div>
              <span>2 ×</span>
              <strong>Double Chocolate Protein Brownie</strong>
              <b>₹398</b>
            </div>
            <div>
              <span>1 ×</span>
              <strong>Sea Salt Protein Cookie</strong>
              <b>₹179</b>
            </div>
          </div>
          <div className="saved-area">
            <Icon name="pin" />
            <span>
              Saved delivery area<strong>Sheopur · 476337</strong>
            </span>
          </div>
          <Button onClick={checkout}>Reorder for ₹577</Button>
          <Button kind="ghost" onClick={edit}>
            Edit order
          </Button>
          <p className="form-note">Payment confirmation is still required.</p>
        </div>
      </div>
    </main>
  )
}

function MobileMenu({
  close,
  navigate,
  goShop,
  openCart,
  openSearch,
}: {
  close: () => void
  navigate: (page: Page) => void
  goShop: (filter?: string) => void
  openCart: () => void
  openSearch: () => void
}) {
  const go = (page: Page) => {
    close()
    navigate(page)
  }
  const shop = (filter?: string) => {
    close()
    goShop(filter)
  }
  return (
    <div className="overlay menu-overlay" onMouseDown={close}>
      <aside
        className="mobile-menu"
        onMouseDown={(event) => event.stopPropagation()}
        aria-label="Mobile navigation"
      >
        <div className="drawer-header">
          <Logo onClick={() => go("home")} />
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close navigation menu"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav>
          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => shop()}>Shop</button>
          <button onClick={() => shop()}>All Desserts</button>
          <button
            onClick={() => {
              close()
              openSearch()
            }}
          >
            Search
          </button>
          <button onClick={() => shop("High Protein")}>High Protein</button>
          <button onClick={() => go("cake")}>Celebration Cakes</button>
          <button onClick={() => go("reorder")}>Gifting</button>
          <button onClick={() => go("about")}>About</button>
          <button onClick={() => go("faq")}>FAQs</button>
          <button onClick={() => go("contact")}>Contact</button>
          <button
            onClick={() => {
              close()
              openCart()
            }}
          >
            Cart
          </button>
        </nav>
        <div className="mobile-menu-note">
          <Icon name="pin" />
          <span>
            Delivering in Sheopur
            <strong>PIN 476337 · 35–45 min</strong>
          </span>
        </div>
      </aside>
    </div>
  )
}

function SearchOverlay({
  close,
  add,
  openProduct,
}: {
  close: () => void
  add: (id: number) => void
  openProduct: (id: number) => void
}) {
  const [query, setQuery] = useState("")
  const normalized = query.trim().toLowerCase()
  const results = products.filter((product) =>
    [product.name, product.type, product.badge, productDescriptions[product.id]]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  )
  const open = (id: number) => {
    close()
    openProduct(id)
  }
  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <div className="search-shell">
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault()
            ;(document.activeElement as HTMLElement | null)?.blur()
          }}
        >
          <Icon name="search" />
          <label className="sr-only" htmlFor="dessert-search">
            Search desserts
          </label>
          <input
            id="dessert-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search brownies, cookies, cake..."
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
          <button
            type="button"
            className="icon-button"
            onClick={close}
            aria-label="Close search"
          >
            <Icon name="close" />
          </button>
        </form>
        <div className="search-content">
          <div className="search-heading">
            <div>
              <p className="eyebrow">
                {normalized ? `${results.length} matches` : "Popular right now"}
              </p>
              <h2>
                {normalized ? `Results for “${query}”` : "Find your craving"}
              </h2>
            </div>
          </div>
          {results.length ? (
            <div className="product-grid search-results">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  add={(id) => {
                    close()
                    add(id)
                  }}
                  open={open}
                  compact
                />
              ))}
            </div>
          ) : (
            <div className="empty-state search-empty">
              <h2>No desserts found.</h2>
              <p>Try another search or explore all desserts.</p>
              <Button onClick={() => setQuery("")}>Reset search</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const policies: Record<PolicyType, {
  eyebrow: string
  title: string
  intro: string
  sections: [string, string][]
}> = {
  terms: {
    eyebrow: "Legal information",
    title: "Terms & Conditions",
    intro:
      "These terms explain how orders placed with Megha's Kitchen are handled. Business-specific legal details will be updated before launch.",
    sections: [
      [
        "Introduction",
        "By using this website, you agree to provide accurate information and use the ordering service lawfully.",
      ],
      [
        "Orders",
        "Orders are confirmed only after checkout is completed and confirmation is shown or sent.",
      ],
      [
        "Payments",
        "Available payment methods are displayed at checkout. Payment processing may be provided by a third-party service.",
      ],
      [
        "Product availability",
        "Fresh products are made in limited batches and may become unavailable. We will not create false availability.",
      ],
      [
        "Delivery",
        "Delivery is currently designed for supported addresses in Sheopur, Madhya Pradesh 476337.",
      ],
      [
        "User responsibilities",
        "Customers are responsible for accurate contact, address, dietary and delivery information.",
      ],
      [
        "Cancellations & refunds",
        "Requests are reviewed according to the cancellation and refund policies available on this website.",
      ],
      [
        "Intellectual property",
        "The Megha's Kitchen brand, original content and visual materials may not be reused without permission.",
      ],
      [
        "Contact information",
        "Use the Contact page or the clearly marked WhatsApp support option for assistance.",
      ],
    ],
  },
  privacy: {
    eyebrow: "Your information",
    title: "Privacy Policy",
    intro:
      "This prototype describes the information needed to fulfil local dessert orders. Final controller and retention details will be added before launch.",
    sections: [
      [
        "Information collected",
        "We may collect your name, phone number, delivery address and order preferences when you place an order.",
      ],
      [
        "How information is used",
        "Information is used to process orders, coordinate delivery, provide support and improve the service.",
      ],
      [
        "Order information",
        "Order contents, value, status and delivery instructions may be stored for fulfilment and support.",
      ],
      [
        "Payment information",
        "Payment credentials should be handled by the selected payment provider; Megha's Kitchen should not store full card or UPI credentials.",
      ],
      [
        "Cookies",
        "Essential cookies may be used for cart and checkout functionality. Any optional analytics should be disclosed before use.",
      ],
      [
        "Communication",
        "Order updates may be sent by SMS or WhatsApp when you provide consent.",
      ],
      [
        "Data security",
        "Reasonable safeguards should be used, while no online system can guarantee absolute security.",
      ],
      [
        "Third-party services",
        "Delivery, payment or messaging providers may process limited information required to provide their service.",
      ],
      [
        "User rights",
        "You may request access, correction or deletion of your information through the Contact page, subject to applicable requirements.",
      ],
      [
        "Contact information",
        "Use the Contact page for privacy questions. Verified email and phone details will be added before launch.",
      ],
    ],
  },
  refund: {
    eyebrow: "Order support",
    title: "Refund Policy",
    intro:
      "Because products are freshly prepared, refund requests are reviewed fairly based on the order and supporting information.",
    sections: [
      [
        "Refund eligibility",
        "Eligibility is assessed case by case after reviewing the order status and reported issue.",
      ],
      [
        "Damaged products",
        "Contact support promptly with the order number and a clear photo so the issue can be reviewed.",
      ],
      [
        "Incorrect orders",
        "If the delivered items do not match the confirmed order, contact support with the order number.",
      ],
      [
        "Request process",
        "Submit the request through Contact or WhatsApp with your order number and a description of the issue.",
      ],
      [
        "Refund timeline",
        "An estimated timeline will be confirmed after the request is approved and depends on the original payment method.",
      ],
      [
        "Non-refundable situations",
        "Requests may not be eligible where correct products were delivered as confirmed or where safe storage instructions were not followed.",
      ],
      [
        "Support",
        "No automatic outcome is promised. Megha's Kitchen will review each genuine concern and respond through the provided contact channel.",
      ],
    ],
  },
  cancellation: {
    eyebrow: "Order changes",
    title: "Cancellation Policy",
    intro:
      "Fresh desserts are prepared specifically for confirmed orders, so cancellation depends on preparation and delivery status.",
    sections: [
      [
        "How to request",
        "Use Contact or WhatsApp and include your confirmed order number.",
      ],
      [
        "Cancellation window",
        "Contact support as soon as possible. The available window will be confirmed based on whether preparation has begun.",
      ],
      [
        "Orders being prepared",
        "Once preparation has started, cancellation may not be possible because ingredients and kitchen time have already been committed.",
      ],
      [
        "Dispatched orders",
        "Orders that are already out for delivery generally cannot be cancelled through the website.",
      ],
      [
        "Refund handling",
        "Any approved refund will follow the Refund Policy and the original payment method's processing time.",
      ],
      [
        "Support",
        "The support team will confirm whether the request can be accepted; this page does not promise automatic cancellation.",
      ],
    ],
  },
  delivery: {
    eyebrow: "Fresh local delivery",
    title: "Delivery Policy",
    intro:
      "Megha's Kitchen is designed for local delivery in Sheopur District, Madhya Pradesh, India, with initial service focused on PIN 476337.",
    sections: [
      [
        "Delivery area",
        "Availability is checked by pincode before ordering. The current supported area shown in this prototype is Sheopur 476337.",
      ],
      [
        "Estimated time",
        "Typical delivery estimates are shown before checkout and may vary with preparation volume, distance, weather and road conditions.",
      ],
      [
        "Delivery charges",
        "Any delivery charge or free-delivery threshold is shown in the cart before checkout.",
      ],
      [
        "Order preparation",
        "Desserts are prepared in small batches. Celebration cakes require the preorder notice shown on their product page.",
      ],
      [
        "Delays",
        "If an unexpected delay occurs, an update should be sent through the contact method supplied with the order.",
      ],
      [
        "Failed delivery",
        "An unsuccessful attempt may occur when an address is incorrect, inaccessible or the customer cannot be reached.",
      ],
      [
        "Customer availability",
        "Please provide an accurate address and remain reachable during the estimated delivery window.",
      ],
      [
        "Support",
        "Use Contact or WhatsApp with your order number for delivery assistance.",
      ],
    ],
  },
}

function PolicyPage({
  type,
  navigate,
}: {
  type: PolicyType
  navigate: (page: Page) => void
}) {
  const policy = policies[type]
  return (
    <main className="info-page">
      <div className="info-hero">
        <button className="back-link" onClick={() => navigate("home")}>
          ← Back to home
        </button>
        <p className="eyebrow">{policy.eyebrow}</p>
        <h1>{policy.title}</h1>
        <p>{policy.intro}</p>
      </div>
      <div className="policy-sections">
        {policy.sections.map(([title, copy]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}
      </div>
      <div className="info-support">
        <h2>Still have a question?</h2>
        <p>Contact us and include your order number when relevant.</p>
        <Button onClick={() => navigate("contact")}>Contact support</Button>
      </div>
    </main>
  )
}

function FaqPage() {
  const faqs = [
    [
      "Where do you deliver?",
      "We currently show delivery availability for Sheopur, Madhya Pradesh, with initial service focused on PIN 476337.",
    ],
    [
      "How long does delivery take?",
      "Fresh local orders are typically estimated at 35–45 minutes. Your current estimate is shown before checkout.",
    ],
    [
      "Are the desserts healthy?",
      "Our range is designed with thoughtful ingredients, lower-sugar choices and transparent nutrition while keeping indulgence first.",
    ],
    [
      "What are the protein options?",
      "Use the High Protein filter to find brownies, cookies and bites with clearly listed protein information.",
    ],
    [
      "Do products contain nuts?",
      "Some products contain nuts, dairy, gluten or soy. Always review the visible allergen section on the product page before ordering.",
    ],
    [
      "How can I place an order?",
      "Choose a dessert, add it to your cart, confirm your Sheopur delivery address and complete payment at checkout.",
    ],
    [
      "Can I cancel an order?",
      "Contact support as soon as possible. Availability depends on whether fresh preparation or delivery has started.",
    ],
    [
      "How can I contact support?",
      "Open the Contact page or use the WhatsApp support action. Verified contact details will be added before launch.",
    ],
    [
      "Do you accept UPI?",
      "Yes. The checkout prioritizes UPI and also displays any other available payment methods.",
    ],
  ]
  return (
    <main className="info-page faq-page">
      <div className="info-hero">
        <p className="eyebrow">Quick answers</p>
        <h1>Frequently asked questions</h1>
        <p>Everything you need to know before the craving wins.</p>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <Accordion key={question} title={question}>
            <p>{answer}</p>
          </Accordion>
        ))}
      </div>
    </main>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <main className="info-page contact-page">
      <div className="info-hero">
        <p className="eyebrow">Local support</p>
        <h1>Let's talk dessert</h1>
        <p>
          For an existing order, include your order number so we can help
          quickly.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-options">
          <button
            onClick={() =>
              alert("WhatsApp support link will be added before launch.")
            }
          >
            <Icon name="whatsapp" />
            <span>
              <strong>WhatsApp</strong>
              <small>Support link coming before launch</small>
            </span>
            <Icon name="arrow" />
          </button>
          <button
            onClick={() =>
              alert("Instagram profile link will be added before launch.")
            }
          >
            <span className="social-mark">ig</span>
            <span>
              <strong>Instagram</strong>
              <small>Profile link coming before launch</small>
            </span>
            <Icon name="arrow" />
          </button>
          <div className="contact-location">
            <Icon name="pin" />
            <span>
              <strong>Business location</strong>
              <small>Sheopur District, Madhya Pradesh, India · 476337</small>
            </span>
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <label>
            Name
            <input required placeholder="Your name" />
          </label>
          <label>
            Mobile number
            <input required inputMode="tel" placeholder="+91" />
          </label>
          <label>
            How can we help?
            <textarea required placeholder="Tell us about your question." />
          </label>
          {submitted && (
            <p className="form-success" role="status">
              Your message has been captured in this prototype. Verified support
              delivery will be connected before launch.
            </p>
          )}
          <Button type="submit">Send message</Button>
        </form>
      </div>
    </main>
  )
}

function AboutPage() {
  return (
    <main className="info-page about-page">
      <div className="info-hero">
        <p className="eyebrow">Made locally in Sheopur</p>
        <h1>Dessert first. Better choices built in.</h1>
        <p>
          Megha's Kitchen makes premium, high-protein and lower-sugar desserts
          in small local batches—without losing the rich texture and chocolate
          satisfaction that make dessert worth ordering.
        </p>
      </div>
      <div className="proof about-proof">
        {[
          ["01", "Transparent macros", "Clear nutrition supports your choice."],
          ["02", "Fresh batches", "Made locally for Sheopur orders."],
          ["03", "Indulgence matters", "Dessert should taste like dessert."],
          ["04", "Local delivery", "Designed for a short, simple journey."],
        ].map(([number, title, copy]) => (
          <div key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

function Footer({
  setPage,
  setPolicy,
  goShop,
}: {
  setPage: (p: Page) => void
  setPolicy: (policy: PolicyType) => void
  goShop: (filter?: string) => void
}) {
  return (
    <footer>
      <div className="footer-brand">
        <Logo onClick={() => setPage("home")} />
        <p>Made fresh in Sheopur for cravings that deserve better.</p>
        <div className="footer-location">Sheopur · Madhya Pradesh · 476337</div>
      </div>
      <div>
        <strong>Shop</strong>
        <button onClick={() => goShop()}>All desserts</button>
        <button onClick={() => goShop("High Protein")}>High protein</button>
        <button onClick={() => setPage("cake")}>Celebration cakes</button>
        <button onClick={() => setPage("reorder")}>Gifting</button>
      </div>
      <div>
        <strong>Need to know</strong>
        <button onClick={() => setPolicy("delivery")}>Delivery areas</button>
        <button onClick={() => setPage("product")}>
          Ingredients & nutrition
        </button>
        <button onClick={() => setPage("faq")}>FAQs</button>
        <button onClick={() => setPage("contact")}>Contact</button>
      </div>
      <div>
        <strong>Stay close</strong>
        <button
          onClick={() =>
            alert("Instagram profile link will be added before launch.")
          }
        >
          Instagram
        </button>
        <button
          onClick={() =>
            alert("WhatsApp support link will be added before launch.")
          }
        >
          WhatsApp
        </button>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Megha's Kitchen</span>
        <nav aria-label="Legal policies">
          <button onClick={() => setPolicy("terms")}>Terms & Conditions</button>
          <button onClick={() => setPolicy("privacy")}>Privacy Policy</button>
          <button onClick={() => setPolicy("refund")}>Refund Policy</button>
          <button onClick={() => setPolicy("cancellation")}>
            Cancellation Policy
          </button>
          <button onClick={() => setPolicy("delivery")}>Delivery Policy</button>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [policy, setPolicyType] = useState<PolicyType>("terms")
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [mobileFilters, setMobileFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep | null>(null)
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = products.reduce((s, p) => s + (cart[p.id] || 0) * p.price, 0)
  const add = (id: number) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
    setCartOpen(true)
  }
  const change = (id: number, amount: number) =>
    setCart((c) => {
      const next = Math.max(0, (c[id] || 0) + amount)
      const copy = { ...c }
      if (!next) delete copy[id]
      else copy[id] = next
      return copy
    })
  const openProduct = (id: number) => {
    setPage(id === 8 ? "cake" : "product")
    window.scrollTo(0, 0)
  }
  const navigate = (p: Page) => {
    setPage(p)
    setMenuOpen(false)
    setSearchOpen(false)
    setCheckoutStep(null)
    window.scrollTo(0, 0)
  }
  const goShop = (filter?: string) => {
    setActiveFilters(filter ? [filter] : [])
    navigate("shop")
  }
  const showPolicy = (nextPolicy: PolicyType) => {
    setPolicyType(nextPolicy)
    navigate("policy")
  }
  const toggle = (f: string) =>
    setActiveFilters((a) =>
      a.includes(f) ? a.filter((x) => x !== f) : [...a, f],
    )
  const resultCount = products.filter((p) =>
    activeFilters.every((f) =>
      f === "Under 150 Calories"
        ? p.kcal < 150
        : f === "High Protein"
          ? p.protein >= 10
          : ["Eggless", "Refined Sugar-Free"].includes(f)
            ? p.badge === f
            : f === "Vegan"
              ? p.id === 6
              : p.type === f,
    ),
  ).length

  if (checkoutStep)
    return (
      <Checkout
        step={checkoutStep}
        setStep={setCheckoutStep}
        total={total}
        cancel={() => setCheckoutStep(null)}
        finish={() => {
          setCheckoutStep(null)
          setCart({})
          navigate("confirmation")
        }}
      />
    )

  return (
    <div className="app">
      <Header
        page={page}
        setPage={navigate}
        count={count}
        openCart={() => setCartOpen(true)}
        openLocation={() => setLocationOpen(true)}
        openMenu={() => setMenuOpen(true)}
        openSearch={() => setSearchOpen(true)}
        goShop={goShop}
      />
      {page === "home" && (
        <Home setPage={navigate} add={add} openProduct={openProduct} />
      )}
      {page === "shop" && (
        <Shop
          active={activeFilters}
          toggle={toggle}
          clear={() => setActiveFilters([])}
          add={add}
          openProduct={openProduct}
          openMobileFilters={() => setMobileFilters(true)}
        />
      )}
      {page === "product" && <ProductDetail add={add} setPage={navigate} />}
      {page === "cake" && <CakePage add={add} />}
      {page === "reorder" && (
        <Reorder
          checkout={() => setCheckoutStep("contact")}
          edit={() => navigate("shop")}
        />
      )}
      {page === "confirmation" && <Confirmation setPage={navigate} />}
      {page === "tracking" && <Tracking />}
      {page === "about" && <AboutPage />}
      {page === "faq" && <FaqPage />}
      {page === "contact" && <ContactPage />}
      {page === "policy" && <PolicyPage type={policy} navigate={navigate} />}
      {!["confirmation", "tracking"].includes(page) && (
        <Footer setPage={navigate} setPolicy={showPolicy} goShop={goShop} />
      )}
      {count > 0 && !cartOpen && (
        <button
          className="sticky-cart mobile-only"
          onClick={() => setCartOpen(true)}
        >
          <span>
            {count} {count === 1 ? "item" : "items"} · ₹{total}
          </span>
          <strong>
            View cart <Icon name="arrow" />
          </strong>
        </button>
      )}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          close={() => setCartOpen(false)}
          change={change}
          remove={(id) => change(id, -(cart[id] || 0))}
          checkout={() => {
            setCartOpen(false)
            setCheckoutStep("contact")
          }}
        />
      )}
      {locationOpen && <LocationModal close={() => setLocationOpen(false)} />}
      {menuOpen && (
        <MobileMenu
          close={() => setMenuOpen(false)}
          navigate={navigate}
          goShop={goShop}
          openCart={() => setCartOpen(true)}
          openSearch={() => setSearchOpen(true)}
        />
      )}
      {searchOpen && (
        <SearchOverlay
          close={() => setSearchOpen(false)}
          add={add}
          openProduct={openProduct}
        />
      )}
      {mobileFilters && (
        <MobileFilters
          active={activeFilters}
          toggle={toggle}
          clear={() => setActiveFilters([])}
          close={() => setMobileFilters(false)}
          resultCount={resultCount}
        />
      )}
    </div>
  )
}
