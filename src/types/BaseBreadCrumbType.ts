interface BreadcrumbPage {
    text: string;
    link: string;
}

export interface BaseBreadcrumbType {
    currentPage: string;
    prevPages?: BreadcrumbPage[];
}
