
export type ClubEvent = {
  id: number
  title: string
  category: string
  date: string
  location: string
  price: string
  description: string
  image: string
  status: 'upcoming' | 'past' | 'planning'
}

export const events: ClubEvent[] = [
  {
    id: 1,
    title: 'Heels Dance Workshop',
    category: 'Activities',
    date: '10 October 2026',
    location: 'The Hive Dance Studio, Cluj',
    price: '50–80 RON',
    description: 'A beginner-friendly dance experience.',
    image: '/images/dance.jpeg',
    status: 'past',
  },
  {
    id: 2,
    title: 'Jiu-Jitsu Self-Defense',
    category: 'Activities',
    date: '14 November 2026',
    location: 'Napoca Jiu-Jitsu',
    price: '100 RON / 2 sessions',
    description: 'Build confidence and learn practical self-defense.',
    image: '/images/girls-group.jpeg',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Pilates Morning',
    category: 'Wellness',
    date: '12 December 2026 · 10:30',
    location: 'AlmaPilatesCluj',
    price: 'Contact the studio',
    description: 'A morning of movement and connection.',
    image: '/images/community.jpeg',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Girls Coffee Meetup',
    category: 'Social',
    date: 'To be announced',
    location: 'Cluj-Napoca',
    price: 'To be announced',
    description: 'Coffee, conversations and new friendships.',
    image: '/images/vineyard.jpeg',
    status: 'planning',
  },
  
{
  id: 5,
  title: 'Ballet for Beginners',
  category: 'Activities',
  date: 'To be announced',
  location: 'Cluj-Napoca',
  price: 'To be announced',
  description: 'A graceful, beginner-friendly ballet experience. No previous dance experience needed.',
  image: '/images/ballet.png',
  status: 'planning',
},
{
  id: 6,
  title: 'Girls Knitting Workshop',
  category: 'Activities',
  date: 'To be announced',
  location: 'Cluj-Napoca',
  price: 'To be announced',
  description: 'A cozy creative afternoon learning to knit, meeting new girls and making something beautiful.',
  image: '/images/knitting.png',
  status: 'planning',
},
]
