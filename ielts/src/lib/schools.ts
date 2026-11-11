// School lookup data lives in D1 (collection ielts-schools) and is edited at
// https://media.danghong.me/admin/. This is a static export, so it is fetched once at build time.
// If media is unreachable or has no data yet, the build still succeeds with an empty list.

export interface School {
  id: string;
  name: string;
  group?: string;
  requirement: string;
  applies?: string;
  accepted?: string;
  sourceUrl: string;
  verifiedAt: string;
  note?: string;
}

const URL_ = (process.env.IELTS_API_URL ?? "https://media.danghong.me/api/ielts").replace(/\/$/, "");

export async function getSchools(): Promise<School[]> {
  try {
    const res = await fetch(`${URL_}/schools.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    return Array.isArray(data) ? (data as School[]) : [];
  } catch (err) {
    console.warn(`[ielts] Không đọc được ${URL_}/schools.json: ${String(err)}`);
    return [];
  }
}
