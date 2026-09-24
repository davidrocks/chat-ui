export type ProductRecommendation = {
	imageUrl: string;
	imageAlt: string;
	title: string;
	description: string;
	productUrl: string;
	productHandle?: string;
};

export type RecommendationBlock =
	| { type: "markdown"; content: string }
	| { type: "recommendation"; recommendation: ProductRecommendation };

// The advisor already has a documented, fixed Markdown recommendation format.  Only
// transform a complete block that satisfies that contract; ordinary assistant prose
// remains ordinary Markdown.
const RECOMMENDATION_BLOCK =
	/^\s*!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)\s*\n###\s+([^\n]+)\n([\s\S]*?)\n\[Read the full scent profile in our Store >>\]\((https?:\/\/[^\s)]+)\)\s*$/i;

function productHandle(url: string): string | undefined {
	try {
		const match = new URL(url).pathname.match(/\/products\/([^/?#]+)/);
		return match?.[1];
	} catch {
		return undefined;
	}
}

export function recommendationBlocks(content: string): RecommendationBlock[] {
	return content.split(/\n\s*---\s*(?:\n|$)/g).flatMap<RecommendationBlock>((block) => {
		const match = block.match(RECOMMENDATION_BLOCK);
		if (!match) return block.trim() ? [{ type: "markdown" as const, content: block }] : [];

		const [, imageAlt, imageUrl, title, description, productUrl] = match;
		return [
			{
				type: "recommendation" as const,
				recommendation: {
					imageAlt,
					imageUrl,
					title: title.trim(),
					description: description.trim(),
					productUrl,
					productHandle: productHandle(productUrl),
				},
			},
		];
	});
}
