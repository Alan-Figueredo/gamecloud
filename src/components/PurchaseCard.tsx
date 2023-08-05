import { Button, Col, Row } from "react-bootstrap"

export const PurchaseCard = (props: { game: any }) => {
    const game = props.game
    return (
        <section className="card purchaseCard col-lg-8 col-11  justify-content-center">
            <Row>
                <Col lg={7}>
                    <h2>{`Purchase ${game?.title}`}</h2>
                </Col>
                <Col className="floatCard me-lg-2 mx-2">
                    <Row className="bg-black">
                        <Col lg={8} className="col-8">
                            <h2 className="my-3" style={{ fontSize: "23px" }}>{game.price}</h2>
                        </Col>
                        <Button className="my-1 addToCart col me-1">Add to cart</Button>
                    </Row>
                </Col>
            </Row>
        </section>
    )
}