import { useNavigate, NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function About() {
    return (
        <Container className="mt-4">
            <h2>About Part Out Shark</h2>
            <p>Part Out Shark is a marketplace for car enthusiasts, mechanics, and junkyards to list vehicles being parted out. Browse available parts, contact sellers, and track what's been sold — all in one place.</p>
        </Container>
    );
}

export default About;