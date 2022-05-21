import { IHttpPostClient } from 'data/protocols/http/IHttpPostClient'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string

    async post(url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
    }
}