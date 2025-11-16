import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;

    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="fixed top-3 right-3 z-50" aria-label="Language selector">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="rounded-md border px-2 py-1 text-sm bg-white/70 backdrop-blur-md shadow-sm"
      >
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
