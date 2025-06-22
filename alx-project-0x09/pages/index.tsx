import ImageCard from "@/components/common/ImageCard";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
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
      setImageUrl(data.message);
      
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error(err);
      setImageUrl("https://via.placeholder.com/600x400?text=Error+Generating+Image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
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
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {imageUrl && (
          <ImageCard 
            action={() => setImageUrl(imageUrl)} 
            imageUrl={imageUrl} 
            prompt={prompt} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;