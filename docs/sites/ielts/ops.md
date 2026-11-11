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

**Trạng thái (2026-11-11):** đã có mã nguồn `ielts/` (build và lint qua, chưa deploy). **Chưa** có Pages project, DNS, và `media/` chưa deploy endpoint `/api/ielts/schools.json`.

## Stack

Giống [danghong.me](../www/architecture.md): Next.js (App Router, `output: "export"`), TypeScript, Tailwind CSS 4, trong thư mục `ielts/`. Không có server, không lưu dữ liệu người dùng. Next.js ở bản này khác bản quen thuộc: đọc `node_modules/next/dist/docs/` trước khi viết code.

## Các bước dựng site

1. Chốt các mục Việc còn mở trong [brief](brief.md), nhất là IE2 (kênh liên hệ) và IE3 (cách nhắc Nemo12).
2. Deploy `media/` để có `/api/ielts/schools.json`, nhập danh sách trường ở admin (tab **ielts**). Mã nguồn `ielts/` và job CI `ielts` đã có. Tạo Pages project `danghong-ielts` trên account `Dangtuyethong2324@gmail.com's Account` bằng **Connect to Git** (Root directory `ielts`, build `npm run build`, output `out`), theo [Deployment](../../ecosystem/deployment.md) §2.1. Không tạo bằng `wrangler pages project create` hay `wrangler pages deploy`: project đó sẽ bị khoá ở kiểu Direct Upload, không nối Git được nữa.
3. Tạo CNAME `ielts` trong zone `danghong.me`, vì zone và Pages ở hai account khác nhau ([Infrastructure](../../ecosystem/infrastructure.md) §2; việc I6).
4. Cập nhật bảng thành phần và DNS trong [Infrastructure](../../ecosystem/infrastructure.md), [Deployment](../../ecosystem/deployment.md), trang này, và đổi `status` các trang của site sang `active`.

## Lệnh

```bash
cd ielts && npm ci && npm run dev    # :3000
npm run lint && npm run build        # static export ra out/
```

Build đọc `https://media.danghong.me/api/ielts/schools.json` (đổi nguồn bằng `IELTS_API_URL`). Không đọc được thì build vẫn qua với danh sách trống. Sửa dữ liệu trường xong phải build lại site; deploy hook cho `danghong-ielts` chưa nối (media admin chỉ có nút Xuất bản cho danghong.me).

## Dữ liệu và ảnh

Ảnh phiếu điểm và ảnh Hồng lưu trên media (R2), đọc qua `media.danghong.me`. Ảnh phiếu IELTS bắt buộc che số báo danh, Candidate ID, ngày sinh, số phiếu trước khi tải lên. Nơi giữ dữ liệu trường: xem [content](content.md) mục 3.
