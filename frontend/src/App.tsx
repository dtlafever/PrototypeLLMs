import { useState } from 'react';
import HubPage from './components/HubPage'; // Import the new HubPage
import LessonGeneratorPage from './components/LessonGeneratorPage'; // Import the refactored LessonGeneratorPage
import SlangHangPage from './components/SlangHangPage'; // Import the new SlangHangPage
import './App.css';

// Define the possible pages/views
type AppPage = 'hub' | 'lesson' | 'slang';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('hub'); // Start at the hub

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'lesson':
        return <LessonGeneratorPage navigateTo={navigateTo} />;
      case 'slang':
        return <SlangHangPage navigateTo={navigateTo} />;
      case 'hub':
      default:
        return <HubPage navigateTo={navigateTo} />;
    }
  };

  return (
    <> {/* Use a fragment instead of Container here, as pages have their own containers */}
      {renderPage()}
    </>
  );
}

export default App;
