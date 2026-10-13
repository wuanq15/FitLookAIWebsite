export const photos = {
  hero: "https://images.unsplash.com/photo-1721417264655-2ccbf19152c6?auto=format&fit=crop&w=1200&q=88",
  green: "https://images.unsplash.com/photo-1721417264673-8f7d8ba364ca?auto=format&fit=crop&w=900&q=85",
  skate: "https://images.unsplash.com/photo-1721417264669-765357d6c7c5?auto=format&fit=crop&w=900&q=85",
  duo: "https://images.unsplash.com/photo-1736097760784-3491b9e9e1b3?auto=format&fit=crop&w=1000&q=85",
  pink: "https://images.unsplash.com/photo-1643915542649-6f1ae23eb8fe?auto=format&fit=crop&w=900&q=85",
  blue: "https://images.unsplash.com/photo-1700585560305-a2c1876fd098?auto=format&fit=crop&w=900&q=85",
  white: "https://images.unsplash.com/photo-1606586706930-6bfa156600f6?auto=format&fit=crop&w=900&q=85",
  close: "https://images.unsplash.com/photo-1664308703524-5ef1dc40a42f?auto=format&fit=crop&w=900&q=85",
};

export const products = [
  { id: 1, name: "Áo khoác Color Block", price: 1290000, image: photos.hero, category: "Áo khoác", color: "#7357FF", colors: ["Tím", "Cam", "Đen"], sizes: ["S", "M", "L"], brand: "FitLook Studio", style: "Streetwear", tag: "Mới" },
  { id: 2, name: "Set Linen Lime", price: 890000, image: photos.green, category: "Áo", color: "#DFFF68", colors: ["Lime", "Kem"], sizes: ["S", "M", "L", "XL"], brand: "Mori", style: "Minimalist", tag: "Bán chạy" },
  { id: 3, name: "Quần Denim Street", price: 759000, image: photos.skate, category: "Quần", color: "#FF6848", colors: ["Xanh", "Đen"], sizes: ["M", "L", "XL"], brand: "FitLook Studio", style: "Streetwear", tag: "Street edit" },
  { id: 4, name: "Áo Blazer Cloud", price: 1490000, image: photos.white, category: "Áo khoác", color: "#FFB8D0", colors: ["Trắng", "Đen"], sizes: ["S", "M"], brand: "Élan", style: "Smart casual", tag: "Editor’s pick" },
  { id: 5, name: "Váy Midi Candy", price: 1090000, image: photos.pink, category: "Váy", color: "#FFB8D0", colors: ["Hồng", "Tím"], sizes: ["S", "M", "L"], brand: "Élan", style: "Romantic", tag: "Mới" },
  { id: 6, name: "Áo Bomber Electric", price: 1390000, image: photos.blue, category: "Áo khoác", color: "#7357FF", colors: ["Xanh", "Đen"], sizes: ["M", "L"], brand: "NOVA", style: "Streetwear", tag: "Nổi bật" },
  { id: 7, name: "Áo Tank Essential", price: 429000, image: photos.close, category: "Áo", color: "#20202B", colors: ["Trắng", "Đen"], sizes: ["S", "M", "L"], brand: "Mori", style: "Minimalist", tag: "Cơ bản" },
  { id: 8, name: "Set Weekend Duo", price: 1750000, image: photos.duo, category: "Bộ sưu tập", color: "#FF6848", colors: ["Xanh", "Cam"], sizes: ["S", "M", "L"], brand: "NOVA", style: "Casual", tag: "Lookbook" },
];

export const formatVND = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)}₫`;
