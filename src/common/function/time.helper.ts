/**
 * 현재 KST 시간 반환
 * @returns
 */
export function nowKST(): Date {
  const now = new Date();
  return new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환
}
