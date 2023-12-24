import type { AxiosResponse } from 'axios';
import type { ServiceResponse } from '@/DTOs';
import BaseApiConfig from '../base/base-api-config';
import axios from 'axios';

export default class ImportApi {
    protected baseApi;

    controller = '';

    constructor() {
        this.baseApi = BaseApiConfig;
        this.controller = "Import";
    }

    validateCandidateImportData(file: FormData): Promise<AxiosResponse<ServiceResponse>> {
        return axios.post('http://localhost:7236/api/Import/validate-candidate-import', file, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    validateEducationMajorImportData(file: FormData): Promise<AxiosResponse<ServiceResponse>> {
        return axios.post('http://localhost:7236/api/Import/validate-education-major-import', file, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    validateUniversityImportData(file: FormData): Promise<AxiosResponse<ServiceResponse>> {
        return axios.post('http://localhost:7236/api/Import/validate-university-import', file, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }
}