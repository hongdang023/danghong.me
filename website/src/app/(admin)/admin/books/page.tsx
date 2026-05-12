import { requireAdmin } from '@/utils/admin';
import AdminBooksClient from './AdminBooksClient';

export const metadata = { title: "Books Analytics — Admin" };

export default async function AdminBooksPage() {
  await requireAdmin();
  return <AdminBooksClient />;
}
