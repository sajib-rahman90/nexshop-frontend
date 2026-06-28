import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Product ${id} | NexShop`,
    description: `Details for product ${id}`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
