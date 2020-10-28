import Layout from '../components/layout';
import ProjectList from '../components/projects/list';

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
