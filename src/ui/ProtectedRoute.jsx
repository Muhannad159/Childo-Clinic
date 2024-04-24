/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  // Cannot be called in the top level code only useEffect or a callback
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3. if there is no authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/HomePage");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
