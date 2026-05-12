import { requireAdmin } from '@/utils/admin';
import AdminContentClient from './AdminContentClient';

export const metadata = { title: "Content Manager — Admin" };

export default async function AdminContentPage() {
  await requireAdmin();
  return <AdminContentClient />;
}
