import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('')
export class SystemController {
    constructor(private _systemService: SystemService) {}

    @Get('/')
    status() {
        return this._systemService.status();
    }
}
