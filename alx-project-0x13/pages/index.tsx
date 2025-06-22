import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const { 
    isLoading, 
    responseData, 
    generatedImages, 
    fetchData,
    error 
  } = useFetchData<{ message: string }, { prompt: string }>();

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;
    fetchData('/api/generate-image', { prompt });
  };

  useEffect(() => {
    if (responseData?.message) {
      setImageUrl(responseData.message);
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      console.error(error);
      // You could show a toast notification here
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-6">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerateImage}
            disabled={isLoading || !prompt.trim()}
            className={`w-full p-3 rounded-lg transition duration-200 ${
              isLoading || !prompt.trim()
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {imageUrl && (
          <div className="w-full max-w-2xl mb-10">
            <ImageCard 
              action={() => setImageUrl(imageUrl)} 
              imageUrl={imageUrl} 
              prompt={prompt} 
            />
          </div>
        )}

        {generatedImages.length > 0 && (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-6 text-center">Generated Images History</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-md max-h-[500px] overflow-y-auto">
              {generatedImages.map((img, index) => (
                <ImageCard
                  key={`${index}-${img.imageUrl}`}
                  action={() => setImageUrl(img.imageUrl)}
                  imageUrl={img.imageUrl}
                  prompt={img.prompt}
                  width="w-full"
                  height="h-40"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;