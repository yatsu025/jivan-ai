
import { useState } from 'react';
import HeroPage from '@/components/HeroPage';
import DharmaSelection from '@/components/DharmaSelection';
import HinduPage from '@/components/HinduPage';
import MuslimPage from '@/components/MuslimPage';
import SikhPage from '@/components/SikhPage';
import ChristianPage from '@/components/ChristianPage';

type Page = 'hero' | 'selection' | 'hindu' | 'muslim' | 'sikh' | 'christian';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('hero');

  const handleGetStarted = () => {
    setCurrentPage('selection');
  };

  const handleDharmaSelect = (dharma: string) => {
    setCurrentPage(dharma as Page);
  };

  const handleHome = () => {
    setCurrentPage('hero');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'hero':
        return <HeroPage onGetStarted={handleGetStarted} />;
      case 'selection':
        return <DharmaSelection onSelect={handleDharmaSelect} />;
      case 'hindu':
        return <HinduPage onHome={handleHome} />;
      case 'muslim':
        return <MuslimPage onHome={handleHome} />;
      case 'sikh':
        return <SikhPage onHome={handleHome} />;
      case 'christian':
        return <ChristianPage onHome={handleHome} />;
      default:
        return <HeroPage onGetStarted={handleGetStarted} />;
    }
  };

  return <div className="animate-fade-in">{renderPage()}</div>;
};

export default Index;
