export type ThemePreference = "light" | "dark" | "system";

type ThemeState = {
	preference: ThemePreference;
	isDark: boolean;
};

type ThemeSubscriber = (state: ThemeState) => void;

let currentPreference: ThemePreference = "dark";
const subscribers = new Set<ThemeSubscriber>();

function notify() {
	for (const subscriber of subscribers) {
		subscriber({ preference: "dark", isDark: true });
	}
}

export function subscribeToTheme(subscriber: ThemeSubscriber) {
	subscribers.add(subscriber);
	subscriber({ preference: "dark", isDark: true });

	function unsubscribe() {
		subscribers.delete(subscriber);
	}

	return unsubscribe;
}

function setMetaThemeColor() {
	const metaTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;

	if (!metaTheme) {
		return;
	}

	metaTheme.setAttribute("content", "rgb(26, 36, 50)");
}

function applyDarkClass() {
	const html = document.documentElement;
	html.classList.add("dark");
	setMetaThemeColor();
	notify();
}

export function getThemePreference(): ThemePreference {
	currentPreference = "dark";
	return currentPreference;
}

export function setTheme(_preference: ThemePreference) {
	localStorage.setItem("theme", "dark");
	currentPreference = "dark";
	applyDarkClass();
}

export function switchTheme() {
	setTheme("dark");
}

