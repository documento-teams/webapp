import AllDocumentsList from "@/components/allDocumentList";
import LanguageSelector from "../../../components/common/LanguageSelector";

const DocumentsView = () => {
  return (
    <>
      <LanguageSelector />
      <div className="container mx-auto px-4 py-8">
        <AllDocumentsList />
      </div>
    </>
  );
};

export default DocumentsView;