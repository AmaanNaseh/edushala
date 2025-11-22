import { useEffect } from "react";

export default function GTranslator({ language, setLanguage }) {
  useEffect(() => {
    const scriptId = "google-translate-script";

    // Load Google Translate script only once
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    // Global callback for Google Translate
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  const switchLanguage = (target) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = target;
      select.dispatchEvent(new Event("change"));
      setLanguage(target);
    }
  };

  return (
    <div className="text-center">
      {/* Hidden Google widget container */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Same UI you provided */}
      <div className="flex text-sm md:text-lg border rounded-lg overflow-hidden">
        <button
          onClick={() => switchLanguage("en")}
          className={`p-2 font-medium text-sm transition-colors duration-200 ${
            language === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          EN
        </button>

        <button
          onClick={() => switchLanguage("hi")}
          className={`p-2 font-medium text-sm transition-colors duration-200 ${
            language === "hi"
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          हिन्दी
        </button>
      </div>
    </div>
  );
}
