import { Col, Row } from "react-bootstrap";

export const GameInformation = (props: { game: any; }) => {
    const game = props.game;
    return (
        <Row>
            <Col className="mt-4 me-3" lg={8}>
                <img src={game.imgUrl} alt={`${game?.title} img`} style={{ width: "100%", height: "auto" }} />
            </Col>
            <Col>
                <p className="my-4" style={{ color: "#c6d4df", fontSize: "18px", fontWeight: "400" }}>{game.description}</p>
                <p style={{ color: "#556772" }}>ALL REVIEWS: <b>{game.allReviews?.summary}</b></p>
                <p style={{ color: "#556772" }}>Released date: <b>{game.released}</b></p>
                <p style={{ color: "#556772" }}>Developer: <a href={game.developer?.link} target="_blank">{game.developer?.name}</a></p>
                <p style={{ color: "#556772" }}>Publisher: <a href={game.publisher?.link} target="_blank">{game.publisher?.name}</a></p>
                <p style={{ color: "#556772", fontWeight: "400", fontSize: "19px" }}>Popular user-defined tags for this product:</p>
                <Row className="ps-2">
                    {game.tags && game.tags.slice(1, 5).map((tag: { name: string | undefined; url: string | undefined; }) => {
                        return (
                            <a href={tag.url} className="card text-center col-3 w-auto mx-1 my-1" key={tag.name}>{tag.name}</a>
                        )
                    })}
                </Row>
            </Col>
        </Row>
    )
}