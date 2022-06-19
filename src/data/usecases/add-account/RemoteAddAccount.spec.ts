import faker from 'faker'

import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteAddAccount } from './RemoteAddAccount'

type SutTypes = {
    sut: RemoteAddAccount
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<
        AddAccountParams,
        AccountModel
    >()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy,
    }
}

describe('RemoteAddAccount', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'url'
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.add(mockAddAccountParams())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct Body', async () => {
        const params = mockAddAccountParams()
        const { sut, httpPostClientSpy } = makeSut()

        await sut.add(params)

        expect(httpPostClientSpy.body).toEqual(params)
    })

    test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
        const params = mockAddAccountParams()
        const { sut, httpPostClientSpy } = makeSut()

        httpPostClientSpy.response = { statusCode: HttpStatusCode.forbidden }

        const promise = sut.add(params)

        await expect(promise).rejects.toThrow(new EmailInUseError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const params = mockAddAccountParams()
        const { sut, httpPostClientSpy } = makeSut()

        httpPostClientSpy.response = { statusCode: HttpStatusCode.badRequest }

        const promise = sut.add(params)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})
