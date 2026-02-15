import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary=async (filePath:string,folder:string)=>{
    try{
        if(!filePath) return null
        // console.log('filePath:',filePath);

        let response;
        if(folder==='courses'){
            response=await cloudinary.uploader.upload(filePath,{
                folder:folder,
                resource_type:'auto',
            })
        }else{
            response=await cloudinary.uploader.upload(filePath,{
                folder:folder,
                resource_type:'video',
                eager_async: false,
                eager: [
                    {
                      streaming_profile: "hd",
                      format: "m3u8",
                    },
                  ]
            })
        }
        fs.unlinkSync(filePath)
        // console.log('response:',response);
        return response;
    }catch(err){
        fs.unlinkSync(filePath)
        console.log('err :',err);
        
        return null;
    }
}