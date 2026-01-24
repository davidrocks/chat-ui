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

<div class="mt-13 grid items-start justify-left gap-6 px-4 md:mt-32">
    <div class="flex flex-col select-none items-start text-3xl font-bold md:text-4xl">
   
        <h3 class="font-thin tracking-tight text-gray-900 dark:text-white ">
            Pretty Smells Chat Demo
        </h3>
    </div>

    <div class="max-w-2xl space-y-6 text-left my-2">
        <div>
            <p class="text-gray-600 dark:text-gray-300">
                "I want a scent like summer in Bali".
            </p>            

            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                All recommended fragrances are in stock and available for immediate delivery from our store.
            </p>
        </div>
    </div>
</div>