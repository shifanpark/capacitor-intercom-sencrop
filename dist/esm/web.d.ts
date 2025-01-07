import { WebPlugin } from '@capacitor/core';
import type { Intercom, IntercomArticle, IntercomCustomAttributes, IntercomEvent, IntercomIdentity, IntercomMessage, IntercomPlugin, IntercomSettings, IntercomSurvey, IntercomUser } from './definitions';
declare global {
    interface Window {
        Intercom?: Intercom;
        intercomSettings?: IntercomSettings;
        attachEvent?: any;
    }
}
export declare class IntercomWeb extends WebPlugin implements IntercomPlugin {
    initialize(config?: IntercomSettings): void;
    loginIdentifiedUser(identity: IntercomIdentity): Promise<void>;
    loginUnidentifiedUser(): Promise<void>;
    updateUser(user: IntercomUser): Promise<void>;
    setCustomAttributes(payload: IntercomCustomAttributes): Promise<void>;
    logout(): Promise<void>;
    logEvent(event: IntercomEvent): Promise<void>;
    displayMessenger(): Promise<void>;
    displayArticle(article: IntercomArticle): Promise<void>;
    displayMessageComposer(message?: IntercomMessage): Promise<void>;
    displayHelpCenter(): Promise<void>;
    hideMessenger(): Promise<void>;
    displayLauncher(): Promise<void>;
    hideLauncher(): Promise<void>;
    displaySurvey(survey: IntercomSurvey): Promise<void>;
}
