import { Injectable } from '@angular/core';
import { ExternalConfigurationHandlerInterface, ExternalConfiguration } from '@lagoshny/ngx-hal-client';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

    getProxyUri(): string {
        return '';
    }

    getRootUri(): string {
        return 'http://localhost:8080/api/repo';
    }

    getHttp(): HttpClient {
        return this.http;
    }

    deserialize() {
        throw new Error("Method not implemented.");
    }
    serialize() {
        throw new Error("Method not implemented.");
    }

    getExternalConfiguration(): ExternalConfiguration {
        return '';
    }

    setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
    }

    constructor(private http: HttpClient) {
    }
}