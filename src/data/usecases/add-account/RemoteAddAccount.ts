import { IHttpPostClient } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { AddAccountParams, IAddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements IAddAccount {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient<
            AddAccountParams,
            AccountModel
        >
    ) {}

    async add(params: AddAccountParams): Promise<AccountModel> {
        const httpReponse = await this.httpPostClient.post({
            url: this.url,
            body: params,
        })

        return httpReponse.body
    }
}
