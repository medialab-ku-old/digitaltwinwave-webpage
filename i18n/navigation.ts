import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './locales';

export const routing = defineRouting({
    // 지원하는 언어 목록
    locales,

    // 기본 언어
    defaultLocale,
    
    // URL에서 ko를 숨길지 여부 (아까 설정하신 대로 'as-needed')
    localePrefix: 'as-needed',
    localeDetection: false
});

// 설정(routing)을 기반으로 네비게이션 도구들을 생성해서 내보냅니다.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);