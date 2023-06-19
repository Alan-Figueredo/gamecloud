import { Card, Col, Row } from "react-bootstrap"

export const GameContent = (props: { content: any; }) => {
    const content = props.content;
    return (
        <section >
            {content.DLCs.length > 0 &&
                <>
                    <h2>CONTENT FOR THIS GAME</h2>
                    <hr style={{ color: "white" }} />
                    {content?.DLCs.map((dlc : {url:string; name:string; price:string}) => {
                        return (
                            <a href={`${dlc.url}`} target="_blank">
                                <section className="card my-1">
                                    <Row >
                                        <Col className="ps-4 pt-2" lg={10}>
                                            <p>{dlc.name}</p>
                                        </Col>
                                        <Col className="ms-5 pt-2">
                                            <p>{dlc.price}</p>
                                        </Col>
                                    </Row>
                                </section>
                            </a>
                        )
                    })}
                </>
            }

        </section>
    )
}