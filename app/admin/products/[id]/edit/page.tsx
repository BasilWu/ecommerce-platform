import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
    <main className="container section" style={{ maxWidth: 720 }}>
      <h1 style={{ marginBottom: 24 }}>編輯商品</h1>
      <EditProductForm product={product} />
    </main>
  );
}
