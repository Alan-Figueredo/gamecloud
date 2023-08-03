import { Card, Col, Row } from "react-bootstrap";

export const GameContent = (props: { content: any }) => {
    // Destructure the props to extract the content object
    const { content } = props;

    // Check if content is defined and contains the DLCs property
    if (!content || !content.DLCs || content.DLCs.length === 0) {
        return null; // Return null or any other placeholder content if there are no DLCs
    }

    return (
        <section>
            <>
                <h2>CONTENT FOR THIS GAME</h2>
                <hr style={{ color: "white" }} />
                {content.DLCs.map((dlc: { url: string; name: string; price: string }) => {
                    return (
                        <a href={`${dlc.url}`} target="_blank" key={dlc.url}>
                            <section className="card my-1">
                                <Row>
                                    <Col className="ps-4 pt-2" lg={10}>
                                        <p>{dlc.name}</p>
                                    </Col>
                                    <Col className="ms-5 pt-2">
                                        <p>{dlc.price}</p>
                                    </Col>
                                </Row>
                            </section>
                        </a>
                    );
                })}
            </>
        </section>
    );
};