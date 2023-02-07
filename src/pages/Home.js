import React from 'react';
import './Home.css';
import HeroArea from '../components/HeroArea';
import IdeaSection from '../components/IdeaSection';
import StudentSection from '../components/StudentSection';
import ObjectiveSection from '../components/ObjectiveSection';
import CategoriesSection from '../components/CategoriesSection';
import StatisticsSection from '../components/StatisticsSection';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
            <div className="homepage_main">
               
                    { /* COMPONENTS */}

                  
                    <HeroArea />

                    <IdeaSection />

                    <StudentSection />

                    <ObjectiveSection />

                    <CategoriesSection />

                    <StatisticsSection />

                    <Footer />
               
            </div>
    </div>
  )
}

export default Home