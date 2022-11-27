import { useState } from 'react';
import HomeHeader from '../components/Home/HomeHeader';
import HomeLayout from '../components/Home/HomeLayout';
import ProjectsSection from '../components/Home/ProjectsSection';

const Home = () => {
  const [isPublic, setIsPublic] = useState(false);

  return (
    <HomeLayout>
      <HomeHeader isPublic={isPublic} setIsPublic={setIsPublic} />
      <ProjectsSection isPublic={isPublic} />
    </HomeLayout>
  );
};

export default Home;
