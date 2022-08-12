import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../environments/environment';

@Component({
    selector: 'varrock-stray-dog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public apiData: any | undefined;
    public inviteUrl = environment.inviteUrl;

    constructor(private _apollo: Apollo) {}

    ngOnInit() {
        this._apollo
            .watchQuery({
                pollInterval: 1000,
                query: gql`
                    {
                        status {
                            bot {
                                guilds
                                users
                                uptime
                                container
                            }
                            uptime
                            container
                        }
                    }
                `,
            })
            .valueChanges.subscribe(
                (r: ApolloQueryResult<any>) => (this.apiData = r?.data?.status)
            );
    }
}
