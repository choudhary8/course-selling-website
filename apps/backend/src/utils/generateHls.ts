import ffmpeg from "./ffmpeg";

interface Ihls{
    videoPath:string,
    hlsPath:string,
    outputPath:string
}
export const genrateHls=(videoPath:string,outputPath:string,hlsPath:string):Promise<string>=>{
    return new Promise((resolve,reject)=>{ffmpeg(videoPath)
        .videoCodec("libx264")
        .audioCodec("aac")
        .outputOptions([
        "-hls_time 10",
        "-hls_playlist_type vod",
        `-hls_segment_filename ${outputPath}/segment%03d.ts`,
        "-start_number 0",
        ])
        .output(hlsPath)
        .on("end", () => {
        console.log("HLS conversion completed");
        //    fs.unlinkSync(videoPath);
        resolve(hlsPath);
        })
        .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject(err);
        })
        .run();
    })
}