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
                Our AI identifies unique patterns across your favorite fragrances to build a personalized scent profile.
            </p>

            <p class="text-gray-600 dark:text-gray-300 mt-4">
                Tell us which products you love, or describe the specific notes you're looking for. 
            </p>

            <p class="text-gray-600 dark:text-gray-300 italic opacity-80 mt-4">
                Coming soon: Upload a photo of your collection, and we'll instantly analyze your library to find your next signature scent.
            </p>
        </div>
    </div>
</div>