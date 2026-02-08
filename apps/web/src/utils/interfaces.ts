interface Icreator{
    _id:string,
    firstName:string,
    lastName:string
}
export interface Icourse{
    _id:string,
    imageUrl?:string,
    title:string,
    description:string,
    category:string
    creator:Icreator,
    price:number
}

export interface IlessonDetails{
    courseId:string,
    lessonName:string,
    lessonVideo:File
}

export interface Ilesson{
    _id:string,
    lessonName:string,
    videoUrl:string
}



