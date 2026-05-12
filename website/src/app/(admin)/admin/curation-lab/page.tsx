export const runtime = 'edge';
import { requireAdmin } from '@/utils/admin';
import AdminCoursesClient from './AdminCoursesClient';

export const metadata = { title: "Curation Lab — Admin" };

export default async function AdminCoursesPage() {
  await requireAdmin();
  return <AdminCoursesClient />;
}
