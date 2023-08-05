import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export const GameAchievements = (props: { achievement: any; }) => {
    const achievement = props.achievement;
    const [achieveQuantity, setAchieveQuantity] = useState(10)
    return (
        <>
            {achievement?.achievementpercentages?.achievements &&

                <section className="card ms-lg-1 ms-0 mt-lg-0 mt-3" >
                    <h2 style={{ fontSize: "23px", padding: "10px" }}>Includes  Steam Achievements</h2>
                    <Row className="px-3">
                        <Col lg={7}>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Name of Achievement</h3>
                        </Col>
                        <Col>
                            <h3 style={{ fontSize: "18px", color: "white" }}>% of all players</h3>
                        </Col>
                    </Row>
                    {achievement && achievement?.achievementpercentages?.achievements.slice(0, achieveQuantity).map((achieve: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; percent: number; }) => {
                        return (
                            <Row className="px-3">
                                <Col>
                                    <p>{achieve.name}</p>
                                </Col>
                                <Col className="text-end pe-4">
                                    <p className="float-right"> {achieve.percent.toFixed(2)}%</p>
                                </Col>
                            </Row>
                        )
                    })}
                    <button className="btn btn-steam shadow" hidden={achieveQuantity !== 10 ? true : false} onClick={() => { setAchieveQuantity(-1) }}>See all {achievement?.achievementpercentages?.achievements.length}</button>
                </section>}
        </>
    )
}