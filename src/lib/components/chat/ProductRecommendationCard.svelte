<script lang="ts">
	import { onMount } from "svelte";
	import MarkdownRenderer from "./MarkdownRenderer.svelte";
	import type { ProductRecommendation } from "$lib/utils/recommendationCards";
	import {
		trackRecommendationEvent,
		trackRecommendationShownOnce,
	} from "$lib/utils/recommendationAnalytics";

	interface Props {
		recommendation: ProductRecommendation;
		conversationId?: string;
		messageId: string;
	}

	let { recommendation, conversationId, messageId }: Props = $props();
	const metadata = (
		source?: "product_image" | "product_title" | "primary_cta" | "secondary_profile_link"
	) => ({
		productHandle: recommendation.productHandle,
		productName: recommendation.title,
		conversationId,
		source,
		bestMatch: false,
	});

	onMount(() => {
		trackRecommendationShownOnce(
			`${conversationId ?? "unknown"}:${messageId}:${recommendation.productUrl}`,
			metadata()
		);
	});
</script>

<article
	class="not-prose my-4 max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
>
	<a
		href={recommendation.productUrl}
		data-product-recommendation-image
		aria-label={`View ${recommendation.title} sizes, price and availability`}
		onclick={() =>
			trackRecommendationEvent("product_recommendation_clicked", metadata("product_image"))}
	>
		<img
			class="aspect-square w-full object-cover"
			src={recommendation.imageUrl}
			alt={recommendation.imageAlt || recommendation.title}
		/>
	</a>
	<div class="space-y-3 p-4">
		<a
			href={recommendation.productUrl}
			class="block text-base font-semibold text-gray-900 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-100"
			onclick={() =>
				trackRecommendationEvent("product_recommendation_clicked", metadata("product_title"))}
		>
			{recommendation.title}
		</a>
		<div class="prose prose-sm max-w-none text-gray-600 dark:prose-invert dark:text-gray-300">
			<MarkdownRenderer content={recommendation.description} />
		</div>
		<div class="flex flex-col items-start gap-2">
			<a
				href={recommendation.productUrl}
				class="inline-flex min-h-11 items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
				onclick={() =>
					trackRecommendationEvent("product_recommendation_clicked", metadata("primary_cta"))}
			>
				View sizes &amp; price
			</a>
			<a
				href={recommendation.productUrl}
				class="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-300 dark:hover:text-white"
				onclick={() =>
					trackRecommendationEvent(
						"product_recommendation_clicked",
						metadata("secondary_profile_link")
					)}
			>
				See full scent profile
			</a>
		</div>
	</div>
</article>
