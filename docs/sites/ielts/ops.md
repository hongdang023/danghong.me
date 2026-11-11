---
id: ielts-ops
type: ops
site: ielts
title: ielts.danghong.me Ops
description: "Vận hành dự kiến của ielts.danghong.me: static export như danghong.me, chưa có mã nguồn, Pages project hay DNS; các bước để dựng site."
description_en: "Planned operations for ielts.danghong.me: static export like danghong.me; no code, Pages project or DNS yet; the steps to stand the site up."
owner: hong
status: draft
version: 0.2
last_reviewed: 2026-11-11
ai_readable: true
---

# ielts.danghong.me Ops

**Trạng thái (2026-11-12):** đang chạy tại https://ielts.danghong.me. Pages project `danghong-ielts` (kết nối Git, root `ielts`, build `npm run build`, output `out`, Node 22), CNAME `ielts` → `danghong-ielts.pages.dev` (proxied) trong zone `danghong.me`. Mỗi lần push `main` có thay đổi trong `ielts/**`, Cloudflare tự build và deploy.

## Stack

Giống [danghong.me](../www/architecture.md): Next.js (App Router, `output: "export"`), TypeScript, Tailwind CSS 4, trong thư mục `ielts/`. Không có server, không lưu dữ liệu người dùng. Next.js ở bản này khác bản quen thuộc: đọc `node_modules/next/dist/docs/` trước khi viết code.

## Đã làm

1. Code `ielts/` theo [sitemap](sitemap.md): Landing, About, Teaching Method, Resources (kèm `/resources/tra-cuu/` và `/resources/chon-noi-hoc/`), Students, Newsletter, Hỏi đáp, Quyền riêng tư.
2. `media/` đã deploy endpoint `/api/ielts/schools.json`. Danh sách trường **còn trống**: Hồng nhập ở tab **ielts** của admin media.
3. Pages project và CNAME đã tạo ngày 2026-11-12 (bằng API, theo cấu hình của `danghong-nguvan`). `public/_redirects` chuyển route cũ (`/phu-huynh`, `/hoc-sinh`, `/sinh-vien`, `/tra-cuu`, `/phuong-phap`, `/mentor`) sang route mới.

## Việc còn lại

- Chốt kênh liên hệ riêng (IE2): nút "Hỏi Hồng" hiện trỏ Facebook cá nhân.
- Nhập dữ liệu trường rồi build lại site (chưa có deploy hook).
- Nội dung chưa đăng vì chưa xác nhận: lời của Hải An và Anh Tú, ảnh vẽ nghệ thuật, mẫu báo cáo tiến độ, bài Newsletter đầu tiên.

## Lệnh

```bash
cd ielts && npm ci && npm run dev    # :3000
npm run lint && npm run build        # static export ra out/
```

Build đọc `https://media.danghong.me/api/ielts/schools.json` (đổi nguồn bằng `IELTS_API_URL`). Không đọc được thì build vẫn qua với danh sách trống. Sửa dữ liệu trường xong phải build lại site; deploy hook cho `danghong-ielts` chưa nối (media admin chỉ có nút Xuất bản cho danghong.me).

## Dữ liệu và ảnh

Ảnh phiếu điểm và ảnh Hồng lưu trên media (R2), đọc qua `media.danghong.me`. Ảnh phiếu IELTS bắt buộc che số báo danh, Candidate ID, ngày sinh, số phiếu trước khi tải lên. Nơi giữ dữ liệu trường: xem [content](content.md) mục 3.
