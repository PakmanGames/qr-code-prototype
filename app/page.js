import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1>This is the work in progress landing page</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        <Link href="/form">
          Go to Form
        </Link>
      </button>
    </div>
  );
}