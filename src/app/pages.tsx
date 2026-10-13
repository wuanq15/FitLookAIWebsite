import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { formatVND, photos, products } from "./data";
import { useShop } from "./store";
import { Button, EmptyState, Icon, PageHeader, ProductCard } from "./ui";

const categories = [
  { label: "Áo", image: photos.hero, color: "purple" },
  { label: "Quần", image: photos.skate, color: "coral" },
  { label: "Váy", image: photos.pink, color: "pink" },
  { label: "Áo khoác", image: photos.blue, color: "lime" },
  { label: "Giày", image: photos.duo, color: "purple" },
  { label: "Phụ kiện", image: photos.white, color: "coral" },
];

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero__copy"><span className="eyebrow"><Icon name="sparkles" size={16} /> FASHION, POWERED BY YOU</span><h1>Your Style.<br /><em>Your Rules.</em></h1><p>Khám phá phong cách riêng, thử đồ bằng AI và tìm món đồ bạn yêu thích chỉ từ một bức ảnh.</p><div className="hero__buttons"><Link className="button button--coral" to="/shop">Khám phá bộ sưu tập <Icon name="arrow" /></Link><Link className="button button--light" to="/ai-try-on"><Icon name="sparkles" /> Thử đồ với AI</Link></div><div className="hero__proof"><div className="avatars"><img src={photos.green} alt="" /><img src={photos.blue} alt="" /><img src={photos.pink} alt="" /></div><p><b>AI Fashion Lab</b><br />Khám phá công nghệ thời trang mới</p></div></div>
        <div className="hero__visual"><span className="shape shape--one" /><span className="shape shape--two" /><img src={photos.hero} alt="Người mẫu mặc áo khoác màu sắc" /><div className="hero-tag"><span>NEW DROP</span><b>COLOR<br />THEORY</b><small>SS / 2025</small></div><div className="ai-float"><span><Icon name="sparkles" /></span><div><b>AI STYLE DISCOVERY</b><small>Phối đồ theo phong cách của bạn</small></div></div></div>
      </section>

      <section className="section categories"><div className="section-heading"><div><span>SHOP YOUR WAY</span><h2>Mặc gì hôm nay?</h2></div><Link to="/shop">Xem tất cả <Icon name="arrow" /></Link></div><div className="category-grid">{categories.map((category) => <Link className={`category category--${category.color}`} to={`/shop?category=${encodeURIComponent(category.label)}`} key={category.label}><img src={category.image} alt={`Danh mục ${category.label}`} /><span>{category.label}<i><Icon name="arrow" size={18} /></i></span></Link>)}</div></section>

      <ProductSection title="Mới và đáng để yêu" eyebrow="JUST LANDED" productsToShow={products.slice(0, 4)} />

      <section className="ai-showcase">
        <article className="feature-card feature-card--purple"><img src={photos.blue} alt="Trải nghiệm thử đồ AI" /><div className="feature-card__content"><span className="feature-icon"><Icon name="sparkles" /></span><small>VIRTUAL TRY-ON</small><h2>Thử trước.<br />Mua tự tin.</h2><p>Xem bản xem trước trang phục trên ảnh của bạn bằng công nghệ AI.</p><Link className="button button--light" to="/ai-try-on">Bắt đầu thử đồ <Icon name="arrow" /></Link></div></article>
        <article className="feature-card feature-card--coral"><div className="search-collage"><img src={photos.skate} alt="Ảnh tham khảo" /><div><Icon name="search" /><span>Đang tìm...</span></div><img src={photos.hero} alt="Sản phẩm tương tự" /></div><div className="feature-card__content"><span className="feature-icon"><Icon name="camera" /></span><small>VISUAL SEARCH</small><h2>Thấy ở đâu,<br />tìm thấy ở đây.</h2><p>Tải ảnh tham khảo để tìm các sản phẩm thời trang tương tự.</p><Link className="button button--dark" to="/visual-search">Tìm bằng hình ảnh <Icon name="arrow" /></Link></div></article>
      </section>

      <StylistSection />
      <ProductSection title="Dành riêng cho bạn" eyebrow="POPULAR RIGHT NOW" productsToShow={products.slice(4, 8)} note="Gợi ý phổ biến dành cho khách mới — chưa sử dụng lịch sử cá nhân." />
      <section className="newsletter"><span className="newsletter__star"><Icon name="sparkles" size={32} /></span><div><span>YOUR STYLE, FIRST</span><h2>Đừng bỏ lỡ điều thú vị.</h2><p>Nhận edit mới, mẹo phối đồ và những trải nghiệm AI đầu tiên.</p></div><form onSubmit={(e) => e.preventDefault()}><input aria-label="Email" type="email" placeholder="Email của bạn" /><button aria-label="Đăng ký"><Icon name="arrow" /></button></form></section>
    </main>
  );
}

function ProductSection({ title, eyebrow, productsToShow, note, id }: { title: string; eyebrow: string; productsToShow: typeof products; note?: string; id?: string }) {
  return <section className="section products-section" id={id}><div className="section-heading"><div><span>{eyebrow}</span><h2>{title}</h2>{note && <p className="section-note">{note}</p>}</div><Link to="/shop">Xem tất cả <Icon name="arrow" /></Link></div><div className="product-grid">{productsToShow.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>;
}

type FashionPageConfig = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  secondaryImage: string;
  categories: { label: string; image: string; query: string }[];
  featured: typeof products;
};

const menConfig: FashionPageConfig = {
  eyebrow: "FITLOOK MEN",
  title: "New codes for",
  accent: "modern men.",
  description: "Từ streetwear đầy năng lượng đến smart casual tinh gọn — khám phá những thiết kế dành cho nhịp sống hiện đại.",
  image: photos.blue,
  secondaryImage: photos.skate,
  categories: [
    { label: "Áo khoác", image: photos.blue, query: "Áo khoác" },
    { label: "Áo", image: photos.close, query: "Áo" },
    { label: "Quần", image: photos.skate, query: "Quần" },
    { label: "Streetwear", image: photos.duo, query: "" },
  ],
  featured: [products[5], products[2], products[0], products[7], products[6], products[3]],
};

const womenConfig: FashionPageConfig = {
  eyebrow: "FITLOOK WOMEN",
  title: "Wear your",
  accent: "own energy.",
  description: "Những phom dáng tự tin, sắc màu có chủ đích và cảm hứng mới cho phong cách mỗi ngày.",
  image: photos.pink,
  secondaryImage: photos.green,
  categories: [
    { label: "Váy", image: photos.pink, query: "Váy" },
    { label: "Áo", image: photos.green, query: "Áo" },
    { label: "Áo khoác", image: photos.hero, query: "Áo khoác" },
    { label: "Minimalist", image: photos.white, query: "" },
  ],
  featured: [products[4], products[1], products[3], products[0], products[6], products[7]],
};

function FashionPage({ config }: { config: FashionPageConfig }) {
  return <main className="fashion-page">
    <section className="fashion-hero fashion-hero--compact">
      <div className="fashion-hero__copy"><span>{config.eyebrow}</span><h1>{config.title}<br /><em>{config.accent}</em></h1><p>{config.description}</p><div><a className="button button--coral" href="#fashion-products">Xem sản phẩm <Icon name="arrow" /></a><Link className="button button--light" to="/ai-try-on"><Icon name="sparkles" /> Thử đồ với AI</Link></div></div>
      <div className="fashion-hero__images"><img className="fashion-hero__main" src={config.image} alt={`${config.eyebrow} editorial`} /><img className="fashion-hero__secondary" src={config.secondaryImage} alt="Chi tiết bộ sưu tập" /><span>NEW<br />SEASON</span></div>
    </section>
    <ProductSection eyebrow="SHOP THE LATEST" title="Sản phẩm mới nhất" productsToShow={config.featured} id="fashion-products" />
    <section className="fashion-categories"><div className="section-heading"><div><span>SHOP BY MOOD</span><h2>Chọn phong cách</h2></div><Link to="/shop">Xem tất cả <Icon name="arrow" /></Link></div><div>{config.categories.map((item) => <Link to={`/shop${item.query ? `?category=${encodeURIComponent(item.query)}` : ""}`} key={item.label}><img src={item.image} alt={item.label} /><span>{item.label}<Icon name="arrow" /></span></Link>)}</div></section>
    <section className="fashion-ai-banner"><div><span><Icon name="sparkles" size={16} /> FITLOOK AI</span><h2>Chưa chắc món này<br />có hợp với bạn?</h2><p>Thử trực tiếp trên ảnh của bạn trước khi quyết định.</p><Link className="button button--light" to={`/ai-try-on?product=${config.featured[0].id}`}>Thử ngay với AI <Icon name="arrow" /></Link></div><img src={config.secondaryImage} alt="Thử đồ với FitLook AI" /></section>
  </main>;
}

export function MenPage() {
  return <FashionPage config={menConfig} />;
}

export function WomenPage() {
  return <FashionPage config={womenConfig} />;
}

export function CollectionsPage() {
  const collections = [
    { name: "Color Theory", season: "SS / 2025", description: "Sắc màu tự tin cho những ngày không muốn hòa lẫn.", image: photos.hero, tone: "purple" },
    { name: "Quiet Form", season: "THE MINIMAL EDIT", description: "Phom dáng tinh gọn, bảng màu nhẹ và chất liệu dễ mặc.", image: photos.white, tone: "cloud" },
    { name: "After Class", season: "STREET / 02", description: "Streetwear linh hoạt từ giảng đường đến cuộc hẹn cuối ngày.", image: photos.skate, tone: "coral" },
  ];
  return <main className="collections-page">
    <section className="collections-hero"><span>FITLOOK EDITORIAL</span><h1>Bộ sưu tập dành cho<br /><em>mọi phiên bản của bạn.</em></h1><p>Khám phá những câu chuyện thời trang được FitLook tuyển chọn theo mùa, phong cách và khoảnh khắc.</p></section>
    <section className="collection-stories">{collections.map((collection, index) => <article className={`collection-story collection-story--${collection.tone}`} key={collection.name}><div className="collection-story__image"><img src={collection.image} alt={collection.name} /><span>0{index + 1}</span></div><div className="collection-story__copy"><span>{collection.season}</span><h2>{collection.name}</h2><p>{collection.description}</p><Link className={`button ${index === 0 ? "button--light" : "button--dark"}`} to="/shop">Khám phá bộ sưu tập <Icon name="arrow" /></Link></div></article>)}</section>
    <ProductSection eyebrow="ALL COLLECTIONS" title="Sản phẩm tuyển chọn" productsToShow={products.slice(0, 4)} />
  </main>;
}

function StylistSection() {
  const { addToCart } = useShop();
  const [style, setStyle] = useState("Streetwear");
  const outfit = style === "Minimalist" ? products.slice(1, 4) : products.slice(0, 3);
  return <section className="section outfit-section"><div className="outfit-copy"><span className="eyebrow">AI PERSONAL STYLIST</span><h2>Một outfit.<br />Mọi ánh nhìn.</h2><p>Chọn nhanh phong cách để xem một set đồ mẫu từ những sản phẩm có trong catalog.</p><div className="style-chips">{["Streetwear", "Minimalist", "Smart casual", "Đi học"].map((item) => <button key={item} className={style === item ? "active" : ""} onClick={() => setStyle(item)}>{item}</button>)}</div><div className="outfit-total"><span>Tổng outfit <b>{formatVND(outfit.reduce((sum, item) => sum + item.price, 0))}</b></span><Button variant="coral" onClick={() => outfit.forEach((item) => addToCart(item.id))}><Icon name="bag" /> Thêm cả set</Button></div><Link className="text-link" to="/stylist">Mở AI Stylist đầy đủ <Icon name="arrow" /></Link></div><div className="outfit-visual"><img className="outfit-main" src={style === "Minimalist" ? photos.white : photos.duo} alt={`Gợi ý outfit ${style}`} /><div className="outfit-items">{outfit.map((product) => <div key={product.id}><img src={product.image} alt={product.name} /><span><b>{product.name}</b><small>{formatVND(product.price)}</small></span><button aria-label="Thay sản phẩm">↻</button></div>)}</div></div></section>;
}

export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = params.get("category") || "";
  const query = params.get("q") || "";
  const sort = params.get("sort") || "popular";
  const filtered = useMemo(() => products.filter((product) => (!category || product.category === category || category === "Nam" || category === "Nữ") && product.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.id - b.id), [category, query, sort]);
  const setParam = (key: string, value: string) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next); };

  return <main>
    <section className="catalog-hero">
      <div className="catalog-hero__copy">
        <span className="catalog-eyebrow">FITLOOK CATALOG</span>
        <h1>Khám phá <em>phong cách</em><br />của bạn</h1>
        <p>Những thiết kế mới, được chọn để bạn thể hiện chất riêng.</p>
        <div className="catalog-hero__actions">
          <a className="button button--coral" href="#catalog-products">Khám phá bộ sưu tập <Icon name="arrow" /></a>
          <Link className="button button--light" to="/visual-search"><Icon name="camera" /> Tìm đồ bằng ảnh</Link>
        </div>
        <div className="catalog-hero__note"><span><Icon name="sparkles" size={15} /></span><p><b>Curated by FitLook</b> Những lựa chọn mới cho mọi phong cách.</p></div>
      </div>
      <div className="catalog-hero__visual">
        <div className="catalog-photo catalog-photo--main"><img src={photos.hero} alt="Người mẫu trong bộ sưu tập Color Theory" /><span>COLOR<br />THEORY</span></div>
        <div className="catalog-photo catalog-photo--small"><img src={photos.green} alt="Phong cách contemporary màu lime" /></div>
        <span className="catalog-orbit"><Icon name="sparkles" size={18} /> NEW EDIT</span>
      </div>
    </section>
    <section className="catalog-toolbar" id="catalog-products">
      <div className="catalog-count"><b>{filtered.length}</b><span>sản phẩm</span></div>
      <div className="search-field catalog-search"><Icon name="search" /><input aria-label="Tìm kiếm sản phẩm" value={query} onChange={(e) => setParam("q", e.target.value)} placeholder="Tìm áo, quần, phong cách..." /><Link className="visual-search-button" to="/visual-search" aria-label="Tìm kiếm sản phẩm bằng hình ảnh" title="Tìm bằng hình ảnh"><Icon name="camera" size={19} /><span>Tìm bằng ảnh</span></Link></div>
      <button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}>Bộ lọc <span>{category ? "1" : "0"}</span></button>
      <select aria-label="Sắp xếp" value={sort} onChange={(e) => setParam("sort", e.target.value)}><option value="popular">Phổ biến</option><option value="new">Mới nhất</option><option value="low">Giá thấp đến cao</option><option value="high">Giá cao đến thấp</option></select>
    </section>
    <section className="catalog-layout"><aside className={filtersOpen ? "open" : ""}><div className="filter-head"><h2>Bộ lọc</h2><button onClick={() => setParams({})}>Xóa bộ lọc</button></div><FilterGroup title="Danh mục" items={["Áo", "Quần", "Váy", "Áo khoác"]} selected={category} onSelect={(value) => setParam("category", value === category ? "" : value)} /><FilterGroup title="Kích thước" items={["S", "M", "L", "XL"]} /><FilterGroup title="Phong cách" items={["Streetwear", "Minimalist", "Smart casual"]} /><div className="color-filter"><h3>Màu sắc</h3>{["#7357FF", "#FF6848", "#DFFF68", "#FFB8D0", "#20202B"].map((color) => <button aria-label={`Lọc màu ${color}`} style={{ background: color }} key={color} />)}</div></aside><div className="catalog-results"><div className="results-head">{category && <button className="filter-chip" onClick={() => setParam("category", "")}>{category} <Icon name="x" size={13} /></button>}</div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState title="Chưa tìm thấy sản phẩm" text="Thử từ khóa khác hoặc xóa bộ lọc để khám phá thêm." action={<Button onClick={() => setParams({})}>Xóa bộ lọc</Button>} />}</div></section>
  </main>;
}

function FilterGroup({ title, items, selected = "", onSelect }: { title: string; items: string[]; selected?: string; onSelect?: (item: string) => void }) {
  return <div className="filter-group"><h3>{title}</h3>{items.map((item) => <label key={item}><input type="checkbox" checked={selected === item} onChange={() => onSelect?.(item)} /> <span>{item}</span></label>)}</div>;
}

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const product = products.find((item) => item.id === Number(id)) || products[0];
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  return <main className="product-page"><div className="breadcrumbs"><Link to="/">Trang chủ</Link><Icon name="chevron" size={14} /><Link to="/shop">Sản phẩm</Link><Icon name="chevron" size={14} /><span>{product.name}</span></div><section className="product-detail"><div className="gallery"><div className="gallery-thumbs">{[product.image, photos.close, photos.white].map((image, index) => <button className={index === 0 ? "active" : ""} key={image}><img src={image} alt={`Góc nhìn ${index + 1}`} /></button>)}</div><div className="gallery-main"><img src={product.image} alt={product.name} /><span>Di chuột để phóng to</span></div></div><div className="product-info"><span className="product-kicker">{product.brand} · {product.category}</span><h1>{product.name}</h1><div className="rating"><b>4.8</b> ★★★★★ <span>128 đánh giá</span></div><p className="product-price">{formatVND(product.price)}</p><p className="product-description">Thiết kế hiện đại với phom dáng linh hoạt, dễ phối cho nhiều dịp. Chất liệu được chọn để tạo cảm giác thoải mái trong ngày dài.</p><Selector title={`Màu: ${color}`} values={product.colors} value={color} onChange={setColor} /><Selector title="Kích thước" values={product.sizes} value={size} onChange={setSize} action="Hướng dẫn chọn size" /><div className="stock"><Icon name="check" size={16} /> Có sẵn trong bản demo · Giao hàng dự kiến 2–4 ngày</div><Button variant="coral" className="wide-button" onClick={() => addToCart(product.id)}><Icon name="bag" /> Thêm vào giỏ hàng</Button><div className="secondary-actions"><Button variant="dark" onClick={() => navigate("/checkout")}>Mua ngay</Button><Button variant="light" onClick={() => toggleWishlist(product.id)}><Icon name="heart" /> {wishlist.includes(product.id) ? "Đã lưu" : "Yêu thích"}</Button></div><Button variant="purple" className="wide-button" onClick={() => navigate(`/ai-try-on?product=${product.id}`)}><Icon name="sparkles" /> Thử món đồ này với AI</Button><div className="detail-accordions"><button>Mô tả & chất liệu <Icon name="plus" /></button><button>Giao hàng & đổi trả <Icon name="plus" /></button><button>Đánh giá sản phẩm <Icon name="plus" /></button></div></div></section><ProductSection eyebrow="COMPLETE THE LOOK" title="Phối cùng món này" productsToShow={products.filter((item) => item.id !== product.id).slice(0, 4)} /></main>;
}

function Selector({ title, values, value, onChange, action }: { title: string; values: string[]; value: string; onChange: (value: string) => void; action?: string }) {
  return <div className="selector"><div><b>{title}</b>{action && <button>{action}</button>}</div><div>{values.map((item) => <button className={value === item ? "active" : ""} onClick={() => onChange(item)} key={item}>{item}</button>)}</div></div>;
}

export function AIStudioPage() {
  return <main className="ai-landing"><PageHeader eyebrow="FITLOOK AI STUDIO" title="Fashion meets intelligence." text="Hai cách thông minh để khám phá phong cách mới — rõ ràng, trực quan và luôn trong tầm kiểm soát." /><section className="ai-entry-grid"><Link to="/ai-try-on" className="ai-entry ai-entry--purple"><div><Icon name="sparkles" size={32} /></div><span>VIRTUAL TRY-ON</span><h2>Thử đồ ảo<br />bằng AI</h2><p>Khám phá cách một trang phục có thể trông như thế nào khi bạn mặc.</p><b>Bắt đầu thử đồ <Icon name="arrow" /></b><img src={photos.blue} alt="Virtual Try-On" /></Link><Link to="/visual-search" className="ai-entry ai-entry--pink"><div><Icon name="camera" size={32} /></div><span>VISUAL SEARCH</span><h2>Tìm thời trang<br />bằng ảnh</h2><p>Tải ảnh quần áo để khám phá các sản phẩm tương tự trong cửa hàng.</p><b>Tìm sản phẩm bằng ảnh <Icon name="arrow" /></b><img src={photos.pink} alt="Visual Search" /></Link></section><section className="how-it-works"><span>ĐƠN GIẢN & MINH BẠCH</span><h2>3 bước để bắt đầu</h2><div>{["Tải ảnh phù hợp", "Chọn sản phẩm hoặc vùng ảnh", "Xem kết quả mô phỏng"].map((item, index) => <article key={item}><b>0{index + 1}</b><h3>{item}</h3><p>Hướng dẫn rõ ràng và quyền kiểm soát luôn thuộc về bạn.</p></article>)}</div></section></main>;
}

export function TryOnPage() {
  const [params] = useSearchParams();
  const initialProduct = products.find((item) => item.id === Number(params.get("product"))) || products[0];
  const [uploaded, setUploaded] = useState(false);
  const [selected, setSelected] = useState(initialProduct);
  const [state, setState] = useState<"ready" | "loading" | "result" | "error">("ready");
  const { addToCart } = useShop();
  const generate = () => { if (!uploaded) return; setState("loading"); window.setTimeout(() => setState("result"), 1500); };
  return <main className="workflow-page"><WorkflowIntro eyebrow="VIRTUAL TRY-ON" title="Thử phong cách mới, trước khi mua." text="Bản mô phỏng AI trong prototype này chỉ là minh họa giao diện, không phải kết quả từ dịch vụ AI thật." steps={["Tải ảnh", "Chọn sản phẩm", "Tạo bản xem trước", "So sánh & mua"]} active={state === "result" ? 4 : uploaded ? 2 : 1} /><section className="workflow-grid"><UploadPanel uploaded={uploaded} onUpload={() => { setUploaded(true); setState("ready"); }} onRemove={() => { setUploaded(false); setState("ready"); }} image={photos.pink} label="Tải ảnh chân dung hoặc toàn thân" /><div className="workflow-controls"><div className="control-title"><span>BƯỚC 2</span><h2>Chọn món đồ</h2></div><label className="search-field compact"><Icon name="search" /><input placeholder="Tìm trong catalog..." /></label><div className="product-picker">{products.slice(0, 5).map((product) => <button className={selected.id === product.id ? "selected" : ""} onClick={() => setSelected(product)} key={product.id}><img src={product.image} alt="" /><span><b>{product.name}</b><small>{formatVND(product.price)}</small></span>{selected.id === product.id && <i><Icon name="check" size={13} /></i>}</button>)}</div><div className="selected-summary"><img src={selected.image} alt="" /><span>Sản phẩm đã chọn<b>{selected.name}</b></span></div><Button variant="purple" className="wide-button" disabled={!uploaded || state === "loading"} onClick={generate}>{state === "loading" ? <span className="loader" /> : <Icon name="sparkles" />}{state === "loading" ? "AI đang chuẩn bị bản mô phỏng..." : "Tạo ảnh thử đồ AI"}</Button>{!uploaded && <p className="validation-note">Vui lòng tải ảnh để tiếp tục.</p>}<button className="simulate-error" onClick={() => setState("error")}>Mô phỏng lỗi kết nối</button>{state === "error" && <div className="error-state"><b>Không thể tạo bản xem trước</b><p>Dịch vụ mô phỏng chưa phản hồi. Vui lòng thử lại.</p><button onClick={() => setState("ready")}>Thử lại</button></div>}</div></section>{state === "result" && <ResultPanel selected={selected} onCart={() => addToCart(selected.id)} />}</main>;
}

function WorkflowIntro({ eyebrow, title, text, steps, active }: { eyebrow: string; title: string; text: string; steps: string[]; active: number }) {
  return <section className="workflow-intro"><span><Icon name="sparkles" size={15} /> {eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="stepper">{steps.map((step, index) => <div className={index < active ? "active" : ""} key={step}><span>{index + 1}</span>{step}</div>)}</div></section>;
}

function UploadPanel({ uploaded, onUpload, onRemove, image, label }: { uploaded: boolean; onUpload: () => void; onRemove: () => void; image: string; label: string }) {
  return <div className="upload-column"><div className={`upload-zone ${uploaded ? "has-image" : ""}`} onClick={onUpload}>{uploaded ? <><img src={image} alt="Ảnh đã tải lên" /><button className="replace-button" onClick={(e) => { e.stopPropagation(); onRemove(); }}><Icon name="trash" size={15} /> Xóa ảnh</button></> : <div><span className="upload-icon"><Icon name="upload" size={28} /></span><h3>{label}</h3><p>JPG, PNG hoặc WEBP · Tối đa 10MB</p><Button variant="purple">Tải ảnh của bạn</Button><small>Kéo thả ảnh vào khu vực này</small></div>}</div><p className="privacy"><Icon name="check" size={16} /> Demo không tải ảnh lên máy chủ. Hệ thống thật cần chính sách lưu trữ riêng tư.</p></div>;
}

function ResultPanel({ selected, onCart }: { selected: typeof products[number]; onCart: () => void }) {
  return <section className="try-result"><div className="result-heading"><div><span className="eyebrow"><Icon name="check" size={16} /> BẢN MÔ PHỎNG DEMO</span><h2>Phong cách mới của bạn</h2><p>Ảnh bên phải là placeholder minh họa luồng kết quả, không phải ảnh do AI thực sự tạo.</p></div><div className="result-actions"><Button variant="light">Lưu kết quả</Button><Button variant="coral" onClick={onCart}><Icon name="bag" /> Thêm vào giỏ</Button></div></div><div className="comparison"><figure><img src={photos.pink} alt="Ảnh gốc" /><figcaption>Ảnh gốc</figcaption></figure><figure><img src={selected.image} alt="Placeholder kết quả mô phỏng" /><figcaption>Bản mô phỏng demo</figcaption></figure></div><p className="ai-disclaimer">Kết quả AI, khi được tích hợp, chỉ mang tính tham khảo và không đảm bảo độ vừa vặn, hành vi chất liệu hoặc màu sắc thực tế.</p></section>;
}

export function VisualSearchPage() {
  const [uploaded, setUploaded] = useState(false);
  const [state, setState] = useState<"ready" | "loading" | "results" | "empty">("ready");
  const search = () => { if (!uploaded) return; setState("loading"); window.setTimeout(() => setState("results"), 1300); };
  return <main className="workflow-page"><WorkflowIntro eyebrow="VISUAL SEARCH" title="Một bức ảnh. Vô vàn lựa chọn." text="Tải ảnh có món đồ rõ ràng để khám phá sản phẩm tương tự trong catalog mẫu." steps={["Tải ảnh", "Cắt vùng ảnh", "Tìm kiếm", "Khám phá"]} active={state === "results" ? 4 : uploaded ? 2 : 1} /><section className="visual-workspace"><UploadPanel uploaded={uploaded} onUpload={() => { setUploaded(true); setState("ready"); }} onRemove={() => { setUploaded(false); setState("ready"); }} image={photos.hero} label="Tải ảnh thời trang tham khảo" /><div className="crop-panel"><div className="control-title"><span>BƯỚC 2</span><h2>Tập trung vào món đồ</h2></div><div className="crop-preview"><div className="crop-frame" /><img src={uploaded ? photos.hero : photos.duo} alt="Vùng ảnh tìm kiếm" /><span>Kéo để điều chỉnh vùng tìm kiếm</span></div><div className="filter-chips">{["Tất cả", "Áo khoác", "Áo", "Quần"].map((item, index) => <button className={index === 0 ? "active" : ""} key={item}>{item}</button>)}</div><Button variant="purple" className="wide-button" disabled={!uploaded || state === "loading"} onClick={search}>{state === "loading" ? <span className="loader" /> : <Icon name="search" />}{state === "loading" ? "Đang phân tích hình ảnh..." : "Tìm sản phẩm tương tự"}</Button><button className="simulate-error" onClick={() => setState("empty")}>Xem trạng thái không có kết quả</button></div></section>{state === "results" && <section className="search-results"><div className="section-heading"><div><span>VISUAL MATCHES</span><h2>Sản phẩm tương tự</h2></div><p>Kết quả demo từ catalog mẫu · Không hiển thị điểm tương đồng giả lập</p></div><div className="filter-chips result-filters">{["Danh mục", "Màu sắc", "Giá", "Kích thước", "Thương hiệu"].map((item) => <button key={item}>{item} +</button>)}</div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}</div></section>}{state === "empty" && <EmptyState title="Chưa tìm thấy sản phẩm phù hợp" text="Hãy thử ảnh khác hoặc khám phá các phong cách tương tự." action={<Button variant="purple" onClick={() => setState("ready")}>Tải ảnh khác</Button>} />}</main>;
}

export function StylistPage() {
  const [occasion, setOccasion] = useState("Đi chơi");
  const [style, setStyle] = useState("Streetwear");
  const [budget, setBudget] = useState("Dưới 3 triệu");
  const [generated, setGenerated] = useState(false);
  const [items, setItems] = useState(products.slice(0, 3));
  const { addToCart } = useShop();
  const replace = (index: number) => setItems((current) => current.map((item, i) => i === index ? products[(item.id + 2) % products.length] : item));
  return <main><PageHeader eyebrow="AI PERSONAL STYLIST" title="Phong cách bắt đầu từ bạn." text="Một vài lựa chọn ngắn giúp tạo outfit mẫu từ sản phẩm hiện có trong catalog." /><section className="stylist-builder"><div className="preference-panel"><Choice title="Dịp nào?" values={["Đi học", "Đi làm", "Đi chơi", "Hẹn hò"]} value={occasion} onChange={setOccasion} /><Choice title="Phong cách?" values={["Streetwear", "Minimalist", "Smart casual"]} value={style} onChange={setStyle} /><Choice title="Ngân sách?" values={["Dưới 2 triệu", "Dưới 3 triệu", "Linh hoạt"]} value={budget} onChange={setBudget} /><Choice title="Màu yêu thích?" values={["Tím", "Trung tính", "Nổi bật", "Pastel"]} value="Nổi bật" onChange={() => {}} /><Button variant="purple" className="wide-button" onClick={() => setGenerated(true)}><Icon name="sparkles" /> Gợi ý outfit</Button><button className="skip-button" onClick={() => setGenerated(true)}>Bỏ qua và xem gợi ý phổ biến</button></div><div className="stylist-preview">{generated ? <><div className="stylist-look"><img src={style === "Minimalist" ? photos.white : photos.duo} alt="Outfit được đề xuất" /><span>{occasion} · {style}</span></div><div className="stylist-items">{items.map((item, index) => <article key={`${item.id}-${index}`}><img src={item.image} alt={item.name} /><div><b>{item.name}</b><span>{formatVND(item.price)}</span></div><button onClick={() => replace(index)}>Thay món</button></article>)}<div className="stylist-total"><span>Tổng outfit<b>{formatVND(items.reduce((sum, item) => sum + item.price, 0))}</b></span><Button variant="coral" onClick={() => items.forEach((item) => addToCart(item.id))}>Thêm outfit vào giỏ</Button><Link className="button button--purple" to={`/ai-try-on?product=${items[0].id}`}><Icon name="sparkles" /> Thử với AI</Link></div></div></> : <EmptyState title="Outfit của bạn sẽ xuất hiện ở đây" text="Chọn vài sở thích hoặc bỏ qua để xem một gợi ý phổ biến." />}</div></section></main>;
}

function Choice({ title, values, value, onChange }: { title: string; values: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="choice"><h3>{title}</h3><div>{values.map((item) => <button className={item === value ? "active" : ""} onClick={() => onChange(item)} key={item}>{item}</button>)}</div></div>;
}

export function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((product) => wishlist.includes(product.id));
  return <main><PageHeader eyebrow="SAVED FOR LATER" title="Yêu thích" text="Những món đồ bạn muốn quay lại xem." /><section className="account-content">{items.length ? <div className="product-grid">{items.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <EmptyState title="Danh sách yêu thích đang trống" text="Lưu những món bạn thích để dễ dàng tìm lại trong phiên này." action={<Link className="button button--purple" to="/shop">Khám phá sản phẩm</Link>} />}</section></main>;
}

export function CartPage() {
  const { cart, removeFromCart } = useShop();
  const items = cart.map((id) => products.find((product) => product.id === id)).filter(Boolean) as typeof products;
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return <main><PageHeader eyebrow="YOUR BAG" title="Giỏ hàng" text={`${items.length} sản phẩm đang chờ bạn.`} /><section className="cart-layout"><div className="cart-items">{items.length ? items.map((item, index) => <article key={`${item.id}-${index}`}><img src={item.image} alt={item.name} /><div><Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link><p>Size M · {item.colors[0]}</p><div className="quantity"><button><Icon name="minus" size={15} /></button><span>1</span><button><Icon name="plus" size={15} /></button></div></div><div><b>{formatVND(item.price)}</b><button onClick={() => removeFromCart(item.id)}><Icon name="trash" size={17} /> Xóa</button></div></article>) : <EmptyState title="Giỏ hàng đang trống" text="Hãy khám phá những thiết kế mới nhất." action={<Link className="button button--purple" to="/shop">Tiếp tục mua sắm</Link>} />}</div><aside className="order-summary"><h2>Tóm tắt đơn hàng</h2><div><span>Tạm tính</span><b>{formatVND(subtotal)}</b></div><div><span>Phí vận chuyển</span><b>Tính ở bước sau</b></div><label>Mã ưu đãi<input placeholder="Nhập mã" /></label><div className="summary-total"><span>Tổng cộng</span><b>{formatVND(subtotal)}</b></div><Link className={`button button--coral ${!items.length ? "disabled" : ""}`} to={items.length ? "/checkout" : "/cart"}>Tiến hành thanh toán <Icon name="arrow" /></Link><Link className="continue-link" to="/shop">Tiếp tục mua sắm</Link></aside></section></main>;
}

export function CheckoutPage() {
  const { cart } = useShop();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const total = cart.reduce((sum, id) => sum + (products.find((item) => item.id === id)?.price || 0), 0);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); if (!data.get("name") || !data.get("phone") || !data.get("address")) { setError("Vui lòng điền đầy đủ thông tin giao hàng."); return; } setError(""); setStep(2); };
  if (confirmed) return <main><div className="confirmation"><span><Icon name="check" size={32} /></span><p>ĐƠN HÀNG DEMO</p><h1>Thông tin đã sẵn sàng.</h1><p>Đây là màn hình xác nhận prototype. Chưa có thanh toán hoặc đơn hàng thật được tạo.</p><Link className="button button--purple" to="/">Về trang chủ</Link></div></main>;
  return <main><PageHeader eyebrow="SECURE CHECKOUT" title="Thanh toán" text="Thông tin được giữ lại khi bạn chuyển bước trong phiên prototype." /><div className="checkout-steps">{["Thông tin", "Giao hàng & thanh toán", "Xem lại"].map((item, index) => <span className={step >= index + 1 ? "active" : ""} key={item}><b>{index + 1}</b>{item}</span>)}</div><section className="checkout-layout">{step === 1 ? <form className="checkout-form" onSubmit={submit}><h2>Thông tin giao hàng</h2><div className="form-grid"><label>Họ và tên<input name="name" placeholder="Nguyễn Minh Anh" /></label><label>Số điện thoại<input name="phone" placeholder="09xx xxx xxx" /></label><label className="full">Email<input name="email" type="email" placeholder="ban@email.com" /></label><label className="full">Địa chỉ<input name="address" placeholder="Số nhà, tên đường, phường/xã" /></label><label>Thành phố<select><option>TP. Hồ Chí Minh</option><option>Hà Nội</option></select></label><label>Quận / Huyện<input placeholder="Quận 1" /></label></div>{error && <p className="form-error">{error}</p>}<Button variant="coral" type="submit">Tiếp tục <Icon name="arrow" /></Button></form> : <div className="checkout-form"><h2>Giao hàng & thanh toán</h2><div className="delivery-option active"><span><Icon name="check" /></span><div><b>Giao hàng tiêu chuẩn</b><p>2–4 ngày làm việc · Phí hiển thị khi tích hợp vận chuyển</p></div></div><h3>Phương thức thanh toán</h3><div className="delivery-option active"><span><Icon name="check" /></span><div><b>Thanh toán khi nhận hàng</b><p>Prototype không xử lý thanh toán thật.</p></div></div><Button variant="coral" onClick={() => { setStep(3); setConfirmed(true); }}>Xác nhận thông tin demo</Button></div>}<aside className="order-summary"><h2>Đơn hàng của bạn</h2>{cart.slice(0, 3).map((id, index) => { const product = products.find((item) => item.id === id)!; return <div className="checkout-item" key={`${id}-${index}`}><img src={product.image} alt="" /><span>{product.name}<small>Size M</small></span><b>{formatVND(product.price)}</b></div>; })}<div className="summary-total"><span>Tạm tính</span><b>{formatVND(total)}</b></div><p className="safe-note"><Icon name="check" size={15} /> Không có giao dịch thật trong prototype.</p></aside></section></main>;
}

export function AccountPage() {
  return <main><PageHeader eyebrow="YOUR FITLOOK" title="Tài khoản của bạn" text="Quản lý phong cách, đơn hàng và những trải nghiệm đã lưu." /><section className="account-layout"><aside><div className="profile-mini"><span>MA</span><div><b>Minh Anh</b><small>Demo account</small></div></div>{["Tổng quan", "Đơn hàng", "Yêu thích", "Kết quả thử đồ", "Outfit đã lưu", "Đã xem gần đây"].map((item, index) => <button className={index === 0 ? "active" : ""} key={item}>{item}<Icon name="chevron" size={15} /></button>)}<Link to="/login">Đăng xuất demo</Link></aside><div className="account-dashboard"><h2>Chào Minh Anh, hôm nay mặc gì?</h2><div className="account-cards"><Link to="/wishlist"><span><Icon name="heart" /></span><b>{useShop().wishlist.length}</b><p>Sản phẩm yêu thích</p></Link><Link to="/ai-try-on"><span><Icon name="sparkles" /></span><b>0</b><p>Kết quả thử đồ đã lưu</p></Link><Link to="/stylist"><span><Icon name="bag" /></span><b>2</b><p>Outfit mẫu</p></Link></div><section className="orders"><div><h3>Đơn hàng gần đây</h3><button>Xem tất cả</button></div><article><span>FL-DEMO-2025</span><b>Chưa có đơn hàng thật</b><small>Mục này minh họa cấu trúc lịch sử đơn hàng</small><button>Chi tiết <Icon name="arrow" size={14} /></button></article></section><h3>Đã xem gần đây</h3><div className="product-grid compact-grid">{products.slice(0, 3).map((product) => <ProductCard product={product} key={product.id} />)}</div></div></section></main>;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  return <main className="auth-page"><section className="auth-visual"><img src={photos.hero} alt="FitLook editorial" /><div><span>FITLOOK MEMBERS</span><h1>Phong cách của bạn,<br />luôn ở đây.</h1></div></section><section className="auth-form"><Link className="brand" to="/"><span className="brand__mark"><Icon name="sparkles" size={17} /></span> FITLOOK <b>AI</b></Link><span className="eyebrow">{mode === "login" ? "WELCOME BACK" : mode === "register" ? "JOIN FITLOOK" : "RESET PASSWORD"}</span><h2>{mode === "login" ? "Đăng nhập" : mode === "register" ? "Tạo tài khoản" : "Quên mật khẩu?"}</h2><p>{mode === "forgot" ? "Nhập email để nhận hướng dẫn khi dịch vụ xác thực được kết nối." : "Lưu wishlist, outfit và kết quả thử đồ của bạn."}</p>{mode === "register" && <label>Họ và tên<input placeholder="Tên của bạn" /></label>}<label>Email<input type="email" placeholder="ban@email.com" /></label>{mode !== "forgot" && <label>Mật khẩu<input type="password" placeholder="••••••••" /></label>}<Button variant="purple" className="wide-button" onClick={() => navigate("/account")}>{mode === "login" ? "Đăng nhập demo" : mode === "register" ? "Đăng ký demo" : "Gửi hướng dẫn demo"}</Button>{mode === "login" && <button className="auth-link" onClick={() => setMode("forgot")}>Quên mật khẩu?</button>}<div className="auth-switch">{mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"} <button onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Đăng ký" : "Đăng nhập"}</button></div><small>Bạn vẫn có thể mua sắm mà không cần đăng nhập.</small></section></main>;
}

export function NotFoundPage() {
  return <main><EmptyState title="Trang này không tồn tại" text="Đường dẫn có thể đã thay đổi." action={<Link className="button button--purple" to="/">Về trang chủ</Link>} /></main>;
}
