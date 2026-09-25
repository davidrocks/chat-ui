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

<div class="justify-left mt-6 grid items-start gap-5 px-0 md:mt-24">
	<div class="max-w-2xl space-y-5 text-left">
		<div class="space-y-3">
			<h1
				class="text-3xl font-thin leading-[1.05] tracking-tight text-gray-900 dark:text-white md:text-4xl"
			>
				Find your next fragrance
			</h1>

			<p class="text text-gray-900 dark:text-gray-300">
				Tell us what you like, upload a photo of your collection, or choose a prompt below. We'll
				recommend fragrances that match your taste.
			</p>

			<p class="text-sm text-gray-600 dark:text-gray-400">
				<strong class="font-semibold text-gray-700 dark:text-gray-300">Using a photo?</strong> For the
				best results, photograph bottles from the front with labels visible and as little overlap as
				possible.
			</p>

			<p class="text-sm text-gray-500 dark:text-gray-500">
				Browse the full range in our
				<a
					class="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300"
					href="https://www.prettysmellslab.com">store</a
				>.
			</p>
		</div>
	</div>
</div>
