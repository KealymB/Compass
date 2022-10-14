export type Place = {
  _id: string;
  name: string;
  configuratorType: string;
};

export type Venue = {
  _id: string;
  ordering: number;
};

export type TimeSlot = {
  _id: string;
  start: string;
  name: string;
  end: string;
  locations: Venue[];
  parent: string;
};

export type ProfileImage = {
  small: string;
  medium: string;
  large: string;
};

export type Links = {
  self: string;
  html: string;
  photos: string;
  likes: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: ProfileImage;
  links: Links;
};

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};
export type Links2 = {
  self: string;
  html: string;
  download: string;
};

export type Result = {
  id: string;
  created_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  current_user_collections: any[];
  urls: Urls;
  links: Links2;
};

export type SplashFetch = {
  total: number;
  total_pages: number;
  results: Result[];
};
