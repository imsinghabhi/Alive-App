import { axiosInstance } from '../../../shared/api/axiosInstance';
import { CountryTab, HomeFeedResponse, LiveStreamCardData } from '../types/home.types';

const MOCK_COUNTRIES: CountryTab[] = [
  { id: 'global', name: 'Global', flag: '🌐' },
  { id: 'in', name: 'India', flag: '🇮🇳' },
  { id: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { id: 'br', name: 'Brazil', flag: '🇧🇷' },
  { id: 'vn', name: 'Vietnam', flag: '🇻🇳' },
  { id: 'us', name: 'USA', flag: '🇺🇸' },
  { id: 'id', name: 'Indonesia', flag: '🇮🇩' },
];

const MOCK_STREAMS: LiveStreamCardData[] = [
  {
    id: 'stream-1',
    hostName: 'Sofia Chen',
    hostAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇵🇭',
    countryName: 'Philippines',
    countryId: 'ph',
    viewers: '8.2K',
    streamCover:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
  {
    id: 'stream-2',
    hostName: 'Sofia Chen',
    hostAvatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇵🇭',
    countryName: 'Philippines',
    countryId: 'ph',
    viewers: '8.2K',
    streamCover:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
  {
    id: 'stream-3',
    hostName: 'Sofia Chen',
    hostAvatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇵🇭',
    countryName: 'Philippines',
    countryId: 'ph',
    viewers: '8.2K',
    streamCover:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
  {
    id: 'stream-4',
    hostName: 'Sofia Chen',
    hostAvatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇵🇭',
    countryName: 'Philippines',
    countryId: 'ph',
    viewers: '8.2K',
    streamCover:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
  {
    id: 'stream-5',
    hostName: 'Aria Sharma',
    hostAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇮🇳',
    countryName: 'India',
    countryId: 'in',
    viewers: '12.4K',
    streamCover:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    isFollowing: true,
    category: 'Hot',
  },
  {
    id: 'stream-6',
    hostName: 'Priya Patel',
    hostAvatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇮🇳',
    countryName: 'India',
    countryId: 'in',
    viewers: '9.8K',
    streamCover:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
  {
    id: 'stream-7',
    hostName: 'Camila Alves',
    hostAvatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇧🇷',
    countryName: 'Brazil',
    countryId: 'br',
    viewers: '6.1K',
    streamCover:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Hot',
  },
  {
    id: 'stream-8',
    hostName: 'Linh Tran',
    hostAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇻🇳',
    countryName: 'Vietnam',
    countryId: 'vn',
    viewers: '5.5K',
    streamCover:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
  {
    id: 'stream-9',
    hostName: 'Emma Wilson',
    hostAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇺🇸',
    countryName: 'USA',
    countryId: 'us',
    viewers: '18.9K',
    streamCover:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    isFollowing: true,
    category: 'Hot',
  },
  {
    id: 'stream-10',
    hostName: 'Siti Rahma',
    hostAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    countryFlag: '🇮🇩',
    countryName: 'Indonesia',
    countryId: 'id',
    viewers: '7.3K',
    streamCover:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    isFollowing: false,
    category: 'Stream',
  },
];

export const homeService = {
  async fetchHomeFeed(): Promise<HomeFeedResponse> {
    try {
      const response = await axiosInstance.get('/feed/home');
      return response.data;
    } catch {
      return {
        onlineCount: 48290,
        unreadNotifications: 3,
        countries: MOCK_COUNTRIES,
        streams: MOCK_STREAMS,
      };
    }
  },

  async toggleFollowHost(hostId: string): Promise<{ success: boolean; isFollowing: boolean }> {
    try {
      const response = await axiosInstance.post(`/hosts/${hostId}/follow`);
      return response.data;
    } catch {
      return { success: true, isFollowing: true };
    }
  },
};
