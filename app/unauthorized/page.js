export default function Unauthorized() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full ">
        <h1 className="text-2xl font-bold text-red-600 mb-4 ">Unauthorized Access</h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page. This area is restricted to organizers only.
        </p>
        <a
          href="/"
          className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
