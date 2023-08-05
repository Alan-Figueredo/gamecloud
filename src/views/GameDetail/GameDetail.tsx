
import { JSXElementConstructor, Key, ReactElement, ReactFragment, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { GameReviews } from "../../components/GameReviews";
import "./GameDetail.css"
import { GameNews } from "../../components/GameNews";
import { GameAchievements } from "../../components/GameAchievements";
import { Loader } from "../../components/Loader/Loader";
import { Relevant } from "../../components/Relevant";
import { PurchaseCard } from "../../components/PurchaseCard";
import { GameInformation } from "../../components/GameInformation";
import { GameContent } from "../../components/GameContent";
export const GameDetail = () => {
    const { gameID } = useParams();
    const [reviewQuantity, setReviewQuantity] = useState(15)
    const [hid, setHid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [game, setGame] = useState([] as any)
    const [gameReview, setGameReview] = useState([] as any[])
    const [news, setNews] = useState()
    const [achievement, setAchievement] = useState()

    const url: string = `https://steam2.p.rapidapi.com/appDetail/${gameID}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1c02e6db93mshfd6daaa7314a48ep1d3c26jsnea324a1edbc9',
            'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
        }
    };


    //Fetch Gamedetail
    useEffect(() => {
        setIsLoading(true)
        fetch(url, options)
            .then(res => res.json())
            .then(json => { setGame(json); setIsLoading(false) })
            .catch(err => console.log(err));
    }, [gameID])

    //Fetch reviews
    useEffect(() => {
        fetch(`https://steam2.p.rapidapi.com/appReviews/${gameID}/limit/40/*`, options)
            .then(response => response.json())
            .then(response => setGameReview(response))
            .catch(err => console.error(err));
    }, [gameID])


    //Fetch news
    useEffect(() => {
        fetch(`https://steam2.p.rapidapi.com/newsForApp/${gameID}/limit/5/300`, options)
            .then(response => response.json())
            .then(response => setNews(response))
            .catch(err => console.error(err));
    }, [gameID])

    //Fetch achievements
    useEffect(() => {
        fetch(`https://steam2.p.rapidapi.com/globalAchievementPercentagesForApp/${gameID}`, options)
            .then(response => response.json())
            .then(response => setAchievement(response))
            .catch(err => console.error(err));
    }, [gameID])

    if (isLoading) {
        return (
            <Loader />
        )
    } else {
        return (
            <Container>
                {game &&
                    <main>
                        <h1 className="mt-4 mb-2">{game?.title}</h1>
                        <GameInformation game={game} />
                        <Row className="gap-3 mt-5">
                            <PurchaseCard game={game} />
                            <Relevant gameID={gameID} />
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <GameContent content={game} />
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col lg={8}>
                                <GameNews news={news!} />
                            </Col>
                            <Col>
                                <GameAchievements achievement={achievement} />
                            </Col>
                        </Row>
                        <div className="mt-5">
                            <GameReviews reviewQuantity={reviewQuantity} gameReview={gameReview && gameReview} />
                        </div>
                        <div className="py-5">
                            {gameReview && gameReview?.length > 10 && <Button hidden={hid} onClick={() => { setReviewQuantity(-1); setHid(true) }}>View all recommendations</Button>}
                        </div>
                    </main>
                }
            </Container>
        )
    }
}