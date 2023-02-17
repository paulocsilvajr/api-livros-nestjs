function formataDataBR(data: Date) {
    return data.toLocaleDateString("pt-BR", { timeZone: "UTC" })
}

export { formataDataBR }