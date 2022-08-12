import { Query, Resolver } from '@nestjs/graphql';
import { ApiStatus } from '@varrock-stray-dog/models';
import { Observable } from 'rxjs';
import { SystemService } from './system.service';

@Resolver()
export class SystemResolver {
    constructor(private _systemService: SystemService) {}

    @Query(() => ApiStatus)
    status(): Observable<ApiStatus> {
        return this._systemService.status();
    }
}
