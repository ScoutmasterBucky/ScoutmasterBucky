import { component, html } from 'fudgel';

component(
    'group-o-matic',
    {
        template: html`
            <h1>Group-O-Matic</h1>

            <p>
                Take a list of names and create groups of a specified size.
                Repeats the process for a series of groupings so you can get
                maximum interaction with new people at each session.
            </p>

            <group-o-matic-step-1
                @file-read="onFileRead($event.detail)"
                @file-read-error="onFileReadError()"
            ></group-o-matic-step-1>

            <group-o-matic-step-2
                *if="data"
                .data="data"
                @config="onConfig($event.detail)"
            ></group-o-matic-step-2>

            <group-o-matic-step-3
                *if="data && config"
                .data="data"
                .config="config"
                @best="onBest($event.detail)"
            ></group-o-matic-step-3>

            <group-o-matic-step-4
                *if="best"
                .best="best"
            ></group-o-matic-step-4>
        `,
    },
    class {
        best: any;
        config: any;
        data: string | null = null;

        onBest(best: any) {
            this.best = best;
        }

        onConfig(config: any) {
            this.best = null;
            this.config = config;
        }

        onFileRead(data: string) {
            this.best = null;
            this.config = null;
            this.data = data;
        }

        onFileReadError(data: string) {
            this.best = null;
            this.config = null;
            this.data = null;
        }
    }
);
