export const SortBy =()=>{
    return(
        <article>
            <h2>Filtrar por precio</h2>
            <input id="price" type="range" min="0" max="3.14" step="any" />
            <hr/>
            <input type="checkbox" name="No mostrar los articulos free to play" />
        </article>
    )
}