import {
    HttpPostParams,
    IHttpPostClient,
} from '../protocols/http/IHttpPostClient'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string
    body?: object

    async post(params: HttpPostParams): Promise<void> {
        this.url = params.url
        this.body = params.body
        return await Promise.resolve()
    }
}
