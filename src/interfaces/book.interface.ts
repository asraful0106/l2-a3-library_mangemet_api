export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available?: boolean
}