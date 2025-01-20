import {Injectable, OnModuleInit} from "@nestjs/common";
import {DiscoveryService, MetadataScanner, Reflector} from "@nestjs/core";
import {BOARD_PROCESS} from "./board/board.service";
import {EncryptionService} from "./encryption.service";

@Injectable()
export class BoardProcessDecoratorRegister implements OnModuleInit {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly reflector: Reflector,
        private readonly encryptionService: EncryptionService
    ) {
    }

    onModuleInit() {
        return this.discoveryService
            .getProviders() // #1. 모든 provider 조회
            .filter((wrapper) => wrapper.isDependencyTreeStatic())
            .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
            .forEach(({ instance }) => {
                this.metadataScanner.scanFromPrototype(
                    instance,
                    Object.getPrototypeOf(instance),
                    (methodName) => {
                        const property = this.reflector.get(BOARD_PROCESS, instance[methodName]);

                        if (!property) return false;

                        const methodRef = instance[methodName];

                        instance[methodName] = async function (...args: any[]) {
                            const result = await methodRef.call(instance, ...args)

                            for (const board of result) {
                                board.content = await this.encryptionService.encryption(board.content);
                            }

                            return result;
                        }
                    }
                )
            })

    }
}