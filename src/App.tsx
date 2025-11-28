import { useState } from 'react';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import { AnalysisResult } from './types';
import { analyzeProfile } from './utils/analyzer';
import LetterGlitch from './LetterGlitch';
import AtomLoader from './components/AtomLoader';

interface ProfileData {
  accountType: 'public' | 'private';
  username: string;
  posts: string;
  followers: string;
  following: string;
  dateJoined: string;
  location: string;
  bio: string;
  isVerified: boolean;
  imageFile: File | null;
}
function App() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (data: ProfileData) => {
    setIsAnalyzing(true);
    setResult(null);
    setUsername(data.username);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const analysisResult = analyzeProfile(data.username, data.imageFile !== null);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setResult(null);
    setUsername('');
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          className="w-full h-full"
        />
      </div>
          <br/>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
  <div className="p-4 rounded-2xl shadow-lg flex items-center justify-center">
    <AtomLoader />
  </div>
</div>
          <br/>
          <br/>
          <h1 className="text-5xl font-bold text-white mb-3">
            Fade
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Instagram Fake ID Detector
          </p>
          <p className="text-sm text-white mt-2">
            Analyze profiles to detect potential fake or suspicious accounts
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {!result ? (
            <UploadSection
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <>
              <ResultsSection result={result} username={username} />
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
              >
                Analyze Another Profile
              </button>
            </>
          )}
        </div>

        <div className="mt-16 text-center text-sm text-white">
          <p>
            Fade uses manual datasets and analysis to identify suspicious account characteristics.
          </p>
          <p className="mt-2">
            This tool is for educational purposes. Always verify information through official channels.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App; 