<script lang="ts">
	import Logo from "$lib/components/icons/Logo.svelte";
	import type { Model } from "$lib/types/Model";
	import { usePublicConfig } from "$lib/utils/PublicConfig.svelte";

	const publicConfig = usePublicConfig();

	interface Props {
		currentModel: Model;
		onmessage?: (content: string) => void;
	}

	let { currentModel: _currentModel, onmessage }: Props = $props();

	$effect(() => {
		// referenced to appease linter while UI blocks are commented out
		void _currentModel;
		void onmessage;
	});
</script>

<div class="mt-13 grid items-start justify-left gap-6 px-0 md:mt-32">

    <div class="flex flex-col select-none items-start">
        <h1 class="font-thin tracking-tight text-gray-900 dark:text-white text-4xl md:text-4xl leading-[1.05]">
            The Pretty<br>
            Smells Lab
        </h1>
    </div>
            <div class="max-w-2xl space-y-4 text-left">
                <p class="text text-gray-900 dark:text-gray-300">
                    <strong>Tell us what you want:</strong> Use the box below to describe what you are looking for, or tell us about a fragrance you already love.
                </p>

                <p class="text text-gray-900 dark:text-gray-300">
                    <strong>Try an example question:</strong> Choose one of the examples below, then press send to get started.
                </p>

                <p class="text text-gray-900 dark:text-gray-300">
                    <strong>Upload an image:</strong> Take a photo of your fragrance collection and our AI will identify your scents, understand your taste, and recommend what to try next.
                </p>

                <p class="text text-gray-900 dark:text-gray-300">
                    <strong>Shop our recommendations:</strong> Every fragrance we recommend is in stock and ready to order from <a href="https://www.prettysmellslab.com" style="text-decoration: underline;">our store</a>.
                </p>


            </div>
</div>