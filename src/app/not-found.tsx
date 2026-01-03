import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800">
            <h2 className="mb-4 text-3xl font-bold">404 - Page Not Found</h2>
            <p className="mb-6 text-lg">Could not find requested resource</p>
            <Link
                href="/"
                className="rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
                Return Home
            </Link>
        </div>
    );
}
