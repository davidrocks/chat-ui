<script lang="ts">
	import MarkdownRenderer from "./MarkdownRenderer.svelte";
	import ProductRecommendationCard from "./ProductRecommendationCard.svelte";
	import { recommendationBlocks } from "$lib/utils/recommendationCards";

	interface Props {
		content: string;
		loading?: boolean;
		conversationId?: string;
		messageId: string;
	}

	let { content, loading = false, conversationId, messageId }: Props = $props();
	let blocks = $derived(recommendationBlocks(content));
</script>

{#each blocks as block, index (`${index}-${block.type === "recommendation" ? block.recommendation.productUrl : block.content}`)}
	{#if block.type === "recommendation"}
		<ProductRecommendationCard recommendation={block.recommendation} {conversationId} {messageId} />
	{:else}
		<MarkdownRenderer content={block.content} {loading} />
	{/if}
{/each}
