import type { Metadata } from 'next';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'User Profile | NoteHub',
  description: 'View and manage your personal profile, notes, and settings in NoteHub.',
  keywords: ['profile', 'user account', 'notes', 'NoteHub', 'settings'],
  authors: [{ name: 'NoteHub Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'User Profile | NoteHub',
    description: 'Manage your account, notes, and preferences in NoteHub.',
    url: 'https://notehub.vercel.app/profile',
    siteName: 'NoteHub',
    type: 'website',
    images: [
      {
        url: 'https://notehub.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile Page',
      },
    ],
    },
  };

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
        <div className={css.profileCard}>
            <div className={css.header}>
                <h1 className={css.formTitle}>Profile Page</h1>
                <Link src="" className={css.editProfileButton}>
                    Edit Profile
                </Link>
            </div>
            <div className={css.avatarWrapper}>
                <img
                    src="User Avatar"
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />
            </div>
            <div className={css.profileInfo}>
                <p>
                    Username: your_username
                </p>
                <p>
                    Email: your_email@example.com
                </p>
            </div>
        </div>
    </main>
  );
};
export default ProfilePage;
