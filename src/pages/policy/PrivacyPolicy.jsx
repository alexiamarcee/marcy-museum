import { useTranslation } from "react-i18next";
import "./Policy.css";

function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <div className="legal-page">
      <h1>{t("privacy.title")}</h1>
      <p>{t("privacy.intro")}</p>
      <h2>{t("privacy.h1")}</h2>
      <p>{t("privacy.p1")}</p>
      <h2>{t("privacy.h2")}</h2>
      <p>{t("privacy.p2")}</p>
    </div>
  );
}

export default PrivacyPolicy;