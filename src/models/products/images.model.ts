import { IPictures } from "@interfaces/models/products/images.model";

export class Picture implements IPictures {
    id: number;
    title: string;
    url: string;
    size: number;
}

export class PictureBuilder {
    image: Picture;

    private constructor() {
        this.image = new Picture();
    }

    static new() {
        return new PictureBuilder();
    }

    setTitle(title: string) {
        this.image.title = title;
        return this;
    }

    setUrl(url: string) {
        this.image.url = url;
        return this;
    }

    setSize(size: number) {
        this.image.size = size;
        return this;
    }

    build() {
        return this.image;
    }
}
