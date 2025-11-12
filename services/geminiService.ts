
import { GoogleGenAI, Type } from "@google/genai";
import { SeoAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.INTEGER, description: "امتیاز کلی سئو از ۰ تا ۱۰۰." },
    summary: { type: Type.STRING, description: "خلاصه کلی تحلیل سئو به زبان فارسی." },
    contentAnalysis: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "امتیاز تحلیل محتوا از ۰ تا ۱۰۰." },
        title: { type: Type.STRING, description: "عنوان بخش: تحلیل محتوا" },
        summary: { type: Type.STRING, description: "خلاصه تحلیل محتوا به زبان فارسی." },
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              priority: { type: Type.STRING, description: "اولویت: high, medium, or low." },
              description: { type: Type.STRING, description: "توصیه‌ی عملیاتی برای بهبود." },
            },
          },
        },
      },
    },
    technicalSeo: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "امتیاز سئو تکنیکال از ۰ تا ۱۰۰." },
        title: { type: Type.STRING, description: "عنوان بخش: سئو تکنیکال" },
        summary: { type: Type.STRING, description: "خلاصه تحلیل سئو تکنیکال به زبان فارسی." },
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              priority: { type: Type.STRING, description: "اولویت: high, medium, or low." },
              description: { type: Type.STRING, description: "توصیه‌ی عملیاتی برای بهبود." },
            },
          },
        },
      },
    },
    performance: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "امتیاز عملکرد و سرعت سایت از ۰ تا ۱۰۰." },
        title: { type: Type.STRING, description: "عنوان بخش: عملکرد و سرعت" },
        summary: { type: Type.STRING, description: "خلاصه تحلیل سرعت سایت به زبان فارسی." },
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              priority: { type: Type.STRING, description: "اولویت: high, medium, or low." },
              description: { type: Type.STRING, description: "توصیه‌ی عملیاتی برای بهبود." },
            },
          },
        },
      },
    },
    urlStructure: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "امتیاز ساختار URL از ۰ تا ۱۰۰." },
        title: { type: Type.STRING, description: "عنوان بخش: ساختار URL" },
        summary: { type: Type.STRING, description: "خلاصه تحلیل ساختار URL به زبان فارسی." },
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              priority: { type: Type.STRING, description: "اولویت: high, medium, or low." },
              description: { type: Type.STRING, description: "توصیه‌ی عملیاتی برای بهبود." },
            },
          },
        },
      },
    },
  },
  required: ['overallScore', 'summary', 'contentAnalysis', 'technicalSeo', 'performance', 'urlStructure'],
};


export const analyzeSeoForUrl = async (url: string): Promise<SeoAnalysis> => {
  const prompt = `
    شما یک متخصص برجسته سئو با تخصص عمیق در بازار ایران و زبان فارسی هستید.
    وظیفه شما تحلیل جامع وب‌سایت با آدرس "${url}" است.
    چون شما نمی‌توانید به صورت زنده به URL دسترسی پیدا کنید، یک تحلیل واقع‌گرایانه و محتمل بر اساس بهترین شیوه‌های سئو و مشکلات رایج وب‌سایت‌ها ایجاد کنید.
    گزارش شما باید کاملاً به زبان فارسی باشد و شامل توصیه‌های عملی و کاربردی برای بهبود رتبه سایت در موتورهای جستجو باشد.
    
    تحلیل باید شامل موارد زیر باشد:
    1.  **تحلیل محتوا**: کیفیت، استفاده از کلمات کلیدی، خوانایی، و منحصر به فرد بودن.
    2.  **سئو تکنیکال**: تگ‌های عنوان، متادیسکریپشن، تگ‌های H، کنونیکال، robots.txt و نقشه سایت.
    3.  **عملکرد و سرعت**: سرعت بارگذاری، بهینه‌سازی تصاویر، و کش.
    4.  **ساختار URL**: سادگی، خوانایی و استفاده از کلمات کلیدی.
    
    پاسخ خود را فقط و فقط به صورت یک شیء JSON معتبر و مطابق با اسکیمای ارائه شده برگردانید. هیچ متنی خارج از این شیء JSON قرار ندهید.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Ensure titles are in Persian as sometimes the model might forget
    result.contentAnalysis.title = "تحلیل محتوا";
    result.technicalSeo.title = "سئو تکنیکال";
    result.performance.title = "عملکرد و سرعت";
    result.urlStructure.title = "ساختار URL";

    return result as SeoAnalysis;

  } catch (error) {
    console.error("Error analyzing SEO with Gemini API:", error);
    throw new Error("Failed to generate SEO analysis. Please check the URL or try again later.");
  }
};
