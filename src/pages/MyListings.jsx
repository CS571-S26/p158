import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function MyListings({ myListings }) {
    const navigate = useNavigate();

    if (myListings.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h1 style={{ fontSize: '4rem' }}>🦈</h1>
                <h4>You have no listings yet!</h4>
                <p className="text-muted">Get started by posting your first part-out.</p>
                <Button variant="danger" onClick={() => navigate('/createListing')}>Create a Listing</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>My Listings</h2>
                <Button variant="danger" onClick={() => navigate('/createListing')}>+ New Listing</Button>
            </div>

            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {myListings.map(listing => (
                    <Col key={listing.id}>
                        <Card
                            className="h-100 shadow-sm"
                            style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            onClick={() => navigate(`/listings/${listing.id}`)}
                        >
                            {listing.images.length > 0 ? (
                                <Card.Img
                                    variant="top"
                                    src={listing.images[0].url}
                                    style={{ height: 160, objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    className="bg-secondary d-flex align-items-center justify-content-center"
                                    style={{ height: 160 }}
                                >
                                    <span className="text-white">No Image</span>
                                </div>
                            )}
                            <Card.Body>
                                <Card.Title className="mb-1">
                                    {listing.year} {listing.make} {listing.model}
                                </Card.Title>
                                {listing.trim && (
                                    <Card.Subtitle className="text-muted mb-2">{listing.trim}</Card.Subtitle>
                                )}
                                <Card.Text className="small text-muted">
                                    {listing.parts.length} part(s) removed
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MyListings;