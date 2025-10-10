import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroVideo from "../images/ai-demo.mp4";
import { useNavigate } from "react-router-dom";
import chatbot from "../images/chatbot.jpg";
import assistant from "../images/assistant.png";
import integrate from "../images/system-integration.png";
import books from "../images/books.png";
import robot from "../images/robot.png";
import chat from "../images/chat.png";
import ecommerce from "../images/ecommerce.png";
import healthcare from "../images/medical-app.png";
import education from "../images/university.png";
import plane from "../images/plane.png";
import accounts from "../images/accounts.png";
const translations = {
  en: {
    heroTitle: "AI Chatbots & Assistants",
    heroDesc: "24/7 engagement, instant answers, and seamless integration for your business.",
    featuresTitle: "Features & Benefits",
    featuresHeadline: "Unlock AI-Powered Productivity",
    featuresDesc: "Our advanced AI chatbots empower your business with instant support, seamless integration, and actionable insights—while maintaining your brand's unique voice and standards.",
    featuresList: [
      "Generate content and code in seconds",
      "Maintain brand voice and coding standards",
      "24/7 availability and smart escalation"
    ],
    featureGrid: [
      { title: "Natural Language Processing", desc: "Understands user intent, context, and sentiment for human-like conversations." },
      { title: "Multi-Platform Integration", desc: "Deploy across websites, apps, and voice assistants." },
      { title: "24/7 Availability", desc: "Instant responses and support around the clock." },
      { title: "Contextual Memory", desc: "Remembers history and preferences for personalized responses." },
      { title: "Smart Escalation", desc: "Detects complex queries and transfers to human agents." },
      { title: "Analytics & Insights", desc: "Real-time dashboard for performance and ROI tracking." }
    ],
    howWorksTitle: "How It Works",
    howWorksSteps: [
      { icon: assistant, title: "Choose Your Assistant", desc: "Select a chatbot template or build your own." },
      { icon: integrate, title: "Integrate & Configure", desc: "Connect to your platforms and set up workflows." },
      { icon: books, title: "Train & Test", desc: "Upload FAQs, scripts, and test conversations." },
      { icon: robot, title: "Go Live & Monitor", desc: "Launch your assistant and track performance." }
    ],
    overviewTitle: "What Makes Our Chatbot Assistants Unique?",
    overviewDesc: "Our AI-powered assistants combine natural language understanding, contextual memory, and seamless integration to deliver personalized, efficient, and secure experiences for your users.",
    overviewList: [
      "Conversational intelligence for human-like interactions",
      "Real-time support and smart escalation",
      "Customizable personalities to match your brand",
      "Actionable analytics for continuous improvement"
    ],
    overviewBtn: "Learn More",
    useCasesTitle: "AI Chatbot Use Cases",
    useCases: [
      { icon: chat , title: "Customer Support", desc: "Instantly resolve queries and provide 24/7 assistance." },
      { icon: ecommerce, title: "E-Commerce", desc: "Guide users, recommend products, and boost sales." },
      { icon: healthcare, title: "Healthcare", desc: "Schedule appointments and answer health FAQs securely." },
      { icon: education, title: "Education", desc: "Personalized tutoring and homework help for students." },
      { icon: plane, title: "Travel & Booking", desc: "Manage reservations and provide travel info instantly." },
      { icon: accounts, title: "Finance", desc: "Assist with account info, payments, and financial advice." }
    ],
    personalitiesTitle: "Chatbot & Assistant Personalities",
    personalitiesDesc: "Our AI assistants are more than just tools—they're digital personalities designed to fit your brand, engage users, and deliver memorable experiences in every conversation.",
    personalities: [
      { icon: "🤖", title: "Friendly Bot", desc: "Greets and assists users with a smile." },
      { icon: "📞", title: "Support Specialist", desc: "Provides instant answers to common questions." },
      { icon: "🛒", title: "Sales Assistant", desc: "Helps users find products and complete purchases." },
      { icon: "📅", title: "Booking Agent", desc: "Manages appointments and reservations seamlessly." }
    ],
    ctaTitle: "Ready to Transform Your Business with AI Chatbots?",
    ctaDesc: "Empower your team, delight your customers, and unlock new possibilities with our intelligent assistants. Get started today!",
    ctaBtn: "Get Started"
  },
  ar: {
    heroTitle: "الدردشة الذكية ومساعدو الذكاء الاصطناعي",
    heroDesc: "تفاعل على مدار الساعة، إجابات فورية، ودمج سلس لأعمالك.",
    featuresTitle: "الميزات والفوائد",
    featuresHeadline: "اكتشف إنتاجية مدعومة بالذكاء الاصطناعي",
    featuresDesc: "تمنحك روبوتات الدردشة الذكية دعمًا فوريًا ودمجًا سلسًا ورؤى قابلة للتنفيذ مع الحفاظ على صوت ومعايير علامتك التجارية.",
    featuresList: [
      "إنشاء محتوى وكود في ثوانٍ",
      "الحفاظ على صوت العلامة التجارية ومعايير الكود",
      "توفر دائم وتصعيد ذكي"
    ],
    featureGrid: [
      { title: "معالجة اللغة الطبيعية", desc: "يفهم نية المستخدم والسياق والمشاعر لمحادثات شبيهة بالبشر." },
      { title: "تكامل متعدد المنصات", desc: "نشر عبر المواقع والتطبيقات والمساعدات الصوتية." },
      { title: "توفر دائم", desc: "استجابات ودعم فوري على مدار الساعة." },
      { title: "ذاكرة سياقية", desc: "يتذكر التاريخ والتفضيلات لاستجابات مخصصة." },
      { title: "تصعيد ذكي", desc: "يكتشف الاستفسارات المعقدة وينقلها إلى وكلاء بشريين." },
      { title: "تحليلات ورؤى", desc: "لوحة تحكم لحظية لأداء وتتبع العائد على الاستثمار." }
    ],
    howWorksTitle: "كيف يعمل",
    howWorksSteps: [
      { icon: "🧑‍💻", title: "اختر مساعدك", desc: "اختر قالب روبوت دردشة أو أنشئ الخاص بك." },
      { icon: "🔗", title: "دمج وتهيئة", desc: "اتصل بمنصاتك وقم بإعداد سير العمل." },
      { icon: "📚", title: "تدريب واختبار", desc: "حمّل الأسئلة الشائعة والنصوص واختبر المحادثات." },
      { icon: "🚀", title: "انطلق وراقب", desc: "أطلق مساعدك وتابع الأداء." }
    ],
    overviewTitle: "ما الذي يجعل مساعدي الدردشة لدينا فريدين؟",
    overviewDesc: "يجمع مساعدونا بين فهم اللغة الطبيعية والذاكرة السياقية والتكامل السلس لتقديم تجارب شخصية وفعالة وآمنة.",
    overviewList: [
      "ذكاء محادثي لتفاعلات شبيهة بالبشر",
      "دعم لحظي وتصعيد ذكي",
      "شخصيات قابلة للتخصيص لتناسب علامتك التجارية",
      "تحليلات قابلة للتنفيذ للتحسين المستمر"
    ],
    overviewBtn: "اعرف المزيد",
    useCasesTitle: "حالات استخدام روبوتات الدردشة الذكية",
    useCases: [
      { icon: chat, title: "دعم العملاء", desc: "حل الاستفسارات فورًا وتقديم المساعدة على مدار الساعة." },
      { icon: ecommerce, title: "التجارة الإلكترونية", desc: "إرشاد المستخدمين، توصية المنتجات، وزيادة المبيعات." },
      { icon: healthcare, title: "الرعاية الصحية", desc: "جدولة المواعيد والإجابة على الأسئلة الصحية بأمان." },
      { icon: education, title: "التعليم", desc: "دروس شخصية ومساعدة في الواجبات للطلاب." },
      { icon: plane, title: "السفر والحجوزات", desc: "إدارة الحجوزات وتقديم معلومات السفر فورًا." },
      { icon: accounts, title: "التمويل", desc: "المساعدة في المعلومات المالية والمدفوعات والنصائح." }
    ],
    personalitiesTitle: "شخصيات روبوت الدردشة والمساعد",
    personalitiesDesc: "مساعدونا الرقميون أكثر من مجرد أدوات—إنهم شخصيات رقمية مصممة لتناسب علامتك التجارية وتفاعل المستخدمين وتقديم تجارب لا تُنسى.",
    personalities: [
      { icon: "🤖", title: "روبوت ودود", desc: "يرحب ويساعد المستخدمين بابتسامة." },
      { icon: "📞", title: "أخصائي الدعم", desc: "يقدم إجابات فورية للأسئلة الشائعة." },
      { icon: "🛒", title: "مساعد المبيعات", desc: "يساعد المستخدمين في العثور على المنتجات وإتمام الشراء." },
      { icon: "📅", title: "وكيل الحجز", desc: "يدير المواعيد والحجوزات بسلاسة." }
    ],
    ctaTitle: "جاهز لتحويل عملك مع روبوتات الدردشة الذكية؟",
    ctaDesc: "مكّن فريقك وأسعد عملاءك وافتح إمكانيات جديدة مع مساعدينا الذكيين. ابدأ اليوم!",
    ctaBtn: "ابدأ الآن"
  },
  he: {
    heroTitle: "צ'אטבוטים ועוזרי AI",
    heroDesc: "מעורבות מסביב לשעון, תשובות מיידיות ואינטגרציה חלקה לעסק שלך.",
    featuresTitle: "תכונות ויתרונות",
    featuresHeadline: "שחרר פרודוקטיביות מבוססת AI",
    featuresDesc: "הצ'אטבוטים המתקדמים שלנו מעניקים לעסק שלך תמיכה מיידית, אינטגרציה חלקה ותובנות—תוך שמירה על קול ומיתוג ייחודי.",
    featuresList: [
      "יצירת תוכן וקוד בשניות",
      "שמירה על קול המותג וסטנדרטים של קוד",
      "זמינות מסביב לשעון והסלמה חכמה"
    ],
    featureGrid: [
      { title: "עיבוד שפה טבעית", desc: "מבין כוונת משתמש, הקשר ורגש לשיחות אנושיות." },
      { title: "אינטגרציה רב-פלטפורמית", desc: "הפעלה באתר, אפליקציות ועוזרי קול." },
      { title: "זמינות מסביב לשעון", desc: "תשובות ותמיכה מיידית בכל שעה." },
      { title: "זיכרון הקשרי", desc: "זוכר היסטוריה והעדפות לתשובות מותאמות." },
      { title: "הסלמה חכמה", desc: "מזהה פניות מורכבות ומעביר לנציג אנושי." },
      { title: "אנליטיקה ותובנות", desc: "לוח מחוונים בזמן אמת לביצועים ומדידת ROI." }
    ],
    howWorksTitle: "איך זה עובד",
    howWorksSteps: [
      { icon: assistant, title: "בחר עוזר", desc: "בחר תבנית צ'אטבוט או בנה משלך." },
      { icon: integrate, title: "אינטגרציה והגדרות", desc: "חבר לפלטפורמות והגדר תהליכים." },
      { icon: books, title: "הדרכה ובדיקה", desc: "העלה שאלות ותסריטים ובדוק שיחות." },
      { icon: robot, title: "הפעל ומדוד", desc: "הפעל את העוזר ומדוד ביצועים." }
    ],
    overviewTitle: "מה הופך את העוזרים שלנו לייחודיים؟",
    overviewDesc: "העוזרים שלנו משלבים הבנת שפה טבעית, זיכרון הקשרי ואינטגרציה חלקה לחוויות מותאמות, יעילות ובטוחות.",
    overviewList: [
      "אינטליגנציה שיחתית לאינטראקציות אנושיות",
      "תמיכה בזמן אמת והסלמה חכמה",
      "אישיות מותאמת למותג שלך",
      "אנליטיקה לשיפור מתמיד"
    ],
    overviewBtn: "למידע נוסף",
    useCasesTitle: "שימושים לצ'אטבוטים חכמים",
    useCases: [
      { icon: chat, title: "תמיכת לקוחות", desc: "פתרון פניות מיידי ותמיכה מסביב לשעון." },
      { icon: ecommerce, title: "מסחר אלקטרוני", desc: "הכוונת משתמשים, המלצות ומכירות." },
      { icon: healthcare, title: "בריאות", desc: "קביעת תורים ומענה לשאלות רפואיות בבטחה." },
      { icon: education, title: "חינוך", desc: "הדרכה אישית ועזרה בשיעורי בית." },
      { icon: plane, title: "נסיעות והזמנות", desc: "ניהול הזמנות ומתן מידע נסיעות מיידי." },
      { icon: accounts, title: "פיננסים", desc: "סיוע במידע, תשלומים וייעוץ פיננסי." }
    ],
    personalitiesTitle: "אישיות הצ'אטבוט והעוזר",
    personalitiesDesc: "העוזרים שלנו הם יותר מכלי—they're דמויות דיגיטליות שמותאמות למותג שלך, מעוררות משתמשים ומספקות חוויות בלתי נשכחות.",
    personalities: [
      { icon: "🤖", title: "בוט ידידותי", desc: "מברך ומסייע למשתמשים בחיוך." },
      { icon: "📞", title: "מומחה תמיכה", desc: "מספק תשובות מיידיות לשאלות נפוצות." },
      { icon: "🛒", title: "עוזר מכירות", desc: "מסייע במציאת מוצרים והשלמת רכישות." },
      { icon: "📅", title: "סוכן הזמנות", desc: "מנהל פגישות והזמנות בקלות." }
    ],
    ctaTitle: "מוכן לשדרג את העסק שלך עם צ'אטבוטים חכמים؟",
    ctaDesc: "העצם את הצוות שלך, שפר את חווית הלקוח ופתח אפשרויות חדשות עם העוזרים החכמים שלנו. התחל היום!",
    ctaBtn: "התחל עכשיו"
  }
};

function Chatbots() {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for language changes from header
    const syncLanguage = () => {
      const lang = localStorage.getItem("language") || "en";
      setLanguage(lang);
      document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";
    };
    window.addEventListener("storage", syncLanguage);

    // Also listen for custom event from header (for immediate update)
    const customLangChange = (e) => {
      const lang = e.detail || localStorage.getItem("language") || "en";
      setLanguage(lang);
      document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";
    };
    window.addEventListener("languageChange", customLangChange);

    // Initial sync
    syncLanguage();

    return () => {
      window.removeEventListener("storage", syncLanguage);
      window.removeEventListener("languageChange", customLangChange);
    };
  }, []);

  const t = translations[language] || translations["en"];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 h-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg text-center"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto text-center"
          >
            {t.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-20 px-4 bg-purple-50 dark:bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-5xl font-extrabold text-black dark:text-white mb-6 leading-tight">
              {t.featuresTitle}
            </h2>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              {t.featuresHeadline}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t.featuresDesc}
            </p>
            <ul className="list-disc pl-6 text-base text-purple-700 dark:text-purple-300 space-y-2">
              {t.featuresList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </motion.div>
          {/* Right: Features Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {t.featureGrid.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col justify-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-700 hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(128,0,128,0.2)" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2 text-center">{f.title}</h4>
                  <p className="text-gray-700 dark:text-gray-200 text-base text-center">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 px-4 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">{t.howWorksTitle}</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {t.howWorksSteps.map((step, idx) => (
              <div key={idx} className="flip-card w-64 h-64">
                <div className="flip-card-inner group relative w-full h-full">
                  <div className="flip-card-front absolute w-full h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-700 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:rotate-y-180">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-700 dark:bg-purple-400 text-white text-3xl font-bold mb-4">
                      <img src={step.icon} alt={step.title} className="w-10 h-10 object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">Step {idx + 1}</p>
                  </div>
                  <div className="flip-card-back absolute w-full h-full bg-purple-700 dark:bg-purple-400 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center text-white font-semibold px-4 transition-transform duration-500 group-hover:rotate-y-0 group-hover:scale-105" style={{transform: 'rotateY(180deg)'}}>
                    <div className="text-lg mb-2">{step.title}</div>
                    <div className="text-sm">{step.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .flip-card { perspective: 1000px; }
          .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d; }
          .flip-card:hover .flip-card-inner, .flip-card:focus .flip-card-inner, .flip-card .group:hover .flip-card-inner { transform: rotateY(180deg); }
          .flip-card-front, .flip-card-back { backface-visibility: hidden; position: absolute; width: 100%; height: 100%; border-radius: 1rem; }
          .flip-card-back { transform: rotateY(180deg); }
        `}</style>
      </section>

      {/* Chatbot Assistant Overview */}
      <section className="py-10 px-4 bg-purple-50 dark:bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
            <img src={chatbot} alt="AI Chatbot Assistant" className="rounded-3xl shadow-xl w-full max-w-md object-cover" />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-4xl font-extrabold text-black dark:text-white mb-6">{t.overviewTitle}</h2>
            <p className="text-lg text-black dark:text-white mb-6">{t.overviewDesc}</p>
            <ul className="list-disc pl-6 text-base text-black dark:text-white space-y-2 mb-6">
              {t.overviewList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            
          </div>
        </div>
      </section>

      {/* AI Chatbot Use Cases */}
      <section className="py-5 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-10 text-black dark:text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {t.useCasesTitle}
          </motion.h2>
          <motion.div
            className="flex gap-8 pb-4 flex-wrap justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.useCases.map((use, idx) => (
              <motion.div
                key={idx}
                className="min-w-[260px] flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-700 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(128,0,128,0.2)" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-700 dark:bg-purple-400 text-white dark:text-black text-3xl font-bold mb-4">
                  <img src={use.icon} alt={use.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2 text-center">{use.title}</h3>
                <p className="text-black dark:text-white text-sm text-center">{use.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; background: transparent; }
        `}</style>
      </section>

      {/* Chatbot & Assistant Personalities */}
      <section className="py-10 px-4 bg-purple-50 dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 w-full mb-8 md:mb-0 flex flex-col justify-center">
            <h2 className="text-5xl font-extrabold text-black dark:text-white mb-6 leading-tight">
              {t.personalitiesTitle}
            </h2>
            <p className="text-lg text-black dark:text-white mb-6">
              {t.personalitiesDesc}
            </p>
          </div>
          <div className="md:w-1/2 w-full flex flex-col items-start relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-purple-300 dark:bg-purple-700 rounded-full"></div>
            {t.personalities.map((f, i) => (
              <div key={i} className="flex items-center mb-10 last:mb-0 relative z-10">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 dark:bg-purple-400 text-white text-xl font-bold mr-6 shadow-lg">{f.icon}</div>
                <div>
                  <h4 className="text-lg font-bold text-black dark:text-white mb-1">{f.title}</h4>
                  <p className="text-black dark:text-white text-sm max-w-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 bg-gradient-to-br from-purple-700 via-purple-500 to-purple-300 dark:from-purple-900 dark:via-purple-700 dark:to-purple-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white dark:text-black mb-6">{t.ctaTitle}</h2>
          <p className="text-lg text-purple-100 dark:text-purple-900 mb-8">
            {t.ctaDesc}
          </p>
          <button className="px-8 py-4 bg-white text-purple-700 dark:bg-black dark:text-purple-300 rounded-xl font-bold shadow-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition text-xl" onClick={()=>navigate("/contact")}>
            {t.ctaBtn}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Chatbots;
