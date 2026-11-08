import posthog from "posthog-js";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

let isInitialized = false;

export function initPostHog(): void {
  if (isInitialized || typeof window === "undefined") return;

  if (!posthogKey || !posthogHost) {
    if (import.meta.env.DEV) {
      const missingVariable = !posthogKey ? "VITE_POSTHOG_KEY" : "VITE_POSTHOG_HOST";
      console.error(
        new Error(
          `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
        )
      );
    }
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    logs: {
      serviceName: "hudbird-docs",
      environment: import.meta.env.MODE,
    },
  });
  isInitialized = true;
}

export const posthogLogger = {
  info(message: string, attributes: Record<string, string>): void {
    if (!isInitialized) return;
    posthog.logger.info(message, attributes);
  },
};

export { posthog };
