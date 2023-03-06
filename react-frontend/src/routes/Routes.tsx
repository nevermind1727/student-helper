import { Routes as ReactRoutes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
import HomePage from "../pages/HomePage";
import EssayGeneratorPage from "../pages/services/EssayGeneratorPage";
import GrammarCorrectionPage from "../pages/services/GrammarCorrectionPage";
import StudyNotesCreatorPage from "../pages/services/StudyNotesCreatorPage";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <>
      <Navbar />
      <ReactRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth">
          <Route path="/auth/signUp" element={<SignUpPage />} />
          <Route path="/auth/signIn" element={<SignInPage />} />
        </Route>
        <Route path="/services">
          <Route
            path="/services/studyNotesCreator"
            element={
              <ProtectedRoute>
                <StudyNotesCreatorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/grammarCorrection"
            element={
              <ProtectedRoute>
                <GrammarCorrectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/essayGenerator"
            element={
              <ProtectedRoute>
                <EssayGeneratorPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </ReactRoutes>
    </>
  );
};

export default Routes;
