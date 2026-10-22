# media — media.danghong.me

Một nơi duy nhất cho thông tin, ảnh, video, tài liệu và link về Hồng.

- Thêm ảnh vào album: thả vào thư mục của album (ví dụ `files/photos/family/me/`).
- Thêm album, câu chuyện, link, video, người, sửa hồ sơ: sửa `media.yaml`.
- Trang [media.danghong.me/edit/](https://media.danghong.me/edit/) có nút mở thẳng các chỗ cần sửa trên GitHub.
- Merge vào `main` là site tự deploy.

```bash
npm install
npm run build    # sinh dist/
npm run preview  # xem tại http://localhost:8788
```

Hướng dẫn đầy đủ và JSON API: [C3 Media Library](https://docs.danghong.me/C_IMPLEMENTATION/C3_Media_Library).
