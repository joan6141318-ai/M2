export interface Message {
  role: 'user' | 'model';
  text: string;
  isPaymentTable?: boolean;
  isContactCard?: boolean;
  benefitsList?: { title: string; description: string }[];
}

export interface Talent {
  name: string;
  platform: 'Twitch' | 'YouTube' | 'Bigo Live';
  imageUrl: string;
  videoId: string;
  bio: string;
  socials: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
}