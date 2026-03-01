import { useTranslation } from "react-i18next";
import "./Policy.css";

function Terms() {
  const { t } = useTranslation();
  return (
    <div className="legal-page">
      <h1>{t("terms.title")}</h1>
      <p>{t("terms.intro")}</p>
      <h2>{t("terms.h1")}</h2>
      <p>{t("terms.p1")}</p>
      <h2>{t("terms.h2")}</h2>
      <p>{t("terms.p2")}</p>
      <h2>{t("terms.h3")}</h2>
      <p>{t("terms.p3")}</p>
      <h2>{t("terms.h4")}</h2>
      <p>{t("terms.p4")}</p>
      <h2>{t("terms.h5")}</h2>
      <p>{t("terms.p5")}</p>
      <h2>{t("terms.h6")}</h2>
      <p>{t("terms.p6")}</p>
      <p>{t("terms.contact")}</p>
    </div>
  );
}

export default Terms;