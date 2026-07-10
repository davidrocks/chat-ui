<script lang="ts">
	import type { Model } from "$lib/types/Model";

	interface Props {
		currentModel: Model;
		onmessage?: (content: string) => void;
	}

	let { currentModel: _currentModel, onmessage }: Props = $props();

	$effect(() => {
		void _currentModel;
		void onmessage;
	});
</script>

<div class="mt-6 grid items-start justify-left gap-5 px-0 md:mt-24">
	<div class="max-w-2xl space-y-5 text-left">
		<div class="space-y-3">
			<h1 class="font-thin tracking-tight text-gray-900 dark:text-white text-3xl md:text-4xl leading-[1.05]">
				Find your next fragrance
			</h1>

			<p class="text text-gray-900 dark:text-gray-300">
				Tell us what you like, upload a photo of your collection, or choose a prompt below. We'll recommend fragrances that match your taste and are ready to order from 
                <a href="https://www.prettysmellslab.com" style="text-decoration: underline;">our store</a>.
			</p>
		</div>

	</div>
</div>