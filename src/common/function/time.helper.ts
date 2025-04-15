/**
 * 현재 KST 시간 반환
 * @returns
 */
export function nowKST(): Date {
  const now = new Date();
  return new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환
}

/**
 * 전날의 KST 시간 반환
 * @returns
 */
export function yesterdayKST(): Date {
  const now = new Date();
  const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환
  return new Date(nowKST.getTime() - 24 * 60 * 60 * 1000);
}
