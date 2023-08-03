import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export const OptionsContext = createContext({});

export const OptionsContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [parameter, setParameter] = useState("positive")
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1)
    const API_LINK = `https://steam2.p.rapidapi.com/search/${parameter}/page/${page}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9dd2624f32mshff3fe71e7b43bc5p17adf6jsn97839d7dd3fc',
            'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
        }
    };

    function isMobile(): boolean {
        return !!(
            (navigator.userAgent.match(/Android/i)) ||
            (navigator.userAgent.match(/webOS/i)) ||
            (navigator.userAgent.match(/iPhone/i)) ||
            (navigator.userAgent.match(/iPod/i)) ||
            (navigator.userAgent.match(/iPad/i)) ||
            (navigator.userAgent.match(/BlackBerry/i))
        );
    }
    //Funcion para separar precio sin descuento al precio con descuento
    const separar = (price: string) => {
        let precio = 0;
        let porcentaje;
        let priceArray = price.split("€");
        if (priceArray.length > 1 && priceArray[1] != " ") {
            precio = parseInt(priceArray[0]) - parseInt(priceArray[1])
        }
        porcentaje = (precio * 100) / (parseInt(priceArray[0]));
        return Math.floor(porcentaje);
    }

    //Fetch index games
    useEffect(() => {
        setIsLoading(true)
        fetch(API_LINK, options).then(res => res.json()).then(data => { data && setGames(data); setIsLoading(false) });
    }, [page, parameter])
    return (
        <OptionsContext.Provider value={{ separar, games, isLoading, setPage, page, setParameter, isMobile }}>
            {children}
        </OptionsContext.Provider>
    )
}

export const useOptionsContext = () => useContext(OptionsContext);