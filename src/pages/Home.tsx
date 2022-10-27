import HomeHeader from '../components/Home/HomeHeader';
import HomeLayout from '../components/Home/HomeLayout';
import ProjectsSection from '../components/Home/ProjectsSection';

const Home = () => {
  return (
    <HomeLayout>
      <HomeHeader />
      <ProjectsSection />
    </HomeLayout>
  );
};

export default Home;
