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
	// ====================== YOUR 6 NEW FRAGRANCE PROMPTS ======================
	{
		title: "Women's floral scents",
		prompt: "Recommend floral everyday fragrances for women that are versatile and perfect for daily wear at work or casual outings."
	},
	{
		title: "Women's citrus scents",
		prompt: "Suggest citrus fragrances for women that are perfect for nights out, dates, or special occasions."
	},
	{
		title: "Women's Tom Ford",
		prompt: "What are the best Tom Ford fragrances for women? Recommend your top 3 with key notes and why they suit different moods or occasions."
	},
	{
		title: "Men's leather colognes",
		prompt: "Recommend bold, luxurious leather-based fragrances for men that feel masculine, sophisticated, and long-lasting."
	},
	{
		title: "Men's woody",
		prompt: "Suggest  woody fragrances for men — perfect for fall and winter."
	},
	{
		title: "Men's office scents",
		prompt: "Recommend professional, office-safe fragrances for men that are subtle, elegant, and appropriate for a workday environment."
	}
];