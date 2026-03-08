// Types for feedback page

import type { Platform, Genre } from "@cadastro/types";

export interface UserFeedbackData {
  fullName: string;
  platform: Platform;
  genres: Genre[];
}

export interface BenefitCard {
  icon: string;
  title: string;
  description: string;
}
