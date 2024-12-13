import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/75 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin">
          <Loader2 className="text-blue-600 w-16 h-16" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 tracking-wide">
          Loading...
        </h2>
        <div className="w-64 bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
