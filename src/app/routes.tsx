import { createBrowserRouter } from "react-router";
import { Layout } from "./ui";
import { AccountPage, AIStudioPage, CartPage, CheckoutPage, CollectionsPage, HomePage, LoginPage, MenPage, NotFoundPage, ProductPage, ShopPage, StylistPage, TryOnPage, VisualSearchPage, WishlistPage, WomenPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "nam", Component: MenPage },
      { path: "nu", Component: WomenPage },
      { path: "bo-suu-tap", Component: CollectionsPage },
      { path: "shop", Component: ShopPage },
      { path: "product/:id", Component: ProductPage },
      { path: "ai-studio", Component: AIStudioPage },
      { path: "ai-try-on", Component: TryOnPage },
      { path: "visual-search", Component: VisualSearchPage },
      { path: "stylist", Component: StylistPage },
      { path: "wishlist", Component: WishlistPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "account", Component: AccountPage },
      { path: "login", Component: LoginPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
