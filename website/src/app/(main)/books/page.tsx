import BooksClientPage from './ClientPage';
import { getBooks } from '@/lib/content';

export default async function BooksPage() {
  return <BooksClientPage chapters={await getBooks()} />;
}
