// src/pages/About.jsx
import Menu from '../components/Menu';

function About() {
  return (
    <div style={{ display: 'flex', flexDirection: "row"}}>
      <Menu />
      <h1>About Us</h1>
      <p>Learn more about our project.</p>
    </div>
  );
}

export default About;