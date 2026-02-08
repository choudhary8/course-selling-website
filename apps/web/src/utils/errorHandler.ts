export const errorHandler=(error:unknown,context='Request failed ')=>{
    let message=context
    if(
        error instanceof Error &&
        typeof error==='object' &&
        error!==null &&
        'response' in error &&
        (error as any).response?.data?.message
    ){
        message=`${context} : ${(error as any).response.data.message}`
    }
    else if(error instanceof Error){
        message=`${context} : ${error.message}`
    }
    else if(typeof error==='string'){
        message=`${context} : ${error}`
    }

    console.log(error,message);
    return message;
}