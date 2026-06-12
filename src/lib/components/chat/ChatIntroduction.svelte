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
        <h1 class="font-thin tracking-tight text-gray-900 dark:text-white text-6xl md:text-6xl leading-[1.05]">
            The Pretty<br>
            Smells Lab
        </h1>
    </div>

    <div class="max-w-2xl space-y-2 text-left">
        <div>
            <p class="text text-gray-900 dark:text-gray-300 py-1">
               Upload an image of your scents, or tell us what you like, and our AI will match you with new scents.
            </p>            

            <p class="text text-gray-600 dark:text-gray-300 py-2">
                All recommended fragrances are in stock and available for immediate delivery from from <a href="https://www.prettysmellslab.com" style="text-decoration: underline;" >our store</a>.
            </p>
        </div>

                  
    </div>
</div>