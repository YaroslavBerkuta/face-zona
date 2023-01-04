import { IFile } from "../../typing/interfaces";
import { AxiosResponse } from "axios";

interface Params {
  filename?: string;
  mimetype?: string;
  userId: number;
}

export interface GetPresignedUrlReqResponse {
  presignedUrl: string;
  uploadId: string;
}

type GetPresignedUrlReq = (
  params: any
) => Promise<AxiosResponse<GetPresignedUrlReqResponse>>;

type FinishUploadReq = (uploadId: string) => Promise<any>;

class PresignedUploaderService {
  public async upload(
    file: IFile,
    getUrlReq: GetPresignedUrlReq,
    finishReq: FinishUploadReq,
    params: Params
  ): Promise<any> {
    console.log("start upload", file);
    const { presignedUrl, uploadId } = await this.getLink(getUrlReq, {
      ...params,
      filename: file.name,
      mimetype: file.type,
    });

    console.log(presignedUrl);
    await this.uploadFile(presignedUrl, file);

    return await this.endUpload(uploadId, finishReq);
  }

  private async getLink(getUrlReq: GetPresignedUrlReq, params: Params) {
    const { data } = await getUrlReq(params);
    return data;
  }

  private async uploadFile(url: string, file: any) {
    console.log("file data:", file);
    await fetch(url, {
      method: "PUT",
      body: file,
    });
  }

  private async endUpload(id: string, finishReq: FinishUploadReq) {
    await finishReq(id);
  }
}

export const presignedUploaderService = new PresignedUploaderService();
