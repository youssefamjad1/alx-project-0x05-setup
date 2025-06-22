import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const resp = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: { 'Content-type': 'application/json' }
      });

      if (!resp.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await resp.json();
      const newImage = { imageUrl: data.message, prompt };
      
      setImageUrl(data.message);
      setGeneratedImages(prev => [...prev, newImage]);
      
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
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
            disabled={isLoading}
            className={`w-full p-3 rounded-lg transition duration-200 ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg w-full max-w-md text-center">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="w-full max-w-2xl mt-6">
            <ImageCard 
              action={() => setImageUrl(imageUrl)} 
              imageUrl={imageUrl} 
              prompt={prompt} 
            />
          </div>
        )}

        {generatedImages.length > 0 && (
          <div className="mt-8 w-full max-w-6xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Generated Images History</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-md max-h-[500px] overflow-y-auto">
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