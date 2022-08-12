import { SystemSummary } from '@varrock-stray-dog/models';
import humanizeDuration from 'humanize-duration';
import { hostname } from 'os';
import { uptime } from 'process';

export const systemSummary = (): SystemSummary => {
    const uptimeMs = uptime() * 1000;
    return {
        container: hostname(),
        uptime: humanizeDuration(uptimeMs, { round: true }),
        uptimeRaw: Math.round(uptimeMs),
        env: process.env.NODE_ENV,
    };
};
