import { createContext, useContext, useEffect, useState } from "react";

type ShopContextValue = {
  cart: number[];
  wishlist: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleWishlist: (id: number) => void;
  toast: string;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<number[]>(() => JSON.parse(sessionStorage.getItem("fitlook-cart") || "[]"));
  const [wishlist, setWishlist] = useState<number[]>(() => JSON.parse(sessionStorage.getItem("fitlook-wishlist") || "[]"));
  const [toast, setToast] = useState("");

  useEffect(() => sessionStorage.setItem("fitlook-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => sessionStorage.setItem("fitlook-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart: (id) => {
          setCart((items) => [...items, id]);
          notify("Đã thêm sản phẩm vào giỏ");
        },
        removeFromCart: (id) => setCart((items) => {
          const index = items.indexOf(id);
          return index < 0 ? items : items.filter((_, i) => i !== index);
        }),
        toggleWishlist: (id) => {
          setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
          notify(wishlist.includes(id) ? "Đã bỏ khỏi yêu thích" : "Đã lưu vào yêu thích");
        },
        toast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}
