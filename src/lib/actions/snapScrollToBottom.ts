import { navigating } from "$app/state";
import { tick } from "svelte";

// Threshold to determine if user is "at bottom" - larger value prevents false detachment
const BOTTOM_THRESHOLD = 50;
const USER_SCROLL_DEBOUNCE_MS = 150;
const PROGRAMMATIC_SCROLL_GRACE_MS = 100;
const TOUCH_DETACH_THRESHOLD_PX = 10;

interface ScrollDependency {
	signal: unknown;
	forceReattach?: number;
}

type MaybeScrollDependency = ScrollDependency | unknown;

const getForceReattach = (value: MaybeScrollDependency): number => {
	if (typeof value === "object" && value !== null && "forceReattach" in value) {
		return (value as ScrollDependency).forceReattach ?? 0;
	}
	return 0;
};

/**
 * Auto-scroll action that snaps to bottom while respecting user scroll intent.
 *
 * Key behaviors:
 * 1. Uses wheel/touch events to detect actual user intent
 * 2. Uses IntersectionObserver on a sentinel element to reliably detect "at bottom" state
 * 3. Larger threshold to prevent edge-case false detachments
 *
 * @param node element to snap scroll to bottom
 * @param dependency pass in { signal, forceReattach } - signal triggers scroll updates,
 *                   forceReattach (counter) forces re-attachment when incremented
 */
export const snapScrollToBottom = (node: HTMLElement, dependency: MaybeScrollDependency) => {
	// --- State ----------------------------------------------------------------

    return;
    


	let intersectionObserver: IntersectionObserver | undefined;
	let sentinel: HTMLDivElement | undefined;


	async function updateScroll(newDependency?: MaybeScrollDependency) {
		// 1. Explicit force re-attach
		if (newDependency && (await handleForceReattach(newDependency))) {
			return;
		}

		// 2. Don't scroll if user has detached and we're not navigating
		if (isDetached && !navigating.to) return;

		// 3. Don't scroll if user is actively scrolling
		if (userScrolling) return;

		// 4. Early return if already at bottom and no content change (perf optimization for streaming)
		const currentHeight = node.scrollHeight;
		if (isAtBottom() && currentHeight === lastScrollHeight) {
			return;
		}
		lastScrollHeight = currentHeight;

		// 5. Wait for DOM to update, then scroll and settle after layout shifts
		await tick();
		scrollToBottom();
		await settleScrollAfterLayout();
	}

};
