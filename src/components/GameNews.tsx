import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useOptionsContext } from "../context/OptionsContext";

export const GameNews = (props) => {
    const news = props.news;    
    return (
        <>
            <h2>RECENT EVENTS & ANNOUNCEMENTS</h2>
            <hr style={{ color: "white" }} />
            {news && news?.appnews?.newsitems.map((ne: { url: string | undefined; gid: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; feedname: string; date: string | number | Date; }) => {
                return (
                    <a href={ne.url} target="_blank" key={ne.gid}>
                        <div className="card my-2 px-2 announcement">
                            <h3>{ne.title}</h3>
                            <p>{`News author: ${ne.feedname === "steam_community_announcements" ? "Steam announcement" : ne.feedname}`}</p>
                            <p>{`News date: ${(new Date(ne.date)).toDateString()}`}</p>
                        </div>
                    </a>
                )
            })}
        </>

    )
}