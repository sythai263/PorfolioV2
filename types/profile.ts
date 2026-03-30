import { SocialLink } from "./social-link";

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  social: SocialLink[];
}
