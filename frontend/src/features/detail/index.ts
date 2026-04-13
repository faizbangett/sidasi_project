export { DetailPage } from "./pages/DetailPage";
export { DetailHeaderSummary } from "./components/DetailHeaderSummary";
export { DetailLoadingPanel } from "./components/DetailLoadingPanel";
export { DetailPdfPlaceholder } from "./components/DetailPdfPlaceholder";
export { DetailRevisionList } from "./components/DetailRevisionList";
export { DetailSplitView } from "./components/DetailSplitView";
export { DetailStatePanel } from "./components/DetailStatePanel";
export { useDetailValidationFlow } from "./hooks/useDetailValidationFlow";
export {
  DetailNotFoundError,
  fetchValidationDetail,
  isDetailNotFoundError,
} from "./services/detail.api";
export type {
  DetailFileMode,
  DetailValidationRecord,
  DetailValidationRevision,
} from "./services/detail.api";
