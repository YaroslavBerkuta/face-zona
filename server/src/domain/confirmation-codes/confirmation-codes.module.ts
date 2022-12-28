import { DynamicModule, Module } from "@nestjs/common";
import { RedisModule } from "src/libs/redis";
import { provideClass } from "src/shared";
import { CONFIRMATION_CODES_SERVICE } from "./consts";
import { ConfirmationCodesService, CONFIRMATIONS_CODES_SERVICES } from "./services";

@Module({})
export class ConfirmationCodesModule {
    static getProviders() {
        return [
            provideClass(CONFIRMATION_CODES_SERVICE, ConfirmationCodesService),
            ...CONFIRMATIONS_CODES_SERVICES
        ]
    }

    static forRoot(): DynamicModule {
        return {
            module: ConfirmationCodesModule,
            imports: [RedisModule.forFeature()],
            providers: ConfirmationCodesModule.getProviders()
        }
    }

    static forFeature(): DynamicModule {
        return {
            module: ConfirmationCodesModule,
            imports: [RedisModule.forFeature()],
            providers: ConfirmationCodesModule.getProviders(),
            exports: [CONFIRMATION_CODES_SERVICE],
        }
    }
}