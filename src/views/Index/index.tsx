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
        setGames: React.Dispatch<React.SetStateAction<Game[]>>;
        games: Game[];
        setPage: any;
        page: number;
        setParameter: any;
        isMobile: boolean;
    }
    const {
        isLoading,
        separar,
        setGames,
        games,
        setPage,
        page,
        setParameter,
        isMobile,
    } = useOptionsContext() as OptionsContextType;
    const [gamesToShow, setGamesToShow] = useState(6);

    //ordenar
    const ordenarMayor = (games: Game[]) => {
        games.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            }
            else if (a.title > b.title) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    const ordenarMenor = (games: Game[]) => {
        games.sort((a, b) => {
            if (a.title < b.title) {
                return 1
            }
            else if (a.title > b.title) {
                return -1
            }
            else {
                return 0
            }
        })
    }

    //ORdenar por precio, por el momento la API no considera el precio (anteriormente si)
    // const ordenarPrecioMayor = (games: Game[]) => {
    //     games.sort(function (a, b) { return a.price - b.price })
    // }
    // const ordenarPrecioMenor = (games: Game[]) => {
    //     games.sort(function (a, b) { return b.price - a.price })
    // }

    const handleSort = (value: number) => {
        switch (value) {
            case 1:
                ordenarMayor(games); setGames([...games])
                break;
            case 2:
                ordenarMenor(games); setGames([...games])
                break;
            // case 3:
            //     ordenarPrecioMayor(games); setGames([...games])
            //     break;
            // case 4:
            //     ordenarPrecioMenor(games); setGames([...games])
            //     break;
            default:
                console.log("ok")
        }
    }



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
        if (evento.key === 'Enter'|| evento.keyCode === 13) {
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
                <Row className="m-auto justify-content-sm-center align-items-center">
                    <Col lg={8} className="col-8">
                        <input className=" my-lg-3 mt-2 form-control" placeholder="Search games" onKeyDown={manejarKeyDown} />
                    </Col>
                    <Col lg={2} className="mt-sm-3 mt-4 mb-3 col-2">
                        <select className="ordenar" name="ordenar" id="ordenar" onChange={(evt) => { handleSort(Number(evt.target.value)); }}>
                            <option selected disabled>Sort By</option>
                            <option value={1}>Alfabeticamente A-Z</option>
                            <option value={2}>Alfabeticamente Z-A</option>
                            {/* <option value={3}>Precio Menor-Mayor</option>
                                    <option value={4}>Precio Mayor-Menor</option> */}
                        </select>
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