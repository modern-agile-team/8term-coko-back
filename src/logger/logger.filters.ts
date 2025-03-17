import * as winston from 'winston';

/**
 * error 로그만 통과시키는 필터
 */
export const errorOnlyFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

/**
 * error이 아닌 로그만 통과시키는 필터
 */
export const nonErrorFilter = winston.format((info) => {
  return info.level !== 'error' ? info : false;
});
