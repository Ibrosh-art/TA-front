import { title } from "framer-motion/client";

export const matchesData = [
  {
    id: 1,
    date: "15 СЕН 2024",
    time: "18:00",
    homeTeam: "Дордой FC",
    awayTeam: "Абдыш-Ата",
    competition: "Премьер-Лига",
    venue: "Стадион Дордой",
    ticketAvailable: true,
    homeScore: null,
    awayScore: null,
    homeLogo: "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png",
    awayLogo: "/images/logos/abdysh-ata.png"
  },
  {
    id: 2,
    date: "22 СЕН 2024",
    time: "17:30",
    homeTeam: "Дордой FC",
    awayTeam: "Алга",
    competition: "Кубок Кыргызстана",
    venue: "Стадион Дордой",
    ticketAvailable: true,
    homeScore: null,
    awayScore: null,
    homeLogo: "/images/logos/dordoi.png",
    awayLogo: "/images/logos/alga.png"
  },
  {
    id: 3,
    date: "29 СЕН 2024",
    time: "19:00",
    homeTeam: "Нефтчи",
    awayTeam: "Дордой FC",
    competition: "Премьер-Лига",
    venue: "Стадион Нефтчи",
    ticketAvailable: false,
    homeScore: null,
    awayScore: null,
    homeLogo: "/images/logos/neftchi.png",
    awayLogo: "/images/logos/dordoi.png"
  },
  {
    id: 4,
    date: "5 ОКТ 2024",
    time: "16:00",
    homeTeam: "Дордой FC",
    awayTeam: "Алай",
    competition: "Премьер-Лига",
    venue: "Стадион Дордой",
    ticketAvailable: true,
    homeScore: null,
    awayScore: null,
    homeLogo: "/images/logos/dordoi.png",
    awayLogo: "/images/logos/alay.png"
  },
  {
    id: 5,
    date: "12 ОКТ 2024",
    time: "15:00",
    homeTeam: "Алга",
    awayTeam: "Дордой FC",
    competition: "Премьер-Лига",
    venue: "Стадион Алга",
    ticketAvailable: false,
    homeScore: null,
    awayScore: null,
    homeLogo: "/images/logos/alga.png",
    awayLogo: "/images/logos/dordoi.png"
  }
];


export const newsArticles = [
    { title: "Спасибо Бектур и Марлен", date: "18.01.2025", link: "#" },
    { title: "BENVENUTO GIANLUCA CAPRARI", date: "07/18/2022", link: "#" },
    { title: "IL CORDOGLIO DEL MONZA", date: "07/14/2022", link: "#" },
    { title: "DIAW IN PRESTITO AL MODENA", date: "06/29/2022", link: "#" },
    { title: "MOROSINI IN SANGIULIANO CITY", date: "06/15/2022", link: "#" },
    { title: "WEDNESDAY 20 JULY FRIENDLY", date: "06/03/2022", link: "#" },
];

export const newsData = [
  {
    id: 1,
    title: "Дордой FC разгромил соперника 4:0 в товарищеском матче",
    date: "15 СЕН 2024",
    category: "Матчи",
    excerpt: "Хет-трик Азиза Исмаилова принес команде уверенную победу. Главный тренер доволен подготовкой к сезону.",
    image: "https://scontent.ffru6-1.fna.fbcdn.net/v/t39.30808-6/488005836_1107666661382318_1528436289875417196_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=T9ofIpCP1yIQ7kNvwFsOKiB&_nc_oc=AdmsMmTYwls7QKmoNj79dvzjJjN2IPLJ7qwQYUdNTx2eVHEitXS_AK1JPjN72E4mgSk&_nc_zt=23&_nc_ht=scontent.ffru6-1.fna&_nc_gid=CW8XNzKYfsxN6FLYsJwYig&oh=00_AfFZF8HLWoG4442lqDu12_P_MKhTE3LFPHamxBP2RMdS0Q&oe=680A8B43",
    featured: true
  },
  {
    id: 2,
    title: "Новый защитник подписал контракт на 2 года",
    date: "12 СЕН 2024",
    category: "Трансферы",
    excerpt: "Бразилец Лукас Силва усилил оборонительную линию. Подробности сделки и первые слова игрока.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: false
  },
  {
    id: 3,
    title: "Реконструкция стадиона завершена",
    date: "8 СЕН 2024",
    category: "Инфраструктура",
    excerpt: "Вместимость арены увеличилась на 1500 мест. Установлены новые LED-экраны и комфортабельные сиденья.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Молодежка выиграла турнир в Алматы",
    date: "5 СЕН 2024",
    category: "Академия",
    excerpt: "Юные футболисты одержали 5 побед в 5 матчах. Лучшим игроком признан 17-летний полузащитник.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Капитан команды получил вызов в сборную",
    date: "3 СЕН 2024",
    category: "Матчи",
    excerpt: "Официальное заявление тренерского штаба национальной команды. Игрок пропустит два матча чемпионата.",
    image: "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    featured: false
  }
];

const competitions = ["Все", "Премьер-Лига", "Кубок Кыргызстана", "Дружеские матчи"];








//banner 

export const banner = [
  {"image": "https://cdn.inflact.com/media/494775668_18405490759099823_2879945219797116414_n.jpg?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.2885-15%2F494775668_18405490759099823_2879945219797116414_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08_tt6%26_nc_ht%3Dscontent-del2-1.cdninstagram.com%26_nc_cat%3D111%26_nc_oc%3DQ6cZ2QGrFf4YcbW2o0K3f4cjO_7ENBx7TvuhRcBPlaLV51W7Iahb17bNByQDCU5cgNRtkaA%26_nc_ohc%3DF2FCmTldUKEQ7kNvwGMST8H%26_nc_gid%3DpgwYq9Spkx6xcUIQKGUbMg%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfF1f41UOnSBFWfdLFZeiW-2SdLJP7E1d1XtHCOwzHf6_A%26oe%3D681E5FC4%26_nc_sid%3Dd885a2&time=1746435600&key=3236e45aba03184a13bb492526174d8b",
    "title": "hello world",
  },
  
  {"image": "https://cdn.inflact.com/media/494465574_18405477730099823_7771965464729150666_n.jpg?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.2885-15%2F494465574_18405477730099823_7771965464729150666_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08_tt6%26_nc_ht%3Dinstagram.fsgn24-2.fna.fbcdn.net%26_nc_cat%3D111%26_nc_oc%3DQ6cZ2QGTwgaMlaVL6TSc9yablO9L0cKDxbjw7p0ZJT15FQjzIzsPLJco4dq_O5eyDdHuIRw%26_nc_ohc%3DV4d3Km6L6kkQ7kNvwGXh3kw%26_nc_gid%3D--EUTenA6vah4BfRvZLVLQ%26edm%3DAOQ1c0wBAAAA%26ccb%3D7-5%26ig_cache_key%3DMzYyNDMxNzYzNDQ1OTM2ODUyNg%253D%253D.3-ccb7-5%26oh%3D00_AfGFpwo_eSO6lY_Xi0oDF3gjL-xTkA7G_8mf5skTT20lYg%26oe%3D681E546B%26_nc_sid%3D8b3546&time=1746435600&key=a7c9771fffce275c4c7a91d69ab854d0",
    "title": "salam",
  },
  
  {"image": "https://cdn.inflact.com/media/494793992_18405428674099823_166118805402991316_n.jpg?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.2885-15%2F494793992_18405428674099823_166118805402991316_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080_sh0.08_tt6%26_nc_ht%3Dinstagram.fsgn24-2.fna.fbcdn.net%26_nc_cat%3D111%26_nc_oc%3DQ6cZ2QGTwgaMlaVL6TSc9yablO9L0cKDxbjw7p0ZJT15FQjzIzsPLJco4dq_O5eyDdHuIRw%26_nc_ohc%3DGj5bLCzRcHYQ7kNvwEBTO2a%26_nc_gid%3D--EUTenA6vah4BfRvZLVLQ%26edm%3DAOQ1c0wBAAAA%26ccb%3D7-5%26ig_cache_key%3DMzYyNDA1ODIzNDc1MDU4MzUyNQ%253D%253D.3-ccb7-5%26oh%3D00_AfHu4OFOiH4Dz730iPR3ZwTkWZ7Iu7Rp6netSwyaiUcbkg%26oe%3D681E76D9%26_nc_sid%3D8b3546&time=1746435600&key=d68ba9e17717912f6994992486dd3fc9",
    "title": "aleykum",
  },

] 


export const storyCategories = ["Все", "История клуба", "Легенды", "Стадион", "Фанаты", "Достижения", "Сообщество"];

export const storiesData = [
  {
    id: 1,
    title: "Основание FC Dordoi: История начинается",
    excerpt: "В 1997 году был основан футбольный клуб Дордой, который стал одним из самых успешных в Кыргызстане.",
    image: "https://via.placeholder.com/800x600?text=FC+Dordoi+Foundation",
    category: "История клуба",
    date: "1 января 2023"
  },
  // Add more stories...
];