export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  job: string;
  birthYear?: number;
  coverImage: string;
  images: string[];
  admirations?: string[];
  lessons?: string[];
  hobbies?: string[];
  favoriteGames?: string[];
  favoriteArtists?: string[];
  quotes?: string[];
  quotesTitle?: string;
  storySections?: { title: string; content: string }[];
}

export const familyMembers: FamilyMember[] = [
  {
    id: "bo",
    name: "Đặng Trần Mạnh",
    role: "Bố",
    job: "Kinh doanh tự do",
    birthYear: 1979,
    coverImage: "/images/family/bo/2aOboQinLccGG95v9BAYPWm2PG2h3u6EIh1cLjnM.jpg",
    images: [
      "/images/family/bo/2aOboQinLccGG95v9BAYPWm2PG2h3u6EIh1cLjnM.jpg",
      "/images/family/bo/21617d3a42d2c38c9ac3.jpg",
      "/images/family/bo/2aOboQin9GSQeyZbVYG4gbj0E8sdYYaspP7w3C5o (1).jpg",
      "/images/family/bo/2aOboQin9GSQeyZbVYG4gbj0E8sdYYaspP7w3C5o.jpg",
      "/images/family/bo/2aOboQin9H79hpx5z5WMuTx6CN95neVIqK2S5pBo.jpg",
      "/images/family/bo/2aOboQinLcv5uX3skqiFbJhG6MKIERLDz9O5uHA0.jpg",
      "/images/family/bo/2aOboQinLdwcIlVcg1nXH1Jpo2xHGBzzq8AKKqaO.jpg",
      "/images/family/bo/af3a47727f9afec4a78b.jpg",
    ],
    admirations: [
      "Từng leo lên đỉnh Everest (nóc nhà thế giới), và chơi Bungee Jump ở đó luôn",
      "Là một trong 4 người Việt Nam đầu tiên hoàn thành chặng bơi gần 60km trên eo biển dài nhất nước Anh - English Channel",
      "5h00 sáng 365 ngày trong năm (không bỏ bất kì ngày nào) dậy đi bơi sông Hồng/bơi ở bể hoặc chạy bộ 10km mới về nhà ăn sáng đi làm"
    ],
    lessons: [
      "Kỉ luật (Hiện tại 1 tuần tôi đi tập thể dục một lần là cả nhà đã cảm thấy như trời sắp có bão rồi...)",
      "Sức khoẻ",
      "Vươn đến đỉnh cao"
    ]
  },
  {
    id: "me",
    name: "Phạm Thị Tuyết Lê",
    role: "Mẹ",
    job: "Nội trợ (chính) & Kinh doanh tự do (phụ)",
    birthYear: 1979,
    coverImage: "/images/family/me/37a88975bb9e3ac0638f2.jpg",
    images: [
      "/images/family/me/37a88975bb9e3ac0638f2.jpg",
      "/images/family/me/1ce1a43c96d717894ec61.jpg",
      "/images/family/me/bd56e98bdb605a3e03714.jpg",
      "/images/family/me/d2988a45b8ae39f060bf3.jpg"
    ],
    admirations: [
      "Làm mẹ của 3 đứa con, làm vợ của một ông chồng gia trưởng :)",
      "Là người nuôi dưỡng lòng ham học của tôi"
    ],
    lessons: [
      "Ham học cầu tiến",
      "Tự tin",
      "Trung thực"
    ],
    quotesTitle: "Những câu chuyện đứng bếp (Lời mẹ dạy khi nấu ăn)",
    quotes: [
      "Tốc độ suy nghĩ: Trước khi con định làm gì, ví dụ như lấy nước hay nấu bát mì, phải suy nghĩ 10 giây xem có các hướng nào, cách nào nhanh nhất để làm xong và làm tốt",
      "Tốc độ thực thi: Ko nhanh thì ko có cả cám lợn mà ăn",
      "Tốc độ thích nghi điều chỉnh: Giờ có đổi sang môi trường khác mà con vẫn ko làm ok hơn thì sao :)))"
    ],
    storySections: [
      {
        title: "01. Mẹ chính là hiện thân của tri thức và khát vọng vượt khó không mệt mỏi",
        content: "Mẹ xuất thân là con cả ở một gia đình Thái Bình (cũ). Dù phải chăm em thơ, làm ruộng, mẹ vẫn tranh thủ học để đỗ đại học lên Hà Nội. Khi có con đầu lòng (là tôi), mẹ vừa chăm tôi vừa học văn bằng hai. Đầu giường mẹ lúc nào cũng chất đầy sách đủ lĩnh vực: kinh tế, tâm lý, phong thủy, y học cổ truyền... Mẹ là hình mẫu lớn nhất về việc tự học đối với tôi."
      },
      {
        title: "02. Mẹ ủng hộ vô điều kiện những ý tưởng nghe “điên điên” của tôi",
        content: "Hồi cấp 1, tôi muốn bán bánh kẹo cho các bạn ở lớp học thêm vì lúc đó mọi người hay đói. Mẹ không cấm mà còn dạy tôi cách làm sổ sách quản lý thu chi, rồi rót vốn cho tôi nhập hàng. Tôi bán chạy đến mức thầy chủ trung tâm bảo nếu có bảng vàng danh dự chắc chắn sẽ có tên tôi.\n\nĐến năm lớp 10, tôi học tiếng Hàn rất dở. Mẹ thấy dưới nhà có nhà hàng Hàn Quốc liền khuyên tôi xuống xin việc phục vụ để thực hành. Dù tôi sợ hãi viện đủ lý do, mẹ vẫn dắt tôi xuống và thuyết phục ông chủ Hàn Quốc nhận tôi (vì ông ấy xa quê nên rất cần người trò chuyện). Công việc đó đã cho tôi những va chạm xã hội vô giá."
      },
      {
        title: "03. Mẹ dạy tôi về tâm thế đón nhận cuộc sống",
        content: "Mẹ luôn bảo: 'Con cứ nhẹ nhàng với cuộc đời thì cuộc đời cũng sẽ nhẹ nhàng với con thôi'. Nhờ câu nói đó, mỗi khi gặp khó khăn hay nỗi sợ, tôi lại xem đó là cơ hội phản tư, vượt qua con dốc khúc khuỷu để học thêm nhiều bài học mới."
      }
    ]
  },
  {
    id: "huy",
    name: "Đặng Trần Huy",
    role: "Em trai",
    job: "Sinh viên năm 2 trường Đại học Ngoại thương (Khoa Tiếng Anh thương mại)",
    coverImage: "/images/family/huy/img1.jpg",
    images: [
      "/images/family/huy/img1.jpg",
      "/images/family/huy/img2.jpg"
    ],
    favoriteGames: ["Minecraft", "Roblox (chơi từ hồi nó còn học cấp 1 thì phải, tôi vẫn nhớ nó học thói xấu đổi tab chơi game với học bài từ tôi :))"],
    favoriteArtists: ["Kendrick Lamar", "MCK"],
    admirations: [
      "Người đàn ông của gia đình, luôn hỗ trợ mẹ quán xuyến các công việc trong gia đình (gấp và giặt quần áo, dọn dẹp nhà cửa, thỉnh thoảng rửa bát hộ mẹ, ...)",
      "Nấu ăn ngon",
      "Thể hiện tình yêu thương với gia đình (tối nào cũng sang ngó chị hỏi thăm 1,2 câu rồi mới đi ngủ, hay giúp mẹ chăm em, rồi lo lắng mỗi khi mẹ ốm)",
      "8.0 IELTS ngay trong lần thi đầu (Nhờ em tôi nên tôi có thể \"được phép\" lười...)"
    ],
    lessons: [
      "Tình yêu thương"
    ]
  },
  {
    id: "chau",
    name: "Đặng Minh Châu",
    role: "Em gái",
    job: "2 tuổi (cách tôi - chị nó 20 tuổi, đẻ ra nó còn được luôn)",
    coverImage: "/images/family/minh-chau/09bd78864b6dca33937c12.jpg",
    images: [
      "/images/family/minh-chau/09bd78864b6dca33937c12.jpg",
      "/images/family/minh-chau/532d9b16a8fd29a370ec9.jpg",
      "/images/family/minh-chau/5801923aa1d1208f79c011.jpg",
      "/images/family/minh-chau/963c630750ecd1b288fd10.jpg"
    ],
    hobbies: ["Chạy", "Ngủ", "Tuti mẹ"],
    lessons: [
      "Quan sát em tôi lớn lên từng ngày giúp tôi tự phản tư được về chính mình (vì mỗi lời tôi nói ra, mỗi hành vi của tôi đều ảnh hưởng đến nhỏ em tôi)",
      "Là động lực khiến tôi quyết định hàn gắn với gia đình sau 3 năm xa cách (dẫu cho ở cùng nhà)",
      "Là niềm vui bé nhỏ của gia đình tôi mỗi giờ ăn cơm"
    ]
  }
];

export const familyStories = {
  loveStory: `Theo như lời mẹ tôi kể thì mẹ tôi xinh gái học giỏi nhất lớp nên bố tôi theo đuổi với nhiều anh khác. Không hiểu sao dính bùa mê thuốc lú gì lại chọn bố tôi (dù mặt rõ là xấu giai :)). 

Còn bố tôi thì kể do bố tôi học giỏi với hay chở mẹ, chở cả em gái em trai mẹ đi học 10 cây số nên mẹ tôi mới đổ bố trước. 

Không biết version nào là thật nhưng chắc chắn một điều là: Bố mẹ tôi học chung trường đại học với nhau nhưng khác lớp. Quen nhau nhờ một lần học chung tín chỉ và được bè bạn gán ghép.`,
  habits: [
    "Ăn cơm với nhau ít nhất 1 bữa gần như hàng ngày. Phòng ăn tách riêng với phòng khách, nên không bao giờ bật TV mà tập trung ăn uống nói chuyện.",
    "Đón ngày sinh nhật với nhau (Lần nào cũng mở tiệc rất to mua bánh kem rồi mời họ hàng đến nhà ăn lẩu)."
  ]
};
