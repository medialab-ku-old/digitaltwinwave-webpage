export function normalizePath(path: string) {
  // 1. 맨 앞에 있는 슬래시들(하나든 여러개든)을 모두 제거하고
  // 2. 다시 슬래시 하나를 붙입니다.
  return '/' + path.replace(/^\/+/, '');
}