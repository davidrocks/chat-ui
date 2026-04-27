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

    return;
    


	let intersectionObserver: IntersectionObserver | undefined;
	let sentinel: HTMLDivElement | undefined;

	// --- Helpers --------------------------------------------------------------

	const clearUserScrollTimeout = () => {
		if (userScrollTimeout) {
			clearTimeout(userScrollTimeout);
			userScrollTimeout = undefined;
		}
	};

	const distanceFromBottom = () => node.scrollHeight - node.scrollTop - node.clientHeight;

	const isAtBottom = () => distanceFromBottom() <= BOTTOM_THRESHOLD;

	const scrollToBottom = (behavior: ScrollBehavior = "instant") => {
		isProgrammaticScroll = true;
		lastProgrammaticScrollTime = Date.now();

		node.scrollTo({ top: node.scrollHeight, behavior });

		if (typeof requestAnimationFrame === "function") {
			requestAnimationFrame(() => {
				isProgrammaticScroll = false;
			});
		} else {
			isProgrammaticScroll = false;
		}
	};

	const scheduleUserScrollEndCheck = () => {
		userScrolling = true;
		clearUserScrollTimeout();

		userScrollTimeout = setTimeout(() => {
			userScrolling = false;

			// If user scrolled back to bottom, re-attach
			if (isAtBottom()) {
				isDetached = false;
			}
		}, USER_SCROLL_DEBOUNCE_MS);
	};

	const createSentinel = () => {
		sentinel = document.createElement("div");
		sentinel.style.height = "1px";
		sentinel.style.width = "100%";
		sentinel.setAttribute("aria-hidden", "true");
		sentinel.setAttribute("data-scroll-sentinel", "");

		// Find the content container (first child) and append sentinel there
		const container = node.firstElementChild;
		if (container) {
			container.appendChild(sentinel);
		} else {
			node.appendChild(sentinel);
		}
	};

	const setupIntersectionObserver = () => {
		if (typeof IntersectionObserver === "undefined" || !sentinel) return;

		intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				// If sentinel is visible and user isn't actively scrolling, we're at bottom
				if (entry?.isIntersecting && !userScrolling) {
					isDetached = false;
				}
			},
			{
				root: node,
				threshold: 0,
				rootMargin: `0px 0px ${BOTTOM_THRESHOLD}px 0px`,
			}
		);

		intersectionObserver.observe(sentinel);
	};

	const setupResizeObserver = () => {
		if (typeof ResizeObserver === "undefined") return;

		const target = node.firstElementChild ?? node;
		resizeObserver = new ResizeObserver(() => {
			// Don't auto-scroll if user has detached and we're not navigating
			if (isDetached && !navigating.to) return;
			// Don't interrupt active user scrolling
			if (userScrolling) return;

			scrollToBottom();
		});

		resizeObserver.observe(target);
	};

	// --- Action update logic --------------------------------------------------

	const handleForceReattach = async (newDependency: MaybeScrollDependency) => {
		const forceReattach = getForceReattach(newDependency);

		if (forceReattach > lastForceReattach) {
			lastForceReattach = forceReattach;
			isDetached = false;
			userScrolling = false;
			clearUserScrollTimeout();

			await tick();
			scrollToBottom(getScrollBehavior(newDependency));
			return true;
		}

		return false;
	};

	async function updateScroll(newDependency?: MaybeScrollDependency) {
		if (newDependency) {
			await handleForceReattach(newDependency);
		}
	}

};
