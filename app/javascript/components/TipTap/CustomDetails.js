import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";

export default [
  Details.configure({
    persist: true,
    openClassName: "details-open",
    HTMLAttributes: {
      class: "details"
    }
  }),
  DetailsSummary.configure(({
    HTMLAttributes: {
      class: "details-summary"
    }
  })),
  DetailsContent.configure({
    HTMLAttributes: {
      class: "details-content"
    }
  }),
];
