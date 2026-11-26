export type Locale = "tr" | "en";

export interface ProjectScreen {
  src: string;
  caption: string;
}

export interface WorkCase {
  id: "ravion" | "foodactor" | "kfg" | "sunbeam";
  num: string;
  client: string;
  year: string;
  title: string;
  metricBadge: string;
  liveUrl?: string;
  liveLabel?: string;
  description: string;
  detail: string;
  stackLine: string;
  screens: ProjectScreen[];
  problemTitle: string;
  problemBody: string;
  stepsTitle: string;
  architectureSteps: string[];
  outcomes: Array<{
    value: string;
    label: string;
  }>;
}

export interface OpenSourceHighlight {
  badge: string;
  title: string;
  repoName: string;
  repoUrl: string;
  ctaLabel: string;
  description: string;
  stack: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  meta: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface CraftTrack {
  title: string;
  description: string;
  tools: string;
}

export interface TrustPoint {
  num: string;
  title: string;
  body: string;
}

export interface ContactIntent {
  id: string;
  label: string;
  subject: string;
  bodyPrompt: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  cvHref: string;
  nav: {
    work: string;
    process: string;
    experience: string;
    contact: string;
    cvButton: string;
    talkCta: string;
  };
  hero: {
    greeting: string;
    headline: string;
    headlineAccent: string;
    bio: string;
    primaryCta: string;
    secondaryCta: string;
    cvDownloadCta: string;
    portraitRole: string;
    portraitLocation: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  work: {
    kicker: string;
    heading: string;
    sub: string;
    inspectCta: string;
    screensCountLabel: string;
    drawerPrev: string;
    drawerNext: string;
    drawerClose: string;
    drawerDiscussCta: string;
    drawerGalleryTitle: string;
    cases: WorkCase[];
    openSource: OpenSourceHighlight;
  };
  process: {
    kicker: string;
    quote: string;
    sub: string;
    portraitCaption: string;
    points: TrustPoint[];
  };
  background: {
    experienceHeading: string;
    experienceSub: string;
    entries: ExperienceEntry[];
    educationLabel: string;
    education: {
      degree: string;
      school: string;
      department: string;
      status: string;
      details: string;
    };
    craftHeading: string;
    craftSub: string;
    tracks: CraftTrack[];
  };
  contact: {
    kicker: string;
    heading: string;
    sub: string;
    intentTitle: string;
    intents: ContactIntent[];
    sendEmail: string;
    copyEmail: string;
    copiedEmail: string;
    downloadCv: string;
    timezoneNote: string;
  };
  footer: {
    rights: string;
    top: string;
  };
}

export const SITE_CONTENT: Record<Locale, SiteContent> = {
  tr: {
    meta: {
      title: "Kenan Umut Pulat — Web Geliştirici & AI Operasyon Uzmanı",
      description:
        "Tasarımı temiz, altyapısı sağlam web siteleri, Next.js & Supabase uygulamaları, 600+ sayfalık SEO sistemleri ve sunucu kurulumları.",
    },
    cvHref: "/Kenan-Umut-Pulat-CV-TR.pdf",
    nav: {
      work: "Projeler",
      process: "Çalışma Biçimi",
      experience: "Deneyim",
      contact: "İletişim",
      cvButton: "CV (PDF)",
      talkCta: "Tanışalım",
    },
    hero: {
      greeting: "Merhaba, ben Kenan Umut.",
      headline: "Tasarımı sade, altyapısı sağlam",
      headlineAccent: "web sistemleri kuruyorum.",
      bio: "Next.js web uygulamalarından 600+ sayfalık programatik SEO mimarilerine ve canlı Nginx sunucu kurulumuna kadar işin mutfağında çalışıyorum. ABD merkezli ajans, kurumsal B2B markalar ve kendi ürün projelerimden gerçek ekranları aşağıda inceleyebilirsin.",
      primaryCta: "Birlikte çalışalım",
      secondaryCta: "Gerçek projeleri incele",
      cvDownloadCta: "CV İndir (PDF)",
      portraitRole: "Web Developer & AI Operations",
      portraitLocation: "Burdur, TR",
      stats: [
        { number: "600+", label: "Yayına alınan SEO sayfası" },
        { number: "100+", label: "Sektörel şablon & açılış sayfası" },
        { number: "B2B & Ürün", label: "Canlıya çıkan web platformları" },
      ],
    },
    work: {
      kicker: "Yayına Alınan Gerçek Projeler",
      heading: "Üstlendiğim ve canlıya çıkardığım web platformları.",
      sub: "Aşağı kaydırdıkça ABD merkezli ajans/B2B projeleri ile GitHub üzerinde geliştirdiğim canlı uygulamaları görebilirsin. Kartların üzerindeki oklarla ekranlar arasında gezebilir veya detay panelini açabilirsin.",
      inspectCta: "Ekranları ve detayı aç",
      screensCountLabel: "ekran",
      drawerPrev: "Önceki Proje",
      drawerNext: "Sonraki Proje",
      drawerClose: "Kapat",
      drawerDiscussCta: "Benzer bir proje konuşalım",
      drawerGalleryTitle: "Proje Ekran Görüntüleri (Büyütmek için tıkla)",
      cases: [
        {
          id: "ravion",
          num: "01",
          client: "Ravion Digital Media LLC · ABD",
          year: "2026",
          title: "Ravion Digital Media — Ajans Platformu ve 100+ Web Şablon Mağazası",
          metricBadge: "Ajans & Şablon Mağazası",
          description:
            "ABD merkezli dijital medya ajansının ana web platformunu, paket satış akışını ve onlarca farklı sektörü kapsayan hazır web şablon mağazasını (Store) tasarlayıp yayına aldım.",
          detail:
            "Mağaza içinde gayrimenkul, güneş enerjisi ve kurumsal yapıların yanı sıra klinik diyetisyen, sporcu beslenmesi ve sağlık danışmanlığı gibi dikeylerde 100'ü aşkın dönüşüm odaklı arayüz üretildi; WhatsApp destek hattı ve sepet yapısıyla birleştirildi.",
          stackLine: "Next.js · Tailwind CSS · 100+ Sektörel Şablon · E-Ticaret Sepet · WhatsApp Hattı",
          screens: [
            {
              src: "/projects/ravion-hero.jpg",
              caption: "Ana giriş ekranı — Ravion Digital Media kurumsal açılış sayfası",
            },
            {
              src: "/projects/ravion-2.jpg",
              caption: "Sektör filtreli şablon mağazası ve arama arayüzü (raviondigital.com/store)",
            },
            {
              src: "/projects/ravion-3.jpg",
              caption: "Tarım güneş enerjisi, emlak ve ticari alan açılış sayfası şablonları",
            },
            {
              src: "/projects/ravion-4.jpg",
              caption: "Klinik diyetisyen, online diyet ve sağlık dikeyi web şablonları",
            },
            {
              src: "/projects/ravion-5.jpg",
              caption: "Şeffaf fiyatlandırma yapısı ve kurumsal müşteri referans alanı",
            },
          ],
          problemTitle: "Proje Bağlamı",
          problemBody:
            "Ravion Digital Media'nın hem anahtar teslim ajans paketlerini net biçimde satabileceği kurumsal bir vitrine hem de farklı sektörlerdeki işletmelerin doğrudan seçip satın alabileceği geniş ölçekli bir şablon mağazasına ihtiyacı vardı.",
          stepsTitle: "Neler Yapıldı?",
          architectureSteps: [
            "Ajansın hizmet, paket karşılaştırma, müşteri referansı ve doğrudan WhatsApp iletişim akışlarını içeren ana platformunu kurdum.",
            "Sektör bazlı arama ve filtreleme yapılabilen, sepet çekmecesine sahip dijital şablon mağazasını (Store) geliştirdim.",
            "Sağlık/diyetisyen kliniklerinden ticari gayrimenkul ve enerjiye kadar 100'den fazla mobil uyumlu açılış sayfası ve şablon ürettim.",
            "600+ sayfalık Hub & Spoke programatik SEO altyapısı ve VPS/Nginx sunucu yönlendirmeleriyle platformun yayına çıkışını yönettim.",
          ],
          outcomes: [
            { value: "100+", label: "Hazır sektörel arayüz" },
            { value: "600+", label: "Programatik SEO sayfası" },
            { value: "Store + Paket", label: "Çift gelir modeli" },
          ],
        },
        {
          id: "foodactor",
          num: "02",
          client: "Foodactor · Kişisel Ürün & GitHub Projesi",
          year: "2026",
          title: "Foodactor — Dünya ve Akdeniz Mutfağı Tarif Platformu",
          metricBadge: "Next.js & Supabase",
          liveUrl: "https://foodactor-com.vercel.app",
          liveLabel: "Canlı Siteyi Aç",
          description:
            "Türk, Fransız, İspanyol ve Akdeniz mutfaklarından şef onaylı tarifleri, malzeme aramasını ve mutfak rehberlerini tek çatı altında toplayan modern web uygulaması.",
          detail:
            "Next.js 16, React 19, TypeScript ve Supabase altyapısıyla geliştirildi. Keskin editoryal-brütalist kart tasarımı, kategori filtreleme, favorilere kaydetme ve çok dilli içerik betikleriyle canlı ortamda çalışıyor.",
          stackLine: "Next.js 16 · TypeScript · Supabase · Tailwind CSS v4 · Framer Motion · Vercel",
          screens: [
            {
              src: "/projects/foodactor-1.jpg",
              caption: "Ana giriş ekranı — Malzeme bazlı arama çubuğu ve editoryal ızgara",
            },
            {
              src: "/projects/foodactor-2.jpg",
              caption: "Kategori filtreleri ve Akdeniz seçkisi (Mediterranean Breeze)",
            },
            {
              src: "/projects/foodactor-3.jpg",
              caption: "Türk ve dünya mutfağı tarif kartları — Süre, zorluk ve porsiyon etiketleri",
            },
          ],
          problemTitle: "Proje Bağlamı",
          problemBody:
            "Reklam yığınları ve uzun metinlerle dolu klasik yemek sitelerinin aksine; aranan tarife, malzemeye, pişirme süresine ve zorluk derecesine anında ulaşılabilen hızlı ve karakterli bir tarif platformu kurmak istedim.",
          stepsTitle: "Neler Yapıldı?",
          architectureSteps: [
            "Next.js App Router, TypeScript ve Supabase kullanarak hızlı sorgulanan, ölçeklenebilir bir içerik ve veri katmanı kurdum.",
            "Kareli mutfak defteri dokusu üzerinde yüksek kontrastlı, okunaklı neo-brütalist tarif kartları ve kategori filtreleri tasarladım.",
            "Tariflerin çok dilli (TR / EN) çeviri ve veri denetim süreçlerini otomatikleştiren Node.js yardımcı betikleri yazdım.",
            "PWA manifest desteği, güvenlik başlıkları (CSP) ve Vercel dağıtımıyla canlıya aldım.",
          ],
          outcomes: [
            { value: "Canlı Ürün", label: "foodactor-com.vercel.app" },
            { value: "Supabase", label: "Dinamik veri ve arama" },
            { value: "Next.js 16", label: "TypeScript & Tailwind v4" },
          ],
        },
        {
          id: "kfg",
          num: "03",
          client: "Kinetic Fuel Group (KFG) · ABD",
          year: "2026",
          title: "Kinetic Fuel Group — Kurumsal B2B Akaryakıt ve Filo Lojistiği",
          metricBadge: "Kurumsal B2B Platform",
          description:
            "Orta Batı ABD'deki büyük ölçekli nakliye filolarına toptan dizel tedariki ve lojistik aracılık sağlayan Kinetic Fuel Group için keskin, endüstriyel ve yüksek güven veren bir kurumsal platform hazırladım.",
          detail:
            "Perakende kullanıcıya değil doğrudan filo yöneticilerine ve satın alma karar vericilerine hitap eden koyu endüstriyel tipografi, net kontrat kuralları ve doğrudan fiyat teklifi (Request Contract Pricing) akışı kurgulandı.",
          stackLine: "Kurumsal B2B UI · Çok Sayfalı Mimari · Satış Hunisi · Kontrat Teklif Akışı",
          screens: [
            {
              src: "/projects/kfg-1.jpg",
              caption: "Giriş ekranı — Toptan akaryakıt tedariki ve net değer önerisi",
            },
            {
              src: "/projects/kfg-2.jpg",
              caption: "Toptan alım kuralları: Ölçek ekonomisi, fiyat dalgalanması koruması ve şeffaf kontrat",
            },
            {
              src: "/projects/kfg-3.jpg",
              caption: "Stratejik aracılık (Strategic Brokerage) ve indeks bazlı fiyatlama adımları",
            },
            {
              src: "/projects/kfg-4.jpg",
              caption: "Filo operasyon denetimi çağrısı ve kurumsal alt bilgi yapısı",
            },
          ],
          problemTitle: "Proje Bağlamı",
          problemBody:
            "Yüksek hacimli dizel tedariki ve filo lojistiği gibi ciddi bir B2B sektörde sıradan, yumuşak ajans şablonları güven vermiyor. Karar vericilerin şirketin metodolojisini, kontrat disiplinini ve yasal çerçevesini saniyeler içinde net görmesi gerekiyordu.",
          stepsTitle: "Neler Yapıldı?",
          architectureSteps: [
            "Endüstriyel ağırlığı yansıtan koyu antrasit zemin, keskin tipografik hiyerarşi ve yüksek kontrastlı vurgu rengiyle marka dilini kurdum.",
            "Ana Sayfa, Stratejik Aracılık (Strategic Brokerage), Filo Lojistiği (Fleet Logistics) ve Yasal/Uyumluluk (Legal) sayfalarını net bir bilgi mimarisiyle bağladım.",
            "Fiyat dalgalanması koruması ve şeffaf marj yapısını karar vericinin tek bakışta okuyabileceği ızgara kartlarıyla sundum.",
            "Her sayfanın kritik noktalarını doğrudan kontrat fiyatlandırma talebine (Request Contract Pricing) bağladım.",
          ],
          outcomes: [
            { value: "B2B Filo", label: "Kurumsal karar verici odağı" },
            { value: "4 Ana Bölüm", label: "Aracılık, lojistik ve uyum" },
            { value: "Net Huni", label: "Doğrudan kontrat talebi" },
          ],
        },
        {
          id: "sunbeam",
          num: "04",
          client: "Sunbeam Innovations · Wisconsin & Virginia, ABD",
          year: "2026",
          title: "Sunbeam Innovations — Veri Odaklı Güneş Enerjisi Mimarisi",
          metricBadge: "Enerji & Mimari Web",
          description:
            "Wisconsin ve Virginia'daki üst segment konutlar ile ticari tesisler için uydu verisi destekli güneş enerjisi altyapıları kuran Sunbeam Innovations'ın dijital yüzünü tasarlayıp geliştirdim.",
          detail:
            "Mimari fotoğrafçılık hissini koruyan tam ekran görsel katmanlar, üç aşamalı mühendislik metodolojisi ve konut/ticari ayrımına göre özelleştirilmiş rapor talep akışları bir araya getirildi.",
          stackLine: "Mimari Arayüz Tasarımı · Responsive Frontend · Özel Rapor Hunisi · Kurumsal Sunum",
          screens: [
            {
              src: "/projects/sunbeam-1.jpg",
              caption: "Ana ekran — Precision Solar Offset Architecture",
            },
            {
              src: "/projects/sunbeam-2.jpg",
              caption: "Methodology — Uydu ve tüketim verisine dayalı şebeke bağımsızlığı",
            },
            {
              src: "/projects/sunbeam-3.jpg",
              caption: "Portfolios — Üst segment konut ve ticari tesis ayrımı",
            },
            {
              src: "/projects/sunbeam-4.jpg",
              caption: "3 aşamalı kurulum süreci: Veri çıkarımı, sistem mimarisi ve devreye alma",
            },
          ],
          problemTitle: "Proje Bağlamı",
          problemBody:
            "Standart güneş paneli satıcılarının aksine yüksek gelir grubu konutlara ve kurumsal tesislere mühendislik hizmeti sunan markanın, hem mimari estetiği hem de veri odaklı ciddiyetini aynı anda hissettirmesi gerekiyordu.",
          stepsTitle: "Neler Yapıldı?",
          architectureSteps: [
            "Modern konut mimarisini öne çıkaran geniş görsel sahneler ve rafine serif-sans tipografi dengesini kurdum.",
            "Veri çıkarımı (kW/s geçmişi), uydu haritalama ve kurulumdan oluşan 3 aşamalı mühendislik metodolojisi sayfasını tasarladım.",
            "Bireysel mülk sahipleri için 'Özel Rapor Başlat' ve kurumsal tesisler için 'Enerji Mimarıyla Görüş' şeklinde iki ayrı dönüşüm kapısı kurguladım.",
            "Tüm görsel ağırlığa rağmen masaüstü ve mobilde akıcı çalışan temiz bir frontend çıktısı teslim ettim.",
          ],
          outcomes: [
            { value: "2 Segment", label: "Üst segment konut & ticari" },
            { value: "3 Aşama", label: "Veri odaklı metodoloji sunumu" },
            { value: "ABD Pazarı", label: "Wisconsin & Virginia odağı" },
          ],
        },
      ],
      openSource: {
        badge: "Açık Kaynak · GitHub",
        title: "Maritime Safety Tracker — Denizcilik GPS ve Güvenlik Takip Uygulaması",
        repoName: "umutpulat46-ui/maritime-safety-tracker",
        repoUrl: "https://github.com/umutpulat46-ui/maritime-safety-tracker",
        ctaLabel: "GitHub Reposunu İncele",
        description:
          "Küçük tekne ve deniz araçları için yapay zeka destekli iş akışlarıyla geliştirdiğim Flutter tabanlı mobil takip uygulaması. Arka planda kesintisiz konum kaydı (workmanager), hassas GPS senkronizasyonu (geolocator), batarya durumu izleme ve çevrimdışı SQLite (sqflite) veri tabanı ile anlık manuel SOS bildirim mekanizması içerir.",
        stack: ["Flutter", "Dart", "Geolocator GPS", "Workmanager", "SQLite (sqflite)", "AI-Assisted Workflow"],
      },
    },
    process: {
      kicker: "İşi Yapan Kişi & Çalışma Biçimi",
      quote:
        "İyi bir web işi sadece ilk gün güzel görünmez; zamanında teslim edilir, mobilde aksamaz ve yayına alındığında sorunsuz çalışır.",
      sub: "İşi baştan sona sahiplenmek ve karşı tarafı belirsizlikte bırakmamak en temel çalışma kuralım.",
      portraitCaption: "Burdur'dan uluslararası ajans ve markalarla çalışıyorum.",
      points: [
        {
          num: "01",
          title: "Koda geçmeden kapsam netleşir",
          body: "ABD'deki B2B projelerden edindiğim SOW alışkanlığıyla, işin başında neyin ne zaman teslim edileceğini açıkça yazarım. Sonradan sürpriz çıkmaz.",
        },
        {
          num: "02",
          title: "Hız için yeni araçlar, kalite için el işçiliği",
          body: "Antigravity IDE ve Cursor ile tekrarlayan kurulumları hızlandırırım; ama tipografiyi, boşlukları, mobil görünümü ve temiz kodu her zaman kendim elden geçiririm.",
        },
        {
          num: "03",
          title: "Sunucuda çalışana kadar sorumluluk",
          body: "Tasarımı kodlayıp dosyayı atarak işi bırakmam. Alan adı yönlendirmesi, Nginx ayarları ve iletişim/CRM entegrasyonları canlıda test edilip teslim edilir.",
        },
      ],
    },
    background: {
      experienceHeading: "Deneyim & Eğitim",
      experienceSub:
        "ABD merkezli ajans liderliği, kurumsal B2B teslimatlar, ürün projeleri ve akademik altyapım.",
      entries: [
        {
          role: "Web Developer & AI Operations Lead",
          company: "Ravion Digital Media LLC",
          meta: "ABD Merkezli",
          period: "Mar 2026 – Eki 2026",
          summary:
            "Ajansın kendi mağaza altyapısının yanı sıra Kinetic Fuel Group ve Sunbeam Innovations gibi B2B müşteriler için web platformları, 600+ SEO sayfası ve VPS yayın süreçlerini yönettim.",
          highlights: [
            "600+ dinamik ve statik sayfadan oluşan Hub & Spoke programatik SEO kurgusu",
            "Sektörel mağaza şablonları ve 3D Spline bileşenleriyle 100+ mobil uyumlu sayfa",
            "Antigravity IDE ile hızlandırılmış günlük frontend üretim ve içerik akışı",
            "VPS, Nginx sunucu blokları, domain yönlendirme ve B2B iş kapsamı (SOW) yazımı",
          ],
        },
        {
          role: "Freelance Web Developer & AI Workflow Specialist",
          company: "Bağımsız & Ürün Projeleri",
          meta: "Web & Mobil",
          period: "2025 – Günümüz",
          summary:
            "Klinikler, butik turizm işletmeleri (Teras Paradise Kekova) ve kendi dijital ürünlerim (Foodactor, Maritime Safety Tracker) için uçtan uca tasarım ve geliştirme.",
          highlights: [
            "Next.js, TypeScript ve Supabase ile tam kapsamlı web uygulaması geliştirme (Foodactor.com)",
            "Sağlık, diyetisyen ve turizm işletmeleri için temiz HTML/Tailwind ve WhatsApp API / CRM kurulumu",
            "Flutter, SQLite ve arka plan konum servisleriyle açık kaynak denizcilik GPS takip uygulaması",
          ],
        },
      ],
      educationLabel: "Akademik Eğitim",
      education: {
        degree: "Web Tasarımı ve Kodlama (Ön Lisans)",
        school: "Burdur Mehmet Akif Ersoy Üniversitesi",
        department: "Bucak Emin Gülmez Teknik Bilimler Meslek Yüksekokulu",
        status: "Devam Ediyor",
        details:
          "Odak dersler: Kullanıcı Deneyimi (UX) Tasarımı, Web Mimarisi, Uygulamalı Programlama.",
      },
      craftHeading: "Elimin Altındaki Araçlar",
      craftSub: "Projelerde aktif olarak kullandığım dört ana çalışma alanı.",
      tracks: [
        {
          title: "Arayüz & Uygulama",
          description: "Göz yormayan tipografi, mobil öncelikli ızgara ve modern web uygulamaları.",
          tools: "Next.js · TypeScript · Tailwind CSS · HTML5/CSS3 · Supabase · Figma · 3D Spline",
        },
        {
          title: "SEO & Web Mimarisi",
          description: "Yüzlerce sayfada bozulmayan şablon yapısı ve temiz URL kurgusu.",
          tools: "Programmatic SEO (600+) · Hub & Spoke Mimarisi · Satış Hunisi Kurgusu",
        },
        {
          title: "AI Destekli Operasyon",
          description: "Hızlı prototipleme, net teknik dokümantasyon ve düzenli iş akışları.",
          tools: "Antigravity IDE · Cursor · Teknik Prompt Kurgusu · B2B SOW Planlama",
        },
        {
          title: "Sunucu & Entegrasyon",
          description: "Sitenin hızlı açılmasını ve gelen müşterinin kaybolmamasını sağlayan katman.",
          tools: "VPS Kurulumu · Nginx Server Blocks · Vercel · Git/GitHub · WhatsApp API & CRM",
        },
      ],
    },
    contact: {
      kicker: "İletişim",
      heading: "Yeni bir proje veya iş birliği için konuşalım.",
      sub: "Aşağıdan konuyu seçtiğinde e-posta başlığın hazır gelir; dilersen doğrudan adresi kopyalayabilir veya güncel CV'mi PDF olarak indirebilirsin.",
      intentTitle: "Konu seç (e-posta başlığını hazırlar)",
      intents: [
        {
          id: "project",
          label: "Web Sitesi / Kurumsal Platform",
          subject: "Yeni Web Projesi Hakkında — Kenan Umut Pulat",
          bodyPrompt: "Merhaba Umut, yeni bir web projesi için kapsam ve takvim konuşmak isteriz.",
        },
        {
          id: "seo",
          label: "Programatik SEO & Altyapı",
          subject: "Programatik SEO / Sunucu Kurulumu Desteği",
          bodyPrompt: "Merhaba Umut, ölçeklenebilir sayfa mimarisi ve sunucu kurulumu konusunda görüşmek isteriz.",
        },
        {
          id: "role",
          label: "Ekip / Ajans İş Birliği",
          subject: "Ekip Rolü / İş Birliği — Kenan Umut Pulat",
          bodyPrompt: "Merhaba Umut, ekibimizdeki bir rol veya düzenli üretim iş birliği için görüşmek isteriz.",
        },
      ],
      sendEmail: "Seçili konuyla e-posta aç",
      copyEmail: "Adresi kopyala",
      copiedEmail: "Kopyalandı",
      downloadCv: "CV İndir (PDF)",
      timezoneNote: "Burdur, Türkiye (UTC+3) · Mesajlara aynı gün içinde dönüyorum.",
    },
    footer: {
      rights: "Kenan Umut Pulat — Burdur, Türkiye",
      top: "En üste çık",
    },
  },
  en: {
    meta: {
      title: "Kenan Umut Pulat — Web Developer & AI Operations Specialist",
      description:
        "Clean interfaces, Next.js & Supabase web apps, 600+ page programmatic SEO architectures, and Nginx VPS setups.",
    },
    cvHref: "/Kenan-Umut-Pulat-CV-EN.pdf",
    nav: {
      work: "Projects",
      process: "How I Work",
      experience: "Background",
      contact: "Contact",
      cvButton: "CV (PDF)",
      talkCta: "Let's talk",
    },
    hero: {
      greeting: "Hi, I'm Kenan Umut.",
      headline: "Websites with clean design",
      headlineAccent: "and solid plumbing underneath.",
      bio: "I build across full-stack Next.js apps, 600+ page programmatic SEO architectures, and live Nginx servers. Below are real captures from platforms I shipped for a US digital media agency, enterprise B2B clients, and my own GitHub builds.",
      primaryCta: "Start a conversation",
      secondaryCta: "Explore real projects",
      cvDownloadCta: "Download CV (PDF)",
      portraitRole: "Web Developer & AI Operations",
      portraitLocation: "Burdur, TR",
      stats: [
        { number: "600+", label: "Programmatic SEO pages live" },
        { number: "100+", label: "Industry templates & landing pages" },
        { number: "B2B & Apps", label: "Shipped production platforms" },
      ],
    },
    work: {
      kicker: "Shipped Production Platforms",
      heading: "Real websites and applications built for production.",
      sub: "Scroll through real captures from US agency platforms, enterprise B2B websites, and live GitHub projects. Flip through screens directly on each card or open the full breakdown.",
      inspectCta: "View screens & breakdown",
      screensCountLabel: "screens",
      drawerPrev: "Prev Project",
      drawerNext: "Next Project",
      drawerClose: "Close",
      drawerDiscussCta: "Discuss a similar project",
      drawerGalleryTitle: "Project Captures (Click any screen to enlarge)",
      cases: [
        {
          id: "ravion",
          num: "01",
          client: "Ravion Digital Media LLC · US",
          year: "2026",
          title: "Ravion Digital Media — Agency Platform & 100+ Template Store",
          metricBadge: "Agency & Template Store",
          description:
            "Built and shipped the flagship web platform, Done-For-You package funnel, and searchable Web Template Store for a US-based digital media agency.",
          detail:
            "Produced 100+ conversion-focused web templates spanning healthcare, clinical dietitians, commercial real estate, and solar, complete with cart checkout and direct WhatsApp support.",
          stackLine: "Next.js · Tailwind CSS · 100+ Industry Templates · Store Checkout · WhatsApp Flow",
          screens: [
            {
              src: "/projects/ravion-hero.jpg",
              caption: "Hero landing page — Elevate your business in the digital world",
            },
            {
              src: "/projects/ravion-2.jpg",
              caption: "Searchable Web Template Store with industry filtering (raviondigital.com/store)",
            },
            {
              src: "/projects/ravion-3.jpg",
              caption: "Commercial real estate, AgriSolar, and land investment templates",
            },
            {
              src: "/projects/ravion-4.jpg",
              caption: "Clinical dietitian, sports nutrition, and healthcare practice templates",
            },
            {
              src: "/projects/ravion-5.jpg",
              caption: "Transparent pricing standards and verified B2B client review",
            },
          ],
          problemTitle: "Project Context",
          problemBody:
            "Ravion Digital Media needed both a high-converting agency storefront for fixed-price packages and a scalable digital storefront where businesses across dozens of niches could browse and buy ready-to-launch templates.",
          stepsTitle: "What I Built",
          architectureSteps: [
            "Built the main agency website covering service tiers, transparent package comparison, client proof, and instant WhatsApp onboarding.",
            "Developed the searchable Web Template Store with industry filtering and slide-out cart checkout.",
            "Designed and coded 100+ responsive templates across healthcare/dietitian clinics, real estate, hospitality, and solar.",
            "Backed the ecosystem with 600+ Hub & Spoke programmatic SEO pages and Nginx VPS deployment.",
          ],
          outcomes: [
            { value: "100+", label: "Shipped industry templates" },
            { value: "600+", label: "Programmatic SEO pages" },
            { value: "Store + B2B", label: "Dual conversion engine" },
          ],
        },
        {
          id: "foodactor",
          num: "02",
          client: "Foodactor · Product & GitHub Build",
          year: "2026",
          title: "Foodactor — Global & Mediterranean Recipe Platform",
          metricBadge: "Next.js & Supabase",
          liveUrl: "https://foodactor-com.vercel.app",
          liveLabel: "Open Live Site",
          description:
            "A full-stack culinary discovery web app bringing together chef-tested Turkish, French, Spanish, and Mediterranean recipes with instant ingredient search.",
          detail:
            "Built with Next.js 16, React 19, TypeScript, and Supabase. Features neo-brutalist editorial recipe cards, category filtering, saved collections, and automated bilingual translation pipelines deployed on Vercel.",
          stackLine: "Next.js 16 · TypeScript · Supabase · Tailwind CSS v4 · Framer Motion · Vercel",
          screens: [
            {
              src: "/projects/foodactor-1.jpg",
              caption: "Hero — Ingredient search bar & high-contrast editorial layout",
            },
            {
              src: "/projects/foodactor-2.jpg",
              caption: "Category filter tabs & curated Mediterranean Breeze collection",
            },
            {
              src: "/projects/foodactor-3.jpg",
              caption: "Chef-tested recipe cards with prep time, difficulty, and dietary tags",
            },
          ],
          problemTitle: "Project Context",
          problemBody:
            "Most recipe sites bury ingredients under cluttered ads and endless walls of text. Foodactor was built to deliver clean, fast, filterable culinary guides with strong editorial character.",
          stepsTitle: "What I Built",
          architectureSteps: [
            "Architected the frontend and data layer with Next.js 16 App Router, TypeScript, and Supabase.",
            "Designed high-contrast neo-brutalist cards over a subtle kitchen-grid canvas with instant category and ingredient filtering.",
            "Wrote automated Node.js translation and recipe-audit scripts to keep multilingual content structured.",
            "Shipped to production on Vercel with strict Content-Security-Policy (CSP) headers and PWA manifest support.",
          ],
          outcomes: [
            { value: "Live App", label: "foodactor-com.vercel.app" },
            { value: "Supabase", label: "Structured recipe backend" },
            { value: "Next.js 16", label: "TypeScript & Tailwind v4" },
          ],
        },
        {
          id: "kfg",
          num: "03",
          client: "Kinetic Fuel Group (KFG) · US",
          year: "2026",
          title: "Kinetic Fuel Group — Enterprise Bulk Diesel & Fleet Logistics",
          metricBadge: "Enterprise B2B Web",
          description:
            "Designed and built an authoritative B2B web platform for Kinetic Fuel Group, a wholesale diesel brokerage and tanker logistics operator serving enterprise fleets across the US Midwest.",
          detail:
            "Structured around industrial clarity: sharp dark-mode typography, transparent bulk-acquisition rules, futures/index pricing models, and direct contract pricing funnels.",
          stackLine: "Enterprise B2B UI · Multi-Page Architecture · Lead Funnel · Contract Scoping",
          screens: [
            {
              src: "/projects/kfg-1.jpg",
              caption: "Hero — High-Volume Commodity Middlemanning & contract pricing CTA",
            },
            {
              src: "/projects/kfg-2.jpg",
              caption: "The Rules of Bulk Acquisition — Scale, volatility insulation, and zero-fat contracts",
            },
            {
              src: "/projects/kfg-3.jpg",
              caption: "Strategic Brokerage breakdown — Wholesale terminal & index-based pricing",
            },
            {
              src: "/projects/kfg-4.jpg",
              caption: "Operational fleet audit callout and clean corporate navigation footer",
            },
          ],
          problemTitle: "Project Context",
          problemBody:
            "Enterprise fleet directors procuring bulk diesel don't respond to generic SaaS templates. KFG needed a disciplined, industrial presence that communicated supply-chain reliability, clear margins, and compliance.",
          stepsTitle: "What I Built",
          architectureSteps: [
            "Crafted a high-contrast obsidian and safety-amber visual language tailored for industrial logistics decision-makers.",
            "Architected four core sections: Home, Strategic Brokerage, Fleet Logistics, and Legal & Compliance.",
            "Presented complex procurement mechanics (volatility insulation, terminal pricing, forensic invoice audits) in scannable editorial blocks.",
            "Funneled high-intent fleet operators directly into contract pricing requests.",
          ],
          outcomes: [
            { value: "US Midwest", label: "Enterprise fleet focus" },
            { value: "4 Core Pages", label: "Brokerage, logistics & legal" },
            { value: "Direct RFQ", label: "Contract pricing funnel" },
          ],
        },
        {
          id: "sunbeam",
          num: "04",
          client: "Sunbeam Innovations · Wisconsin & Virginia, US",
          year: "2026",
          title: "Sunbeam Innovations — Precision Solar Offset Architecture",
          metricBadge: "Clean Energy & Architecture",
          description:
            "Created the web presence for Sunbeam Innovations, an engineering-led solar infrastructure firm serving high-net-worth residences and commercial facilities in Wisconsin and Virginia.",
          detail:
            "Balanced full-bleed architectural imagery with a clear 3-phase engineering methodology and segmented conversion paths for residential estates versus commercial properties.",
          stackLine: "Architectural UI · Responsive Frontend · Dual Lead Funnels · Performance Tuning",
          screens: [
            {
              src: "/projects/sunbeam-1.jpg",
              caption: "Hero — Precision Solar Offset Architecture",
            },
            {
              src: "/projects/sunbeam-2.jpg",
              caption: "Methodology — Data-driven grid independence & aerial array mapping",
            },
            {
              src: "/projects/sunbeam-3.jpg",
              caption: "Portfolios — High-Net-Worth Residential & Commercial Infrastructure split",
            },
            {
              src: "/projects/sunbeam-4.jpg",
              caption: "3-Phase Engineering Process: Data Extraction, System Architecture, Deployment",
            },
          ],
          problemTitle: "Project Context",
          problemBody:
            "Positioned well above pushy retail solar installers, Sunbeam needed a refined architectural digital presence proving its systems are engineered from satellite mapping and hard utility data.",
          stepsTitle: "What I Built",
          architectureSteps: [
            "Paired architectural photography with crisp editorial typography and translucent glass-panel methodology cards.",
            "Structured the 3-phase engineering narrative (historical kW/h extraction, satellite offset modeling, autonomous grid-tying).",
            "Built dedicated conversion entry points: 'Initialize Custom Report' for estates and 'Speak With an Energy Architect' for commercial facilities.",
            "Delivered smooth responsive layouts across desktop and mobile viewports.",
          ],
          outcomes: [
            { value: "2 Verticals", label: "HNW residential & commercial" },
            { value: "3 Phases", label: "Data-backed methodology" },
            { value: "WI & VA", label: "Regional US market focus" },
          ],
        },
      ],
      openSource: {
        badge: "Open Source · GitHub",
        title: "Maritime Safety Tracker — Real-Time Vessel GPS & SOS Mobile App",
        repoName: "umutpulat46-ui/maritime-safety-tracker",
        repoUrl: "https://github.com/umutpulat46-ui/maritime-safety-tracker",
        ctaLabel: "View Repository on GitHub",
        description:
          "An open-source Flutter mobile application built for small vessel owners using structured AI-assisted workflows. Combines resilient background location tracking (workmanager), precision GPS coordinates (geolocator), battery health telemetry, offline-first SQLite persistence (sqflite), and an instant manual SOS ping trigger.",
        stack: ["Flutter", "Dart", "Geolocator GPS", "Workmanager", "SQLite (sqflite)", "AI-Assisted Workflow"],
      },
    },
    process: {
      kicker: "Behind the Work & Process",
      quote:
        "Good web work isn't just how a page looks in a screenshot. It's clear scope upfront, clean responsive code, and a launch that runs without drama.",
      sub: "Clear written expectations and predictable handoffs make collaboration effortless.",
      portraitCaption: "Working from Türkiye with US agencies and B2B brands.",
      points: [
        {
          num: "01",
          title: "Written scope before writing code",
          body: "Working on B2B Statement of Work (SOW) documents taught me to clarify pages, timelines, and technical boundaries upfront so nobody gets surprised mid-project.",
        },
        {
          num: "02",
          title: "Modern AI speed, manual craft checks",
          body: "I use Antigravity IDE and Cursor to move fast through scaffolding and content ops, then review spacing, responsive breakpoints, and markup quality by hand.",
        },
        {
          num: "03",
          title: "Accountable all the way to the server",
          body: "I don't toss over a zip file and disappear. Domain records, Nginx blocks, SSL, and CRM/WhatsApp hooks are tested live before handoff.",
        },
      ],
    },
    background: {
      experienceHeading: "Experience & Education",
      experienceSub:
        "High-volume US agency production, enterprise client builds, independent products, and formal web design study.",
      entries: [
        {
          role: "Web Developer & AI Operations Lead",
          company: "Ravion Digital Media LLC",
          meta: "US-Based Agency",
          period: "Mar 2026 – Oct 2026",
          summary:
            "Built the agency's template storefront, delivered B2B client platforms (including Kinetic Fuel Group and Sunbeam Innovations), and scaled 600+ SEO pages.",
          highlights: [
            "600+ dynamic and static pages deployed on hybrid Hub & Spoke SEO architecture",
            "100+ responsive industry templates and landing pages with 3D Spline & interactive UI",
            "Daily AI-assisted frontend production in Antigravity IDE for faster turnaround",
            "VPS management, Nginx server blocks, domain routing, and B2B SOW scoping",
          ],
        },
        {
          role: "Freelance Web Developer & AI Workflow Specialist",
          company: "Independent & Product Builds",
          meta: "Web & Mobile",
          period: "2025 – Present",
          summary:
            "End-to-end web development for clinics, boutique hospitality (Teras Paradise Kekova), and independent products (Foodactor, Maritime Safety Tracker).",
          highlights: [
            "Full-stack recipe platform built with Next.js 16, TypeScript, and Supabase (Foodactor.com)",
            "Clean HTML/Tailwind websites with WhatsApp API & CRM booking flows for clinics and hospitality",
            "Open-source Flutter & SQLite vessel safety tracking mobile app on GitHub",
          ],
        },
      ],
      educationLabel: "Education",
      education: {
        degree: "Associate Degree in Web Design and Coding",
        school: "Burdur Mehmet Akif Ersoy University",
        department: "Bucak Emin Gülmez Technical Sciences Vocational School",
        status: "Currently Enrolled",
        details:
          "Core focus: User Experience (UX) Design, Web Architecture, Applied Programming.",
      },
      craftHeading: "Tools of the Trade",
      craftSub: "Four practical areas I work across every week.",
      tracks: [
        {
          title: "Interface & Web Apps",
          description: "Readable typography, responsive layouts, and full-stack Next.js builds.",
          tools: "Next.js · TypeScript · Tailwind CSS · HTML5/CSS3 · Supabase · Figma · 3D Spline",
        },
        {
          title: "SEO & Architecture",
          description: "Template systems and internal linking that hold up past 600 pages.",
          tools: "Programmatic SEO · Hub & Spoke Architecture · B2B Funnel Structure",
        },
        {
          title: "AI & Operations",
          description: "Fast prototyping, clear B2B documentation, and repeatable workflows.",
          tools: "Antigravity IDE · Cursor · Technical Prompting · B2B SOW Scoping",
        },
        {
          title: "Hosting & Integrations",
          description: "Keeping sites fast on the server and wiring leads where clients read them.",
          tools: "VPS Setup · Nginx Server Blocks · Vercel · Git/GitHub · WhatsApp API & CRM",
        },
      ],
    },
    contact: {
      kicker: "Get in Touch",
      heading: "Have a web project or team role in mind?",
      sub: "Pick a topic below to pre-fill the email subject, copy my address directly, or download my one-page PDF resume.",
      intentTitle: "Select a topic (pre-fills email subject)",
      intents: [
        {
          id: "project",
          label: "Website / B2B Platform",
          subject: "Website / Platform Inquiry — Kenan Umut Pulat",
          bodyPrompt: "Hi Umut, we're planning a web project and would like to discuss scope and timeline.",
        },
        {
          id: "seo",
          label: "Programmatic SEO & Server Setup",
          subject: "Programmatic SEO / VPS Infrastructure Inquiry",
          bodyPrompt: "Hi Umut, we'd like to discuss scalable SEO pages or VPS/Nginx setup.",
        },
        {
          id: "role",
          label: "Team / Agency Collaboration",
          subject: "Team Role / Agency Collaboration — Kenan Umut Pulat",
          bodyPrompt: "Hi Umut, we'd love to chat about collaborating with our team.",
        },
      ],
      sendEmail: "Email with selected topic",
      copyEmail: "Copy address",
      copiedEmail: "Copied",
      downloadCv: "Download CV (PDF)",
      timezoneNote: "Based in Burdur, Türkiye (UTC+3) · Typically reply the same day.",
    },
    footer: {
      rights: "Kenan Umut Pulat — Burdur, Türkiye",
      top: "Back to top",
    },
  },
};
