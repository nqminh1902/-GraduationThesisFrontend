import { BaseModel } from '.';

export class PostModel extends BaseModel {
    PostID: number;
    PostCode: string;
    PostTitle: string;
    PostImage: string;
    Description: string;
    ImageAlt?: string;
    Author?: string;
    Date?: string;
    PostContent?: string;
    ButtonContent?: string;
    TagID: number[];
    TagName: string[];

    constructor() {
        super();
        this.PostID = 0;
        this.PostCode = '';
        this.PostTitle = '';
        this.PostImage = '';
        this.Description = '';
        this.ImageAlt = '';
        this.Author = '';
        this.Date = '';
        this.PostContent = '';
        this.TagID = [0];
        this.TagName = [''];
    }
}
