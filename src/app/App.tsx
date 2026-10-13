import { RouterProvider } from "react-router";
import { ShopProvider } from "./store";
import { router } from "./routes";

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  );
}
