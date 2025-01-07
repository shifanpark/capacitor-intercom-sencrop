import { WebPlugin } from '@capacitor/core';
export class IntercomWeb extends WebPlugin {
    initialize(config) {
        const app_id = config === null || config === void 0 ? void 0 : config.app_id;
        if (!app_id) {
            console.error('Intercom app_id is not defined');
            return;
        }
        window.intercomSettings = config;
        try {
            (function () {
                const w = window;
                const ic = w.Intercom;
                if (typeof ic === 'function') {
                    ic('reattach_activator');
                    ic('update', w.intercomSettings);
                }
                else {
                    const d = document;
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    const i = function () {
                        // eslint-disable-next-line prefer-rest-params
                        i.c(arguments);
                    };
                    i.q = [];
                    i.c = function (args) {
                        i.q.push(args);
                    };
                    w.Intercom = i;
                    const l = function () {
                        const s = d.createElement('script');
                        s.type = 'text/javascript';
                        s.async = true;
                        s.src = `https://widget.intercom.io/widget/${app_id}`;
                        const x = d.getElementsByTagName('script')[0];
                        if (x === null || x === void 0 ? void 0 : x.parentNode) {
                            x.parentNode.insertBefore(s, x);
                        }
                    };
                    if (document.readyState === 'complete') {
                        l();
                    }
                    else if (w.attachEvent) {
                        w.attachEvent('onload', l);
                    }
                    else {
                        w.addEventListener('load', l, false);
                    }
                }
            })();
        }
        catch (err) {
            throw Error('Could not initialize the Intercom plugin.');
        }
    }
    async loginIdentifiedUser(identity) {
        const { userId, email, userHash } = identity;
        if (window.Intercom) {
            window.Intercom('boot', {
                user_id: userId,
                email,
                user_hash: userHash,
            });
        }
    }
    async loginUnidentifiedUser() {
        if (window.Intercom) {
            await window.Intercom('boot', {});
        }
    }
    async updateUser(user) {
        const { email, phone, name, language } = user;
        if (window.Intercom) {
            await window.Intercom('update', {
                email,
                phone,
                name,
                language_override: language,
            });
        }
    }
    async setCustomAttributes(payload) {
        if (window.Intercom) {
            await window.Intercom('update', payload.attributes);
        }
    }
    async logout() {
        if (window.Intercom) {
            await window.Intercom('shutdown');
        }
    }
    async logEvent(event) {
        const { name, data } = event;
        if (window.Intercom) {
            await window.Intercom('trackEvent', name, data);
        }
    }
    async displayMessenger() {
        if (window.Intercom) {
            await window.Intercom('show');
        }
    }
    async displayArticle(article) {
        if (window.Intercom) {
            await window.Intercom('showArticle', article.id);
        }
    }
    async displayMessageComposer(message) {
        const { content } = message || {};
        if (window.Intercom) {
            if (content) {
                await window.Intercom('showNewMessage', content);
            }
            else {
                await window.Intercom('showNewMessage');
            }
        }
    }
    async displayHelpCenter() {
        if (window.Intercom) {
            window.Intercom('show');
        }
    }
    async hideMessenger() {
        if (window.Intercom) {
            await window.Intercom('hide');
        }
    }
    async displayLauncher() {
        if (window.Intercom) {
            await window.Intercom('update', {
                hide_default_launcher: false,
            });
        }
    }
    async hideLauncher() {
        if (window.Intercom) {
            await window.Intercom('update', {
                hide_default_launcher: true,
            });
        }
    }
    async displaySurvey(survey) {
        if (window.Intercom) {
            await window.Intercom('startSurvey', survey.id);
        }
    }
}
//# sourceMappingURL=web.js.map