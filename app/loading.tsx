export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-gray-300 border-b-blue-500 rounded-full "
        style={{ animation: "movements 1s linear infinite " }}
      ></div>
    </div>
  );
}

