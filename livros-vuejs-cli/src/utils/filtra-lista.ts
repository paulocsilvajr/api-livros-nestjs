function filtraLista<T>(lista: Array<T>, atributo: string, pesquisa: string): Array<T> {
    const pesquisaSemAcentos = pesquisa.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "")
    console.log("Filtrando livros que contém:", pesquisaSemAcentos)
    
    return lista.filter(
        elemento =>
            (elemento as any)[atributo].toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(pesquisaSemAcentos)
    )
}

export { filtraLista }