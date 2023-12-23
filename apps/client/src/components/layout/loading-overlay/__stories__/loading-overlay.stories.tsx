import { LoadingOverlayContext } from "@/provider/loading-overlay";
import { Meta } from "@storybook/react";
import { LoadingOverlay } from "..";

const meta = {
	title: "Component/Layout/LoadingOverlay",
} satisfies Meta;

export default meta;

export const Overview = () => (
	<LoadingOverlayContext.Provider
		value={{ isLoading: true, setIsLoading: () => {} }}
	>
		<LoadingOverlay />
	</LoadingOverlayContext.Provider>
);
