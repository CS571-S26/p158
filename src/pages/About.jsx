import { useNavigate, NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function About() {
    return (
        <Container className="mt-4">
            <h2>About Part Out Shark</h2>
            <p>Part Out Shark is a place to help you find parts you need and part out your own vehicles. We serve car enthusiasts, mechanics, and junkyards alike to make parting out your cars easy.</p>
        </Container>
    );
}

export default About;