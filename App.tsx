import React, { useState, useCallback } from 'react';
import SectionCard from './components/SectionCard';
import Breadcrumbs from './components/Breadcrumbs';
import { AppPath } from './types';

function App() {
  const [currentPath, setCurrentPath] = useState<AppPath[]>(['CBSE_SECTION']);

  const navigateTo = useCallback((path: AppPath) => {
    // Determine how to update the path based on the target
    if (path === 'CBSE_SECTION') {
      setCurrentPath(['CBSE_SECTION']);
    } else if (path === 'CLASS_10') {
      setCurrentPath(['CBSE_SECTION', 'CLASS_10']);
    } else if (path === 'BIOLOGY_CONTENT') {
      setCurrentPath(['CBSE_SECTION', 'CLASS_10', 'BIOLOGY_CONTENT']);
    }
  }, []);

  const handleBreadcrumbNavigate = useCallback((targetPath: AppPath) => {
    const targetIndex = currentPath.indexOf(targetPath);
    if (targetIndex !== -1) {
      setCurrentPath(currentPath.slice(0, targetIndex + 1));
    }
  }, [currentPath]);

  const currentView = currentPath[currentPath.length - 1];

  const renderContent = () => {
    switch (currentView) {
      case 'CBSE_SECTION':
        return (
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 max-w-md mx-auto h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 sm:text-4xl text-center">CBSE Section</h2>
            <SectionCard
              title="Class 10"
              onClick={() => navigateTo('CLASS_10')}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.414 9.612 5 8.32 5 7.028 5 5.808 5.414 4.643 6.253m15.316 0C18.188 5.414 16.968 5 15.68 5c-1.292 0-2.512.414-3.677 1.253M12 6.253C11.118 4.717 9.876 3.518 8.32 3.145m15.316 0C17.614 3.518 16.372 4.717 15.68 6.253M12 6.253v13m0-13C13.118 4.717 14.36 3.518 15.68 3.145M4.643 6.253L.643 10.253m15.316-4L23.357 10.253M4.643 6.253v13m15.316 0v-13C18.188 18.586 16.968 19 15.68 19c-1.292 0-2.512-.414-3.677-1.253M8.32 19c-1.292 0-2.512-.414-3.677-1.253"
                  />
                </svg>
              }
            />
          </div>
        );
      case 'CLASS_10':
        return (
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 max-w-md mx-auto h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 sm:text-4xl text-center">Class 10 Subjects</h2>
            <SectionCard
              title="Biology"
              onClick={() => navigateTo('BIOLOGY_CONTENT')}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              }
            />
          </div>
        );
      case 'BIOLOGY_CONTENT':
        const googleDrivePreviewUrl =
          'https://drive.google.com/file/d/14a_Bobx4KQhqrrckqIaLyP8fwE1Jt-ua/preview';
        return (
          <div className="flex flex-col flex-1 w-full max-w-screen-xl mx-auto p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              Class 10 Biology – Study Material
            </h2>
            <div className="flex-1 w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <iframe
                src={googleDrivePreviewUrl}
                className="w-full h-full min-h-[70vh] md:min-h-[80vh]"
                frameBorder="0"
                allowFullScreen={true}
                sandbox="allow-scripts allow-same-origin" // Restrict iframe capabilities for security
                title="Class 10 Biology Study Material"
              ></iframe>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center p-8 max-w-md mx-auto h-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome to EduConnect!</h2>
            <p className="text-gray-600 mt-4">Select a section to begin.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col antialiased text-gray-900">
      <header className="bg-white shadow-sm p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight">
            EduConnect
          </h1>
        </div>
      </header>

      <Breadcrumbs path={currentPath} onNavigate={handleBreadcrumbNavigate} />

      {/* Main content area takes full width, its children control their own max-width */}
      <main className="flex-1 w-full mx-auto flex flex-col justify-center items-center">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} EduConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default App;