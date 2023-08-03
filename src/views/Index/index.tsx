import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap"
import { Link, Path } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useOptionsContext } from "../../context/OptionsContext";
import "./index.css"


export const Index = () => {
    interface Game {
        appId: string | number | Partial<Path> | null | undefined;
        imgUrl: string | undefined;
        title: string;
        reviewSummary: string | undefined;
        price: string;
    }

    interface OptionsContextType {
        isLoading: boolean;
        separar: (price: string) => number;
        games: Game[];
        setPage: any;
        page: number;
        setParameter: any;
        isMobile: boolean;
    }
    const {
        isLoading,
        separar,
        games,
        setPage,
        page,
        setParameter,
        isMobile,
    } = useOptionsContext() as OptionsContextType;
    const [gamesToShow, setGamesToShow] = useState(6);



    const handlePrice = (price: string) => {
        return price.split("€")[0].trim().toLowerCase()
    }

    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 30 >= scrollHeight) {
            setGamesToShow(gamesToShow + 10);
        }
    };

    const manejarKeyDown = (evento: React.KeyboardEvent<HTMLInputElement>) => {
        if (evento.key === 'Enter') {
            setParameter(evento.currentTarget.value);
            setPage(1);
        }
    };

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
                <Row className="m-auto justify-content-center">
                    <Col lg={8} >
                        <input className=" my-lg-3 mt-2 form-control" placeholder="Search games" onKeyDown={manejarKeyDown} />
                    </Col>
                    <Col lg={2} >
                        <Row className="my-3 ">
                            <Col>
                                <p>Sort by</p>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ backgroundColor: "#4c6b22", color: "#BEEE11", border: "0px" }} id="dropdown-basic">
                                        Relevance
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-2">Release date</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Name</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Lower price</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Higher price</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {games ? games.slice(0, gamesToShow).map((game: Game) => {
                    return (
                        <Col lg={10} className="card mt-3 m-auto" key={game.appId?.toString()}>
                            <Link to={game?.appId?.toString() || ''} >

                                <Row>
                                    <Col lg={4} className="col-4">
                                        <img className="img-fluid imagen" src={game.imgUrl} alt={`${game?.title} image`} />
                                    </Col>
                                    <Col lg={6} className="col-5 p-0">
                                        <h2 className="titulo">{game?.title.length >= 30 ? game?.title.slice(0, 30) + "..." : game?.title}</h2>
                                        <p className="descripcion">{`User Reviews: ${game.reviewSummary === undefined ? 'Unknown' : game.reviewSummary.slice(0, isMobile !== null ? 38 : 110).split("<br>", 10) + ".."}`}</p>
                                    </Col>
                                    <Col className="justify-content-center align-items-center">
                                        <Row className="mt-lg-2">
                                            <Col lg={5} className={`${separar(game?.price) === 0 || isNaN(separar(game?.price)) ? "col-0" : "col-4 p-0"}`}>
                                                {separar(game?.price) === 0 || isNaN(separar(game?.price)) ? "" : <p className="discount">{'-' + separar(game?.price) + '%'}</p>}
                                            </Col>
                                            <Col lg={7} style={{ display: "flex", justifyContent: "center" }} className={`${separar(game?.price) === 0 || isNaN(separar(game?.price)) ? "col-12" : "col-6 p-0"}`}>
                                                <p className="precio float-end pe-lg-0 pe-1" style={{ textDecoration: (game?.price.split("€")[1]) !== undefined && (game?.price.split("€")[1].length) < 8 ? "line-through" : " " }}>{`${game?.price.split("€")[0]}  ${handlePrice(game?.price) === 'free to play' || handlePrice(game?.price) === "free demo" || handlePrice(game?.price) === '' || handlePrice(game?.price) === "free" ? "" : "€"}`}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col></Col>
                                            <Col>
                                                {game.price.split("€")[1] === undefined || (game.price.split("€")[1].length) > 8 ? "" : <p className="discountPrice pe-lg-4 pe-1"> {`${game.price.split("€")[1]}€`}</p>}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                            </Link>
                        </Col>
                    )
                }) : <h1>No se han podido recuperar los juegos, intente mas tarde</h1>}
                <div className="text-center mt-5">
                    <button className="btn btn-steam mx-1" hidden={page === 1 ? true : false} onClick={() => { handlePage("prev"); setGamesToShow(6) }}>Prev Page</button>
                    <button className="btn btn-steam mx-1" onClick={() => { handlePage("next"); setGamesToShow(6) }}>Next Page</button>
                </div>
            </Container>
        )
    }
}