// fonte: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = (ms: number) => new Promise(res => {
    setTimeout(res, ms)
})

export async function esperePor(segundos: number) {
    console.log(`Esperando por ${segundos} segundos...`)
    await delay(segundos * 1000)
}
