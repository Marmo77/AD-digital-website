/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { ProjectsPage } from "./components/ProjectsPage";
import { ProjectSchema } from "./components/ProjectSchema";
import { CityPage } from "./components/CityPage";
import { Layout } from "./components/layout/Layout";
import { citiesData } from "./data/cities";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="realizacje" element={<ProjectsPage />} />
          <Route path="realizacje/:id" element={<ProjectSchema />} />

          {/* Podstrony lokalne pod frazy "strony internetowe <miasto>" */}
          <Route path=":slug" element={<CityPage />} />

          {/* Krótkie aliasy (/goleniow) przekierowują na adres z frazą kluczową,
              żeby nie tworzyć dwóch adresów z tą samą treścią */}
          {citiesData.map((city) => (
            <Route
              key={city.shortSlug}
              path={city.shortSlug}
              element={<Navigate to={`/${city.slug}`} replace />}
            />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
