import { Home, Phone, Bell, User, Search, PlusCircle, MapPin, Bus, Train, Landmark, HomeIcon, ShoppingBag, Flame, Truck, Shield, Globe, Zap, HeartPulse, Droplets, Hotel, Car, Wrench, Siren, Briefcase, Lightbulb, Map, Utensils } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export const categories: Category[] = [
  { id: 'doctors', name: 'ডাক্তার', icon: HeartPulse, color: 'bg-red-50 text-red-600' },
  { id: 'hospitals', name: 'হাসপাতাল', icon: HeartPulse, color: 'bg-blue-50 text-blue-600' },
  { id: 'bus', name: 'বাস সময়সূচি', icon: Bus, color: 'bg-green-50 text-green-600' },
  { id: 'train', name: 'ট্রেন সময়সূচি', icon: Train, color: 'bg-orange-50 text-orange-600' },
  { id: 'landmarks', name: 'দর্শনীয় স্থান', icon: Landmark, color: 'bg-indigo-50 text-indigo-600' },
  { id: 'rent', name: 'বাসা ভাড়া', icon: HomeIcon, color: 'bg-purple-50 text-purple-600' },
  { id: 'shopping', name: 'শপিং', icon: ShoppingBag, color: 'bg-pink-50 text-pink-600' },
  { id: 'fire', name: 'ফায়ার সার্ভিস', icon: Flame, color: 'bg-orange-50 text-orange-600' },
  { id: 'courier', name: 'কুরিয়ার', icon: Truck, color: 'bg-cyan-50 text-cyan-600' },
  { id: 'police', name: 'থানা-পুলিশ', icon: Shield, color: 'bg-slate-50 text-slate-600' },
  { id: 'website', name: 'ওয়েবসাইট', icon: Globe, color: 'bg-sky-50 text-sky-600' },
  { id: 'electricity', name: 'বিদ্যুৎ অফিস', icon: Zap, color: 'bg-yellow-50 text-yellow-600' },
  { id: 'diagnostic', name: 'ডায়াগনস্টিক', icon: HeartPulse, color: 'bg-rose-50 text-rose-600' },
  { id: 'blood', name: 'রক্ত', icon: Droplets, color: 'bg-red-50 text-red-600' },
  { id: 'hotel', name: 'হোটেল', icon: Hotel, color: 'bg-amber-50 text-amber-600' },
  { id: 'car', name: 'গাড়ি ভাড়া', icon: Car, color: 'bg-teal-50 text-teal-600' },
  { id: 'mistri', name: 'মিস্ত্রি', icon: Wrench, color: 'bg-gray-50 text-gray-600' },
  { id: 'emergency', name: 'জরুরি সেবা', icon: Siren, color: 'bg-red-50 text-red-600' },
  { id: 'jobs', name: 'চাকরি', icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
  { id: 'initiative', name: 'উদ্যোগ', icon: Lightbulb, color: 'bg-yellow-50 text-yellow-600' },
  { id: 'restaurants', name: 'রেস্টুরেন্ট', icon: Utensils, color: 'bg-orange-50 text-orange-600' },
];

export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  phone: string;
  address: string;
  image: string;
  time?: string;
  mapsLink?: string;
}

export const mockBusinesses: Business[] = [
  {
    id: 'p1',
    name: 'Phulpur Police Station (Model Thana)',
    category: 'police',
    rating: 4.9,
    description: 'The central police headquarters for the entire Phulpur Upazila, providing 24/7 law enforcement, criminal investigation, and public safety services.',
    phone: '01320-103451',
    address: 'Thana Road, Phulpur Municipality, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&q=80&w=400',
    mapsLink: 'https://www.google.com/maps/search/Phulpur+Police+Station+Mymensingh',
  },
  {
    id: 'h1',
    name: 'Phulpur Upazila Health Complex',
    category: 'hospitals',
    rating: 4.8,
    description: 'The central 50-bed government hospital providing emergency, indoor, and outdoor medical services for the entire Upazila.',
    phone: '01701248623',
    address: 'Tangail - Mymensingh Hwy, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h2',
    name: 'Asha General Hospital and diagnostic center',
    category: 'hospitals',
    rating: 4.6,
    description: 'Private general hospital and diagnostic center providing outpatient, diagnostic, and specialist consultation services in central Phulpur.',
    phone: '+8801979939326',
    address: 'Hospital Gate, Sherpur–Nakla–Phulpur–Mymensingh Highway, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h3',
    name: 'City General Hospital (Pvt)',
    category: 'hospitals',
    rating: 4.2,
    description: 'A private healthcare facility providing general medical treatment and diagnostic services.',
    phone: 'Not Available',
    address: 'Near Upazila Health Complex, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h4',
    name: 'Rahimganj Rural Dispensary (RD)',
    category: 'hospitals',
    rating: 4.0,
    description: 'A government-run rural dispensary providing basic health consultations and medicine for the local community.',
    phone: 'Not Available',
    address: 'Rahimganj Bazar, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h5',
    name: 'Balia Union Health & Family Welfare Center',
    category: 'hospitals',
    rating: 4.1,
    description: 'Provides primary healthcare, maternal health services, and family planning for residents of Balia union.',
    phone: 'Not Available',
    address: 'Balia Union Parishad, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h6',
    name: 'Bhaitkandi Union Health & Family Welfare Center',
    category: 'hospitals',
    rating: 4.1,
    description: 'A government primary health unit serving the Bhaitkandi union with outpatient and maternal care.',
    phone: 'Not Available',
    address: 'Bhaitkandi Bazar Road, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1538108176634-899eb9e7f415?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h7',
    name: 'Payari Union Health & Family Welfare Center',
    category: 'hospitals',
    rating: 4.0,
    description: 'Government community-level facility providing vaccination and basic healthcare services.',
    phone: 'Not Available',
    address: 'Payari Union, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h8',
    name: 'Baola Union Health & Family Welfare Center',
    category: 'hospitals',
    rating: 4.0,
    description: 'Serving the Baola union with primary medical assistance and maternal health support.',
    phone: 'Not Available',
    address: 'Baola Bazar area, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h9',
    name: 'Singheshwar Union Health & Family Welfare Center',
    category: 'hospitals',
    rating: 4.0,
    description: 'Local government health post for vaccinations, family planning, and general health checkups.',
    phone: 'Not Available',
    address: 'Singheshwar Union, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1631217818242-a7c703ce1780?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h10',
    name: 'Rupasi Union Health & Family Welfare Center',
    category: 'hospitals',
    rating: 4.0,
    description: 'Provides essential primary health services and outpatient care to the rural population of Rupasi.',
    phone: 'Not Available',
    address: 'Rupasi Union, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h11',
    name: 'Popular Diagnostic Complex & Hospital Pvt.',
    category: 'hospitals',
    rating: 4.5,
    description: '24-hour private hospital and diagnostic complex offering pathology, imaging, and emergency support.',
    phone: '+8801746329292',
    address: 'W9W7+WJ4, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h12',
    name: 'Fatema Health Care Center, Phulpur',
    category: 'hospitals',
    rating: 4.3,
    description: 'Local private healthcare center serving surrounding union populations with general medical and clinic services.',
    phone: '+8801858362628',
    address: 'Chankanda Bazar Road, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h13',
    name: 'Roy Path',
    category: 'hospitals',
    rating: 4.1,
    description: 'Private medical clinic providing consultations and routine healthcare support.',
    phone: '+8801712287606',
    address: 'W9W7+XQX, Sherpur–Nakla–Phulpur–Mymensingh Highway, Phulpur',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h14',
    name: 'Bashundhara Diagnostic Center',
    category: 'hospitals',
    rating: 4.2,
    description: 'Diagnostic-focused private center offering pathology and health screening services.',
    phone: '+8801718763621',
    address: 'W9W7+VRM, Sherpur–Nakla–Phulpur–Mymensingh Highway, Phulpur',
    image: 'https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h15',
    name: 'Medica Diagnostic Center',
    category: 'hospitals',
    rating: 4.2,
    description: 'Local diagnostic and medical testing center supporting private healthcare needs.',
    phone: '+8801612896993',
    address: 'W9W7+XXP, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1538108176634-899eb9e7f415?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'h16',
    name: 'দি অ্যাপোলো ডায়াগনস্টিক সেন্টার',
    category: 'hospitals',
    rating: 4.4,
    description: 'Private diagnostic center with pathology and consultation services.',
    phone: '+8801790900859',
    address: 'X935+2HP, Sherpur–Mymensingh Highway, Phulpur',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r1',
    name: 'Niribili Hotel & Restaurant',
    category: 'restaurants',
    rating: 4.5,
    description: 'A popular and long-standing restaurant in the town center known for traditional Bengali meals, breakfast items, and snacks.',
    phone: '01712-972175',
    address: 'Phulpur Bazar (Near Main Road), Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r2',
    name: 'Al-Modina Hotel and Restaurant',
    category: 'restaurants',
    rating: 4.2,
    description: 'A busy eatery near the bus stand serving rice, curry, and various types of vuna khichuri to travelers and locals.',
    phone: 'Not Available',
    address: 'Phulpur Bus Stand Area, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r3',
    name: 'Bhaitkandi Mistanno Vander & Restaurant',
    category: 'restaurants',
    rating: 4.4,
    description: 'Located in the heart of Bhaitkandi union, offering traditional sweets and standard Bengali lunch items.',
    phone: 'Not Available',
    address: 'Bhaitkandi Bazar, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r4',
    name: 'Balia Bazar Food Corner',
    category: 'restaurants',
    rating: 4.0,
    description: 'A local union-level eatery providing tea, snacks, and basic meals for the Balia community.',
    phone: 'Not Available',
    address: 'Balia Bazar Main Road, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r5',
    name: 'Rahimganj Hotel & Sweets',
    category: 'restaurants',
    rating: 4.3,
    description: 'A well-known spot in Rahimganj for afternoon snacks, sweets, and local Bengali cuisine.',
    phone: 'Not Available',
    address: 'Rahimganj Bazar, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r6',
    name: 'New Haji Biriyani House',
    category: 'restaurants',
    rating: 4.6,
    description: 'A specialized biriyani shop offering Morog Polao and Kacchi Biriyani in the municipal area.',
    phone: '01715-684422',
    address: 'Sherpur Road, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r7',
    name: 'Payari Bazar Hotel',
    category: 'restaurants',
    rating: 3.9,
    description: 'A small-scale local restaurant serving the rural population of Payari union with daily lunch and breakfast.',
    phone: 'Not Available',
    address: 'Payari Bazar, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r8',
    name: 'Baola Bazar Cafe & Restaurant',
    category: 'restaurants',
    rating: 4.1,
    description: 'Provides various local food items and tea, serving as a social hub for the Baola union area.',
    phone: 'Not Available',
    address: 'Baola Bazar, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r9',
    name: 'Bhai Bhai Hotel and Restaurant',
    category: 'restaurants',
    rating: 4.2,
    description: 'A budget-friendly restaurant popular for fish curry, meat, and various bhartas.',
    phone: 'Not Available',
    address: 'Cinema Hall Road, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'r10',
    name: 'Rupasi Bazar Snack Point',
    category: 'restaurants',
    rating: 3.8,
    description: 'A village-level small restaurant mainly known for local snacks and traditional breakfast.',
    phone: 'Not Available',
    address: 'Rupasi Union, Phulpur, Mymensingh',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'd1',
    name: 'Green City Diagnostic Center',
    category: 'diagnostic',
    rating: 4.2,
    description: 'Modern diagnostic laboratory with advanced testing facilities.',
    phone: '01700-111111',
    address: 'Bazar Road, Phulpur',
    image: 'https://images.unsplash.com/photo-1579152276506-4070a93b23f4?auto=format&fit=crop&q=80&w=400',
  },
];

export interface News {
  id: string;
  title: string;
  preview: string;
  category: string;
  date: string;
  image: string;
}

export const mockNews: News[] = [
  {
    id: 'n1',
    title: 'Phulpur Smart City Project Initiated',
    preview: 'Local authorities have launched a new initiative to digitalize government services in the Phulpur area...',
    category: 'Politics',
    date: 'Oct 25, 2023',
    image: 'https://images.unsplash.com/photo-1449156001935-d287347517bb?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'n2',
    title: 'New Library Opened in Phulpur Model School',
    preview: 'Education is getting a boost with the opening of a modern library facility accessible to all students...',
    category: 'Education',
    date: 'Oct 24, 2023',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
  },
];

export interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  salary: string;
}

export const mockJobs: Job[] = [
  { id: 'j1', title: 'Medical Assistant', company: 'Phulpur Clinic', type: 'Full-time', salary: '15k - 20k' },
  { id: 'j2', title: 'Sales Representative', company: 'Local Trading Co.', type: 'Part-time', salary: '10k - 12k' },
];
