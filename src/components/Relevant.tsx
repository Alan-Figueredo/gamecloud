import { Row } from "react-bootstrap"

export const Relevant = (props: { gameID: any; }) => {
    const gameID = props.gameID;
    return (
        <section className="card col-lg col-11 m-auto mt-sm-0 mt-4">
            <Row style={{ backgroundColor: "#1b2838" }}>
                <h2 className="py-2" style={{ backgroundColor: "#171a21", color: "white", fontSize: "24px" }}>Is this game relevant to you?</h2>
                <div>
                    <p style={{ color: "#556772", fontSize: "22px" }}>Sign in to see reasons why you may or may not like this based on your games, friends, and curators you follow.</p>
                    <button className="btn col-4 mx-auto mb-4" style={{ backgroundColor: "#2a475e", color: "#66c0f4", fontSize: "20px" }}><a href={`https://store.steampowered.com/login/?redir=app/${gameID}`} target="_blank">Sign in</a></button>
                </div>
            </Row>
        </section>
    )
}