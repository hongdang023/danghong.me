import PDFViewerClientPage from './ClientPage';
import { LD_SERIES } from '../../../../data/bookData';

export async function generateStaticParams() {
  return LD_SERIES.map((chapter) => ({
    id: chapter.id,
  }));
}

export default function PDFViewerPage() {
  return <PDFViewerClientPage />;
}
