# B6 — Database Schema: My Studio

> **Project**: danghong.me — Active Supabase Project: `rtisctjvtuubuigiccld`
> **Last Updated**: 2026-05-12

---

## Tổng quan kiến trúc

```
auth.users
    │
    └── public.profiles (1-1)
            │
            ├── [Pillar 1] public.product_favourites    → My Favourites
            ├── [Pillar 2] public.course_favourites     → My List
            ├── [Pillar 3a] public.book_progress        → My Progress (Learning)
            ├── [Pillar 3b] public.user_notes           → My Progress (Notes)
            └── [Pillar 4] public.active_traces         → My History (Unified timeline)
```

---

## Pillar 1 — My Favourites

**Table**: `product_favourites` ✅ LIVE

| Column | Type | Default | Ghi chú |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `user_id` | uuid | — | FK → profiles.id |
| `product_slug` | text | — | FK → products.slug |
| `created_at` | timestamptz | now() | |

UNIQUE(user_id, product_slug) · RLS: SELECT/INSERT/DELETE (owner only)

**Trigger**: `trg_log_product_favourite` → auto-ghi trace `action_type='like'`

---

## Pillar 2 — My List

**Table**: `course_favourites` ✅ LIVE

| Column | Type | Default | Ghi chú |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `user_id` | uuid | — | FK → profiles.id |
| `course_slug` | text | — | FK → courses.slug |
| `created_at` | timestamptz | now() | |

UNIQUE(user_id, course_slug) · RLS: SELECT/INSERT/DELETE (owner only)

---

## Pillar 3A — My Progress (Reading)

**Table**: `book_progress` ✅ LIVE

| Column | Type | Default | Ghi chú |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `user_id` | uuid | — | FK → profiles.id |
| `book_slug` | text | — | e.g. 'learning-design-series' |
| `chapter_id` | text | — | e.g. 'ld-1' |
| `chapter_title` | text | — | Denormalized |
| `status` | text | 'not_started' | not_started/in_progress/completed |
| `progress_pct` | smallint | 0 | 0–100 |
| `quiz_passed` | boolean | false | Pass quiz 3-layer |
| `last_accessed` | timestamptz | now() | |
| `completed_at` | timestamptz | — | Auto-set by trigger |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | Auto-updated |

UNIQUE(user_id, chapter_id) · RLS: SELECT/INSERT/UPDATE/DELETE (owner only)

**Triggers**:
- `trg_book_progress_updated_at` → auto-set updated_at + completed_at
- `trg_log_book_progress` → ghi trace `action_type='quiz_pass'` khi completed

---

## Pillar 3B — My Progress (Notes)

**Table**: `user_notes` ✅ LIVE

| Column | Type | Default | Ghi chú |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `user_id` | uuid | — | FK → profiles.id |
| `entity_type` | text | 'general' | book_chapter/course/product/general |
| `entity_id` | text | — | Slug hoặc chapter_id |
| `entity_title` | text | — | Denormalized |
| `content` | text | — | Nội dung ghi chép |
| `is_private` | boolean | true | |
| `created_at` | timestamptz | now() | |
| `updated_at` | timestamptz | now() | |

RLS: SELECT/INSERT/UPDATE/DELETE (owner only)

**Trigger**: `trg_log_user_note` → auto-ghi trace `action_type='note'`

---

## Pillar 4 — My History

**Table**: `active_traces` ✅ LIVE (extended)

| Column | Type | Default | Ghi chú |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `user_id` | uuid | — | FK → profiles.id |
| `action_type` | text | — | Xem bảng dưới |
| `entity_id` | text | — | ID/slug entity |
| `entity_type` | text | 'product' | product/course/book_chapter/general |
| `entity_title` | text | — | Denormalized |
| `metadata` | jsonb | {} | Flexible payload |
| `created_at` | timestamptz | now() | |

**action_type values:**

| Value | Nguồn | Mô tả |
|-------|-------|-------|
| `like` | Auto trigger | User ♥ sản phẩm |
| `note` | Auto trigger | User lưu ghi chép |
| `quiz_pass` | Auto trigger | User hoàn thành chapter quiz |
| `progress` | FE manual | User cập nhật % đọc |
| `view` | FE manual | User mở xem chi tiết |
| `comment` | FE manual | User bình luận |

---

## Trigger Flow

```
User ♥ product
  → INSERT product_favourites
    → trg_log_product_favourite
      → INSERT active_traces { action_type='like' }

User lưu note
  → INSERT user_notes
    → trg_log_user_note
      → INSERT active_traces { action_type='note' }

User hoàn thành chapter
  → UPDATE book_progress { status='completed' }
    → trg_log_book_progress → INSERT active_traces { action_type='quiz_pass' }
    → trg_book_progress_updated_at → SET completed_at = now()
```

---

## RLS Summary

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| product_favourites | owner | owner | — | owner |
| course_favourites | owner | owner | — | owner |
| book_progress | owner | owner | owner | owner |
| user_notes | owner | owner | owner | owner |
| active_traces | owner | owner | — | owner |

> [!IMPORTANT]
> Tất cả bảng My Studio đều có RLS enabled. Dữ liệu của user này không thể bị user khác đọc.

---

## Next Steps

- [ ] **My List**: Tạo `CourseListButton` component cho `/list` page
- [ ] **My Progress**: UPSERT `book_progress` khi user bắt đầu/hoàn thành chapter trong `/books/ld-series`
- [ ] **My History**: Render `active_traces` dạng timeline trong `HistoryView`
- [ ] **Notes Editor**: Thêm note input trong BookDetail modal → INSERT `user_notes`
- [ ] **Profile XP**: Cộng `xp_points` vào `profiles` khi đạt milestone
