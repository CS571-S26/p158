import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function SavedListings({ savedListings }) {
    const navigate = useNavigate();

    if (savedListings.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h4>No saved listings yet.</h4>
                <p className="text-muted">Bookmark a listing while browsing to save it here.</p>
                <Button onClick={() => navigate('/listings')}>Browse Listings</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2>Saved Listings</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {savedListings.map(listing => (
                    <Col key={listing.id}>
                        <Card
                            className="h-100"
                            style={{ cursor: 'pointer' }}
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
                                    {listing.parts.filter(p => !p.sold).length} part(s) available
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SavedListings;