export type RouterFollowUp = {
	title: string;
	prompt: string;
};

export type RouterExampleAttachment = {
	src: string;
};

export type RouterExample = {
	title: string;
	prompt: string;
	followUps?: RouterFollowUp[];
	attachments?: RouterExampleAttachment[];
};

export const routerExamples: RouterExample[] = [
    {
        title: "Women's everyday perfume",
        prompt: "Recommend everyday perfumes for women."
    },
    {
        title: "Women's date night perfume",
        prompt: "Recommend date night perfumes for women."
    },
    {
        title: "Women's fresh perfume",
        prompt: "Recommend fresh and clean perfumes for women."
    },
    {
        title: "Women's sweet perfume",
        prompt: "Recommend sweet vanilla perfumes for women."
    },
    {
        title: "Men's fresh cologne",
        prompt: "Recommend fresh everyday colognes for men."
    },
    {
        title: "Men's woody cologne",
        prompt: "Recommend woody and spicy colognes for men."
    }
];