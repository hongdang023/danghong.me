import PDFViewerClientPage from './ClientPage';
import { getBooks } from '@/lib/content';

export async function generateStaticParams() {
  return (await getBooks()).map((chapter) => ({
    id: chapter.id,
  }));
}

export default async function PDFViewerPage() {
  return <PDFViewerClientPage chapters={await getBooks()} />;
}
