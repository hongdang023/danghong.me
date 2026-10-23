---
id: conventions
type: convention
site: docs
title: Documentation Conventions
description: "Luật viết docs.danghong.me: tổ chức theo site, phần dùng chung, frontmatter, song ngữ, vòng đời trang và cổng kiểm."
description_en: "Rules for docs.danghong.me: site-based layout, shared layer, frontmatter, bilingual fields, page lifecycle and checks."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Documentation Conventions

Luật cho mọi trang trong `docs/`. Người hay agent viết docs đều theo file này. Skill `product-brief-docs` (`.claude/skills/product-brief-docs/`) thực thi các luật ở đây.

## 1. Một nguồn duy nhất, theo thực thể

- `docs/` (publish tại https://docs.danghong.me) là nguồn sự thật cho **mọi thứ Hồng sở hữu**: các site `*.danghong.me`, vai trò của Hồng trong từng brand, và cách các site nối với nhau.
- Sản phẩm của brand khác (Sư Tử Con, Nemo12, Next Step) **không chép lại**. Trang của site đó chỉ link sang nguồn sự thật của brand (xem [Kiến trúc thương hiệu](ecosystem/brand-architecture.md)).
- Không tạo tài liệu dự án ở nơi khác (README dài, Google Docs, Notion). Ở đó chỉ đặt link về đây.
- Tài liệu mô tả **hiện trạng thật**. Điều chưa làm ghi là mục tiêu, hoặc đưa vào mục `## Việc còn mở`.

## 2. Cấu trúc

```text
docs/
├── index.md              # Bản đồ hệ sinh thái
├── conventions.md        # File này
├── log.md                # Sổ nguồn yêu cầu và nhật ký thay đổi
├── ecosystem/            # Dùng chung: viết một lần, mọi site đọc
│   ├── identity.md  brand-architecture.md  audiences.md
│   ├── content-standards.md  quality.md
│   ├── design-system/    # index, core, themes/{danghong,sutucon,nemo12,nextstep}
│   ├── infrastructure.md  data.md  deployment.md  engineering.md
├── sites/<site>/         # Riêng từng subdomain: www, ai, ielts, nextstep, media, docs
│   ├── brief.md  sitemap.md  content.md  design.md  ops.md   # bắt buộc
│   └── <trang-con>.md    # tuỳ chọn, khi một trang vượt 40 KB hoặc có chủ đề riêng
├── decisions/            # ADR-xxx: quyết định ảnh hưởng nhiều site
└── audit/                # Báo cáo đóng băng theo ngày
```

**Ranh giới dùng chung / riêng:** cái gì thuộc về Hồng hoặc hạ tầng thì nằm trong `ecosystem/`. Cái gì thuộc về brand hoặc người đọc của brand (audience, theme, giọng văn, mục tiêu, sitemap, CTA) thì nằm trong `sites/<site>/`.

**Thêm một subdomain mới:** tạo `sites/<tên>/` với đủ 5 file bắt buộc, thêm dòng vào bảng của [index](index.md), [kiến trúc thương hiệu](ecosystem/brand-architecture.md) và [hạ tầng](ecosystem/infrastructure.md), rồi thêm mục vào `docs/.vitepress/structure.mjs`.

## 3. Frontmatter

Mọi trang (trừ `audit/`) bắt đầu bằng:

```yaml
---
id: www-brief                 # duy nhất, lowercase, tiếng Anh
type: brief | sitemap | content | design | ops | theme | standard | adr | index | log | convention | reference
site: www | ai | ielts | nextstep | media | docs | ecosystem
title: danghong.me Brief      # tiếng Anh hoặc tên riêng
description: "Trang trả lời câu hỏi gì, tiếng Việt, <= 160 ký tự"
description_en: "Same, in English, <= 160 chars"
summary_en: >-               # bắt buộc với type brief và theme
  Two to four English sentences.
owner: hong
status: draft | active | superseded
version: 1.0
last_reviewed: 2026-10-23     # ngày tuyệt đối
ai_readable: true
---
```

`description` là dòng agent đọc trong `/llms.txt` để quyết định có mở trang hay không. Nêu tên site, tên sản phẩm, đối tượng khi chúng giúp chọn trang. Không viết "Tài liệu này mô tả...".

## 4. Song ngữ

| Phần | Ngôn ngữ |
| :--- | :--- |
| Thân trang | Tiếng Việt, giữ thuật ngữ kỹ thuật tiếng Anh |
| `id`, `type`, `site`, slug, tên file, route, tên bảng, khoá cấu hình | Tiếng Anh |
| `description` / `description_en` | Cả hai |
| `summary_en` | Tiếng Anh, cho brief và theme |

Bản tiếng Anh là tóm tắt, không dịch toàn văn.

## 5. Vòng đời

`draft → active → superseded`. `draft` là site hoặc trang chưa chạy thật, không dùng làm căn cứ implement. Trang `superseded` giữ link, câu mở đầu nêu trang thay thế. Sửa đáng kể thì tăng `version` và cập nhật `last_reviewed`.

## 6. Quy ước viết

- **Hiện trạng trước, lịch sử sau.** Phần đầu trang là trạng thái đúng hôm nay. Lịch sử xuống cuối dưới `## Lịch sử`, hoặc vào [log](log.md).
- Mỗi trang một loại (hướng dẫn, tham chiếu, giải thích). Không trộn.
- Ngày tuyệt đối (`2026-10-23`), không viết "tuần trước".
- Sơ đồ: Mermaid hoặc ASCII trong code fence.
- Link trong `docs/` chỉ trỏ tới file trong `docs/`. File ngoài `docs/` viết trong dấu nháy ngược: `` `website/src/components/Navbar.tsx` ``.
- Cỡ trang: cảnh báo trên 40 KB, lỗi trên 80 KB. Trang quá lớn tách thành trang tổng quan cộng trang con.
- Không chép giá trị token màu của brand khác. Link tới nguồn của brand.
- Không xoá trang đã có URL công khai mà không thêm dòng chuyển hướng vào `docs/public/_redirects`.

## 7. Docs đi cùng code

Thay đổi trong `website/`, `media/` hoặc `api/` làm lệch brief phải sửa trang tương ứng trong `docs/` **trong cùng commit**. Bảng ánh xạ nằm trong `CLAUDE.md` ở gốc repo. CI job `docs-sync` chặn PR sửa code mà không sửa `docs/` (ghi `[no-docs]` trong mô tả PR nếu thay đổi không ảnh hưởng brief).

## 8. Cổng kiểm

```bash
cd docs
npm run check     # frontmatter, description, link nội bộ, cỡ trang
npm run build     # VitePress báo link hỏng, sinh llms.txt
```

## 9. Dành cho agent

- Bắt đầu từ `https://docs.danghong.me/llms.txt`: mục lục, mỗi trang một dòng kèm `description`.
- Mỗi trang có bản Markdown sạch ở cùng đường dẫn cộng đuôi `.md`. Toàn bộ docs trong `https://docs.danghong.me/llms-full.txt`.
- Trong repo, đọc thẳng `docs/`.

## Lịch sử

- 2026-10-23: Chuyển từ cấu trúc A/B/C (theo loại tài liệu, file `RULES.md` cũ) sang cấu trúc theo site cộng lớp dùng chung. Lý do ở [ADR-001](decisions/adr-001-site-based-docs.md).
