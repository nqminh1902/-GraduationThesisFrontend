import type { ServiceResponse } from '@/DTOs';
import type { PagingRequest } from '@/models';
import type { AxiosResponse } from 'axios';
import BaseApiConfig from '../base/base-api-config';

export default class UploadApi {
    private baseApi = BaseApiConfig;

    controller = 'Upload';

    UploadFile(file: FormData): Promise<AxiosResponse> {
        return this.baseApi.post(this.controller, file, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    DeleteFile(id: string): Promise<AxiosResponse> {
        return this.baseApi.delete(this.controller + `/${id}`);
    }

}
