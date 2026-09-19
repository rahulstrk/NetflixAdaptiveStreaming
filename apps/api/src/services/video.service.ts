import {createVideoRecord, listVideos, getVideoByVideoId } from '../repository/video.repository';

export async function listVideosService() {
  const videos = await listVideos();
  return videos;  
}

export async function createVideoRecordService(videoId: string, originalFileName: string) {
    const video = await createVideoRecord(videoId, originalFileName)
    return video
}

export async function getVideoByVideoIdService(videoId: string) {
    return getVideoByVideoId(videoId);
}