import { getEnv } from "../helpers";
import Imgproxy from "imgproxy";

const imgproxy = new Imgproxy({
  baseUrl: getEnv("IMGPROXY_BASE_URL"),
  key: getEnv("IMGPROXY_KEY"),
  salt: getEnv("IMGPROXY_SALT"),
  encode: true,
});

export const transformFileUrlWithoutProxy = (url: string) => {
  return `${getEnv("MINIO_URL_PREFIX")}/${url}`;
};

export const transformFileUrl = (url: string) => {
  if (!url) return null;

  const originalUrl = `${getEnv("MINIO_URL_PREFIX")}/${url}`;
  try {
    return imgproxy.builder().generateUrl(originalUrl);
  } catch (e) {
    return originalUrl;
  }
};

export const transformFilePreviewUrl = (url: string) => {
  if (!url) return null;

  const originalUrl = `${getEnv("MINIO_URL_PREFIX")}/${url}`;
  try {
    return imgproxy
      .builder()
      .resize("fit", 600, 400, false)
      .generateUrl(originalUrl);
  } catch (e) {
    return originalUrl;
  }
};

export const isOtherFolder = (url: string) => {
  const otherFolderUrl = `${getEnv("MINIO_BUCKET")}/other`;
  return url.includes(otherFolderUrl);
};
