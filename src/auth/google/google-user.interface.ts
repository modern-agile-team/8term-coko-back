export interface GoogleUserInfo {
  name: string;
  socialAccessToken: string;
  socialRefreshToken: string | null;
  provider: string;
  providerId: string;
}
