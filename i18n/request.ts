import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './locales';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // 2. locale이 없거나 지원하지 않는 언어라면 404 처리
  // (또는 기본값인 'ko'를 넣어주셔도 됩니다)
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale, 
    messages: (await import(`../translations/${locale}.json`)).default
  };
});