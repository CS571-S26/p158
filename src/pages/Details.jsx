import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import loginStatusContext from '../loginStatusContext';

function Details({ listings, onDelete, savedIds, onToggleSaved }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(loginStatusContext);
    const [photoIndex, setPhotoIndex] = useState(0);

    const listing = listings.find(l => l.id === id);

    if (!listing) {
        return (
            <Container className="mt-5 text-center">
                <h4 >Listing not found.</h4>
                <Button variant="danger" onClick={() => navigate('/listings')}>Back to Listings</Button>
            </Container>
        );
    }

    const isOwner = user && user.id === listing.userId;
    const isSaved = savedIds.includes(listing.id);
    const hasImages = listing.images && listing.images.length > 0;

    function handleDelete() {
        if (window.confirm(`Delete listing for ${listing.year} ${listing.make} ${listing.model}?`)) {
            onDelete(listing.id);
            navigate('/myListings');
        }
    }

    function nextPhoto() {
        setPhotoIndex(prev => (prev + 1) % listing.images.length);
    }

    function prevPhoto() {
        setPhotoIndex(prev => (prev - 1 + listing.images.length) % listing.images.length);
    }

    return (
        <Container className="mt-4">

            <Button variant="danger" className="mb-3" onClick={() => navigate(-1)}>
                ← Back
            </Button>
            {isOwner && (
                <Button variant="danger" className="mb-3 ms-2" onClick={handleDelete}>
                    Delete Listing
                </Button>
            )}
            {user && !isOwner && (
                <Button
                    variant={isSaved ? "warning" : "outline-warning"}
                    className="mb-3 ms-2"
                    onClick={() => onToggleSaved(listing.id)}
                >
                    {isSaved ? '★ Saved' : '☆ Save'}
                </Button>
            )}

            <h2>{listing.year} {listing.make} {listing.model} {listing.trim}</h2>
            <p className="text-muted">Posted by {listing.postedBy}</p>

            <Row>
                {/* ── Left col: photos + description ── */}
                <Col md={7}>
                    {hasImages ? (
                        <div className="mb-3">
                            <img
                                src={listing.images[photoIndex].url}
                                alt={`Photo ${photoIndex + 1}`}
                                style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: '8px', cursor: listing.images.length > 1 ? 'pointer' : 'default' }}
                                onClick={listing.images.length > 1 ? nextPhoto : undefined}
                            />
                            {listing.images.length > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <Button variant="outline-secondary" size="sm" onClick={prevPhoto}>← Prev</Button>
                                    <span className="text-muted small">{photoIndex + 1} / {listing.images.length}</span>
                                    <Button variant="outline-secondary" size="sm" onClick={nextPhoto}>Next →</Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className="bg-secondary d-flex align-items-center justify-content-center mb-3"
                            style={{ height: 300, borderRadius: '8px' }}
                        >
                            <span className="text-white">No Images</span>
                        </div>
                    )}

                    {listing.description && (
                        <>
                            <h5>Description</h5>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{listing.description}</p>
                        </>
                    )}
                </Col>

                {/* ── Right col: parts ── */}
                <Col md={5}>
                    <h5><Badge bg="secondary">{listing.parts.length}</Badge> Removed Parts </h5>
                    {listing.parts.length > 0 ? (
                        <ul className="list-group">
                            {listing.parts.map(part => (
                                <li key={part.id} className="list-group-item">
                                    {part.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No parts removed yet.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Details;