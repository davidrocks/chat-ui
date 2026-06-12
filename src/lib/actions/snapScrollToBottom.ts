import { navigating } from "$app/state";
import { tick } from "svelte";

// Threshold to determine if user is "at bottom" - larger value prevents false detachment
const BOTTOM_THRESHOLD = 50;
const USER_SCROLL_DEBOUNCE_MS = 150;
const PROGRAMMATIC_SCROLL_GRACE_MS = 100;
const TOUCH_DETACH_THRESHOLD_PX = 10;

interface ScrollDependency {
	forceReattach?: number;
	scrollBehavior?: ScrollBehavior;
}

type MaybeScrollDependency = ScrollDependency | unknown;

const getForceReattach = (value: MaybeScrollDependency): number => {
	if (typeof value === "object" && value !== null && "forceReattach" in value) {
		return (value as ScrollDependency).forceReattach ?? 0;
	}
	return 0;
};

const getScrollBehavior = (value: MaybeScrollDependency): ScrollBehavior => {
	if (typeof value === "object" && value !== null && "scrollBehavior" in value) {
		return (value as ScrollDependency).scrollBehavior ?? "instant";
	}
	return "instant";
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
 * @param dependency pass in { forceReattach } - forceReattach (counter) forces
 *                   scroll to bottom when incremented (e.g. user sends a new message)
 */
export const snapScrollToBottom = (node: HTMLElement, dependency: MaybeScrollDependency) => {
	// --- State ----------------------------------------------------------------

    return ;



};
