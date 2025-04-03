import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Hospital QR System</h1>
          <p className="text-xl text-blue-600 mb-8">Streamline patient registration and information management</p>
          <Link 
            href="/form"
            className="inline-flex justify-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Fill Out Patient Form
          </Link>
        </div>

        {/* Prototype Iterations Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Prototype Evolution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Initial Prototype */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md bg-white">
                <Image
                  src="/images/prototype1.png"
                  alt="Initial Prototype"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">Initial Prototype</h3>
              <p className="text-gray-600">Basic form idea with patient information</p>
            </div>

            {/* Second Iteration */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md bg-white">
                <Image
                  src="/images/prototype2.png"
                  alt="Second Iteration"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">Second Iteration</h3>
              <p className="text-gray-600">Enhanced UI with improved form layout and validation</p>
            </div>

            {/* Current Version */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md bg-white">
                <Image
                  src="/images/prototype3.png"
                  alt="Current Version"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">Current Version</h3>
              <p className="text-gray-600">Modern hospital theme with responsive design and improved UX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}