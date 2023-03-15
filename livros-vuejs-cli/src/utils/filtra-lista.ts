import { IFiltro } from "@/interfaces/IFiltro"

function filtraLista(lista: Array<IFiltro>, pesquisa: string): Array<IFiltro> {
    const pesquisaSemAcentos = pesquisa.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "")
    console.log(`Filtrando listagem que contém o termo '${pesquisaSemAcentos}'`)
    
    return lista.filter(
        elemento =>
            elemento.filtro.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(pesquisaSemAcentos)
    )
}

export { filtraLista }