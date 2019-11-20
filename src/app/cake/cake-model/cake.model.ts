export interface Cake {
    id?:string,
    title: string,
    comment: string,
    image: string | File,
    stars: boolean[],
    creator: string; 
}