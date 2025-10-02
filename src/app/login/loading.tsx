export default function skeleton() {
  return (
    <div className="relative w-screen h-screen text-white">
      {/* Logo skeleton */}
      <div className="absolute bottom-10 left-10 z-10">
        <div className="w-[200px] h-[100px] bg-white/20 backdrop-blur-sm rounded-lg animate-pulse" />
      </div>

      {/* Background image skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50">
        {/* Simulated background with abstract shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Simulated dashboard/office scene */}

        {/* Right side - Login form skeleton */}
        <div className="absolute bg-white right-0 top-0 w-1/3 h-full flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-6">
            {/* Header skeleton */}
            <div className="text-center mb-8 space-y-4">
              <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
              <div className="h-5 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
            </div>

            {/* Form skeleton */}
            <div className="space-y-6">
              {/* Email field skeleton */}
              <div>
                <div className="h-4 w-12 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>

              {/* Password field skeleton */}
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="relative">
                  <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse" />
                  {/* Eye icon skeleton */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>

              {/* Button skeleton */}
              <div className="h-12 w-full bg-blue-200 rounded-lg animate-pulse mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
