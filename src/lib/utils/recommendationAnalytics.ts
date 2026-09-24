type RecommendationEventMetadata = {
	productHandle?: string;
	productName: string;
	conversationId?: string;
	source?: "product_image" | "product_title" | "primary_cta" | "secondary_profile_link";
	bestMatch: boolean;
};

declare global {
	interface Window {
		_paq?: { push: (event: unknown[]) => void };
	}
}

const shown = new Set<string>();

// Matomo is installed by the host deployment. Keeping the integration behind its
// standard queue makes ChatUI safe to run in local/dev installations without it.
export function trackRecommendationEvent(
	event: "product_recommendation_shown" | "product_recommendation_clicked",
	metadata: RecommendationEventMetadata
) {
	if (typeof window === "undefined" || !window._paq) return;
	window._paq.push(["trackEvent", "Product Recommendation", event, JSON.stringify(metadata)]);
}

export function trackRecommendationShownOnce(key: string, metadata: RecommendationEventMetadata) {
	if (shown.has(key)) return;
	shown.add(key);
	trackRecommendationEvent("product_recommendation_shown", metadata);
}
