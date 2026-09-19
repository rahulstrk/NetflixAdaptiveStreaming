const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export type ProcessingStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

type ApiProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface ApiVideoData {
  videoId: string;
  originalFileName: string;
  processingStatus: ApiProcessingStatus;
  streamUrl: string | null;
  createdAt: string;
}

export interface VideoSummary {
  videoId: string;
  originalFilename: string | null;
  processingStatus: ProcessingStatus;
  streamUrl: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    videoId: string;
    workflowId: string;
  };
}

function mapProcessingStatus(status: ApiProcessingStatus): ProcessingStatus {
  return status.toUpperCase() as ProcessingStatus;
}

function mapVideoSummary(video: ApiVideoData): VideoSummary {
  return {
    videoId: video.videoId,
    originalFilename: video.originalFileName,
    processingStatus: mapProcessingStatus(video.processingStatus),
    streamUrl: video.streamUrl,
    createdAt: video.createdAt,
  };
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = await response.json() as T & { message?: string };

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function uploadVideo(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('video', file);

  const response = await fetch(`${API_URL}/api/v1/video/upload`, {
    method: 'POST',
    body: formData,
  });

  return parseJsonResponse<UploadResponse>(response);
}

export async function listVideos(): Promise<VideoSummary[]> {
  const response = await fetch(`${API_URL}/api/v1/video/list`);
  const data = await parseJsonResponse<{ data: ApiVideoData[] }>(response);
  return data.data.map(mapVideoSummary);
}

export async function getVideoStatus(videoId: string): Promise<VideoSummary | null> {
  const response = await fetch(`${API_URL}/api/v1/video/status/${videoId}`);

  if (response.status === 404) {
    return null;
  }

  const data = await parseJsonResponse<{ data: ApiVideoData }>(response);
  return mapVideoSummary(data.data);
}

export function getStreamUrl(streamPath: string | null): string | null {
  if (!streamPath) {
    return null;
  }
  return `${API_URL}${streamPath}`;
}

export { API_URL };
