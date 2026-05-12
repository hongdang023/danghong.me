export const runtime = 'edge';
import { requireAdmin } from '@/utils/admin';
import AdminProductsClient from './AdminProductsClient';

export const metadata = { title: 'Products CMS — Admin' };

export default async function AdminProductsPage() {
  await requireAdmin();
  return <AdminProductsClient />;
}
