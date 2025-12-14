import { component, css, html, rootElement } from 'fudgel';
import redirects from '~/data/redirects.yaml';
import globToRegExp from 'glob-to-regexp';

interface RedirectSuggestion {
    match: string | RegExp;
    url: string;
    title: string;
    description?: string;
    date?: Date;
}

component(
    'offer-suggestions',
    {
        style: css`
            .container {
                display: flex;
                justify-content: center;
            }

            .responsive {
                width: 100%;
                height: auto;
            }

            .scaled {
                display: flex;
                max-width: 250px;
                justify-content: center;
                align-items: center;
                text-align: center;
                flex-direction: column;
            }

            @media (min-width: 768.0001px) and (max-width: 1024px) {
                .scaled {
                    width: 22vw;
                }
            }

            @media (min-width: 480.0001px) and (max-width: 768px) {
                .scaled {
                    width: 26vw;
                }
            }

            @media (max-width: 480px) {
                .scaled {
                    width: min(50vw, 250px);
                }
            }
        `,
        template: html`
            <div class="container">
                <div class="scaled">
                    <img
                        class="responsive"
                        src="/images/bucky-does-not-know.webp"
                        alt="Scoutmaster Bucky shrugging"
                    />
                </div>
            </div>
            <p>
                The file you were attempting to reach no longer is at this
                location. From time to time, we move files around to improve our
                site structure, for updated content, or to remove outdated
                information.
            </p>

            <div *if="suggestions?.length">
                <p>
                    Here are some suggestions that might help you find what you
                    are looking for:
                </p>
                <ul>
                    <li *for="suggestion of suggestions">
                        <a href="{{suggestion.url}}">{{ suggestion.title }}</a>
                        <span *if="suggestion.description">
                            - {{ suggestion.description }}</span
                        >
                    </li>
                </ul>
            </div>

            <p>
                Please use the navigation menu at the top of the page to find
                what you are looking for, or return to the
                <a href="/">home page</a>.
            </p>
        `,
    },
    class {
        suggestions = [];

        onInit() {
            const urlFull = window.location
                .toString()
                .replace(
                    `${window.location.protocol}//${window.location.host}`,
                    ''
                );
            const urlPath = window.location.pathname;
            this.suggestions = redirects.filter(
                (redirect: RedirectSuggestion) => {
                    const regexp = globToRegExp(redirect.match);

                    return regexp.test(urlFull) || regexp.test(urlPath);
                }
            );
        }
    }
);
