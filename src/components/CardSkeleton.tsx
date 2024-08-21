export const CardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative animate-pulse">
            <div className="absolute top-2 left-2 z-10 bg-gray-300 text-md font-semibold px-2 py-0 rounded-full w-12 h-6"></div>
            <div className="relative w-full h-64 bg-gray-300"></div>
            <div className="p-4 flex justify-between items-center">
                <div>
                    <div className="bg-gray-300 w-40 h-4 rounded"></div>
                    <div className="bg-gray-300 w-40 h-4 rounded mt-2"></div>
                </div>
                <div className="flex space-x-2">
                    <div className="bg-gray-300 p-2 rounded w-10 h-10"></div>
                    <div className="bg-gray-300 p-2 rounded w-10 h-10"></div>
                </div>
            </div>
        </div>
    );
};