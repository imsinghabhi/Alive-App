export type SubTabType = 'Stream' | 'Hot' | 'Follow';

export interface CountryTab {
  id: string;
  name: string;
  flag: string;
}

export interface LiveStreamCardData {
  id: string;
  hostName: string;
  hostAvatar: string;
  countryFlag: string;
  countryName: string;
  countryId: string;
  viewers: string;
  streamCover: string;
  isFollowing: boolean;
  category: SubTabType;
}

export interface HomeFeedResponse {
  onlineCount: number;
  unreadNotifications: number;
  countries: CountryTab[];
  streams: LiveStreamCardData[];
}
