import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

 const handleGenerateImage = async () => {
  console.log("Generating Image");
  console.log(process.env.NEXT_PUBLIC_GPT_API_KEY);
  setIsLoading(true);
  
  try {
    // Temporary mock implementation
    const mockImage = {
      imageUrl: "https://via.placeholder.com/600x400?text=Mock+Image",
      prompt: prompt
    };
    
    setTimeout(() => {
      setImageUrl(mockImage.imageUrl);
      setGeneratedImages(prev => [...prev, mockImage]);
      setIsLoading(false);
    }, 1000);
    
  } catch (error) {
    console.error("Error:", error);
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
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
          >
            {isLoading ? "Loading..." : "Generate Image"}
          </button>
        </div>

        {imageUrl && <ImageCard action={() => setImageUrl(imageUrl)} imageUrl={imageUrl} prompt={prompt} />}
        
        {generatedImages.length > 0 && (
          <div className="mt-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Generated Images History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedImages.map((img, index) => (
                <ImageCard
                  key={index}
                  imageUrl={img.imageUrl}
                  prompt={img.prompt}
                  width="w-full"
                  action={() => setImageUrl(img.imageUrl)}
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