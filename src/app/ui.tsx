import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { products, formatVND } from "./data";
import { useShop } from "./store";

export type IconName = "arrow" | "bag" | "camera" | "check" | "chevron" | "heart" | "home" | "menu" | "minus" | "plus" | "search" | "sparkles" | "trash" | "upload" | "user" | "x";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    camera: <><path d="M4 7h3l2-2h6l2 2h3v11H4V7Z" /><circle cx="12" cy="12.5" r="3.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 22l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    minus: <path d="M5 12h14" />, plus: <><path d="M5 12h14M12 5v14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 13l.7 2.3L8 16l-2.3.7L5 19l-.7-2.3L2 16l2.3-.7L5 13Z" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></>,
    upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M5 15v5h14v-5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function Button({ children, variant = "dark", onClick, disabled, type = "button", className = "" }: { children: React.ReactNode; variant?: "dark" | "coral" | "purple" | "light"; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; className?: string }) {
  return <button type={type} disabled={disabled} className={`button button--${variant} ${className}`} onClick={onClick}>{children}</button>;
}

export function ProductCard({ product = products[0] }: { product?: typeof products[number] }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const navigate = useNavigate();
  const liked = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
        <span className="product-card__tag">{product.tag}</span>
        <button aria-label={liked ? "Bỏ yêu thích" : "Thêm vào yêu thích"} className={`icon-button product-card__heart ${liked ? "is-liked" : ""}`} onClick={() => toggleWishlist(product.id)}><Icon name="heart" /></button>
        <button className="try-pill" onClick={() => navigate(`/ai-try-on?product=${product.id}`)}><Icon name="sparkles" size={16} /> Thử với AI</button>
      </div>
      <div className="product-card__info"><div><Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link><p>{formatVND(product.price)}</p></div><button aria-label={`Thêm ${product.name} vào giỏ`} className="quick-add" onClick={() => addToCart(product.id)}><Icon name="bag" size={19} /></button></div>
      <div className="swatches"><span style={{ background: product.color }} /><span /><span /></div>
    </article>
  );
}

export function Layout() {
  const { cart, toast } = useShop();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
  };
  return (
    <div className="app">
      <div className="announcement">BỘ SƯU TẬP COLOR THEORY ĐÃ RA MẮT <span /> ĐỔI TRẢ MIỄN PHÍ TRONG 14 NGÀY</div>
      <header className="nav">
        <button className="mobile-menu icon-button" aria-label="Mở menu"><Icon name="menu" /></button>
        <Link className="brand" to="/"><span className="brand__mark"><Icon name="sparkles" size={17} /></span> FITLOOK <b>AI</b></Link>
        {!searchOpen ? <nav>
          <NavLink to="/">Trang chủ</NavLink><NavLink to="/nam">Nam</NavLink><NavLink to="/nu">Nữ</NavLink><NavLink to="/bo-suu-tap">Bộ sưu tập</NavLink>
          <NavLink className="ai-nav" to="/ai-studio"><Icon name="sparkles" size={16} /> AI Studio</NavLink>
        </nav> : <form className="header-search" onSubmit={submitSearch}>
          <Icon name="search" size={20} />
          <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Tìm sản phẩm, thương hiệu và phong cách..." aria-label="Tìm kiếm sản phẩm" />
          <Link to="/visual-search" onClick={() => setSearchOpen(false)} aria-label="Tìm bằng hình ảnh" title="Tìm bằng hình ảnh"><Icon name="camera" size={20} /><span>Tìm bằng ảnh</span></Link>
          <button className="header-search__submit" type="submit" aria-label="Tìm kiếm"><Icon name="search" /></button>
          <button className="header-search__close" type="button" onClick={() => setSearchOpen(false)} aria-label="Đóng tìm kiếm"><Icon name="x" size={18} /></button>
        </form>}
        {!searchOpen && <div className="nav-actions"><button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Mở tìm kiếm"><Icon name="search" /></button><Link className="icon-button hide-mobile" to="/wishlist" aria-label="Yêu thích"><Icon name="heart" /></Link><Link className="icon-button cart-button" to="/cart" aria-label="Giỏ hàng"><Icon name="bag" />{cart.length > 0 && <span>{cart.length}</span>}</Link><Link className="icon-button hide-mobile" to="/account" aria-label="Tài khoản"><Icon name="user" /></Link></div>}
      </header>
      <Outlet />
      <footer><Link className="brand" to="/"><span className="brand__mark"><Icon name="sparkles" size={17} /></span> FITLOOK <b>AI</b></Link><p>Thời trang của bạn. Công nghệ của tương lai.</p><div><Link to="/account">Về FitLook</Link><Link to="/account">Hỗ trợ</Link><Link to="/account">Giao hàng & đổi trả</Link><Link to="/account">Quyền riêng tư</Link></div><small>© 2025 FitLook AI. Graduation Project · AI experiences are simulated for demonstration.</small></footer>
      <nav className="mobile-bottom"><NavLink to="/"><Icon name="home" /><span>Trang chủ</span></NavLink><NavLink to="/shop"><Icon name="search" /><span>Khám phá</span></NavLink><NavLink className="mobile-ai" to="/ai-studio"><i><Icon name="sparkles" /></i><span>AI Studio</span></NavLink><NavLink to="/wishlist"><Icon name="heart" /><span>Yêu thích</span></NavLink><NavLink to="/account"><Icon name="user" /><span>Cá nhân</span></NavLink></nav>
      <div className={`toast ${toast ? "show" : ""}`}><span><Icon name="check" size={16} /></span><div><b>{toast}</b><small>Trạng thái đã được lưu trong phiên này.</small></div></div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <section className="page-hero"><span>{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</section>;
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return <div className="empty-state"><span><Icon name="sparkles" size={28} /></span><h2>{title}</h2><p>{text}</p>{action}</div>;
}
