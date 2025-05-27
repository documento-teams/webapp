import DocumentEditor from "@/components/editor/documentEditor";
import LanguageSelector from "../../../components/common/LanguageSelector";

const DocumentEditorView = () => {
  return (
    <>
      <LanguageSelector />
      <DocumentEditor />
    </>
  );
};

export default DocumentEditorView;
