import Layout from '../components/Layout';
import ProjectList from '../components/projects/List';

const Projects = () => (
  <Layout
    title="Projects"
    description="A tiny incomplete collection of my current projects."
  >
    <h1>Projects</h1>
    <ProjectList />
  </Layout>
);

export default Projects;
