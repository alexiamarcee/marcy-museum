import { useTranslation } from "react-i18next";
import "./Policy.css";

function CookiesPolicy() {
  const { t } = useTranslation();
  return (
    <div className="legal-page">
      <h1>{t("cookies.title")}</h1>
      <p>{t("cookies.intro")}</p>
      <h2>{t("cookies.h1")}</h2>
      <p>{t("cookies.p1")}</p>
      <h2>{t("cookies.h2")}</h2>
      <p>{t("cookies.p2")}</p>
      <h2>{t("cookies.h3")}</h2>
      <p>{t("cookies.p3")}</p>
      <h2>{t("cookies.h4")}</h2>
      <p>{t("cookies.p4")}</p>
      <h2>{t("cookies.h5")}</h2>
      <p>{t("cookies.p5")}</p>
      <p>{t("cookies.contact")}</p>
    </div>
  );
}

export default CookiesPolicy;