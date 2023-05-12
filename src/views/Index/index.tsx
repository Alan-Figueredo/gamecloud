import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { Link, Path } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useOptionsContext } from "../../context/OptionsContext";
import "./index.css"


export const Index = () => {
    const { isLoading, separar, games, setPage, page, setParameter } = useOptionsContext()
    const [gamesToShow, setGamesToShow] = useState(6);
    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 30 >= scrollHeight) {
            setGamesToShow(gamesToShow + 10);
        }
    };

    function manejarKeyDown(evento) {
        if (evento.key === 'Enter') {
            setParameter(evento.target.value)
            setPage(1)
        }
      }

    const handlePage = (type: string) => {
        if (type === "next") {
            if (gamesToShow >= 25) {
                setPage(page + 1)
            }
        }
        else {
            if (gamesToShow >= 25) {
                setPage(page - 1)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [gamesToShow]);

    if (isLoading) {
        return (
            <Loader />
        )
    }
    else {
        return (
            <Container id="index" className="pb-5">
                <Col lg={10} className="m-auto">
                    <input className="col-12 my-3 form-control" placeholder="Search games" onKeyDown={manejarKeyDown}  />
                </Col>
                {games && games.slice(0, gamesToShow).map((game: { appId: string | number | Partial<Path> | null | undefined; imgUrl: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; reviewSummary: string | undefined; price: string; }) => {
                    return (
                        <Col lg={10} className="card mt-3 m-auto" key={game.appId}>
                            <Link to={game.appId} >

                                <Row>
                                    <Col lg={4} className="col-3">
                                        <img className="img-fluid imagen" src={game.imgUrl} alt={`${game.title} image`} />
                                    </Col>
                                    <Col lg={6} className="col-7">
                                        <h2 className="titulo">{game.title}</h2>
                                        <p className="descripcion">{`User Reviews: ${game.reviewSummary === undefined ? 'Unknown' : game.reviewSummary.slice(0, 140).split("<br>")}`}...</p>
                                    </Col>
                                    <Col className="justify-content-center align-items-center">
                                        <Row className="mt-lg-2">
                                            <Col lg={5} className="col-3">
                                                {separar(game.price) === 0 || isNaN(separar(game.price)) ? "" : <p className="discount">{'-' + separar(game.price) + '%'}</p>}
                                            </Col>
                                            <Col lg={7} className="col-9">
                                                <p className="precio" style={{ textDecoration: (game.price.split("€")[1]) !== undefined && (game.price.split("€")[1].length) < 8 ? "line-through" : " " }}>{`${game.price.split("€")[0]}  ${game.price.split("€")[0] === '                        Free to Play                    ' || game.price.split("€")[0] === '                                            ' || game.price.split("€")[0] === "Free" ? "" : "€"}`}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col></Col>
                                            <Col>
                                                {game.price.split("€")[1] === undefined || (game.price.split("€")[1].length) > 8 ? "" : <p className="discountPrice pe-lg-4"> {`${game.price.split("€")[1]}€`}</p>}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </Link>
                        </Col>
                    )
                })}
                <div className="text-center mt-5">
                    <button className="btn btn-steam mx-1" hidden={page === 1 ? true : false} onClick={() => { handlePage("prev"); setGamesToShow(6) }}>Prev Page</button>
                    <button className="btn btn-steam mx-1" onClick={() => { handlePage("next"); setGamesToShow(6) }}>Next Page</button>
                </div>
            </Container>
        )
    }
}