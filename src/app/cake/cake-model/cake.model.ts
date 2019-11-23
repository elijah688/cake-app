export interface Cake {
    id?:string,
    title: string,
    comment: string,
    imagePath: string | File,
    yumFactor: boolean[],
    creator: string; 
}