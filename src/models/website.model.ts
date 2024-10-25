import { IWebsites } from "interfaces/models/website.model";

export class Website implements IWebsites {
    id: number;
    title: string;
    domain: string;
    cdn: string;
    logo: string;
    settings: any[];
}

export class WebsiteBuilder {
    website: IWebsites;

    private constructor() {
        this.website = new Website();
    }

    static new() {
        return new WebsiteBuilder();
    }

    public setTitle(title: string) {
        this.website.title = title;
        return this;
    }

    public setDomain(domain: string) {
        this.website.domain = domain;
        return this;
    }

    public setCdn(cdn: string) {
        this.website.cdn = cdn;
        return this;
    }

    public setLogo(logo: string) {
        this.website.logo = logo;
        return this;
    }

    public setSettings(settings: any[]) {
        this.website.settings = settings;
        return this;
    }

    public build() {
        return this.website;
    }
}
