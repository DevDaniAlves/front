import React from "react";
import "./login.css";

function Login()  {
  return (
    <div className="login-page">
      <div className="div">
        <div className="login">
          <div className="overlap">
            <div className="boto">
              <div className="overlap-group">
                <div className="text-wrapper">Login</div>
              </div>
            </div>
            <div className="field">
              <div className="overlap-2">
                <div className="rectangle" />
                <div className="titulo-field">
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">Senha</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overlap-wrapper">
              <div className="overlap-2">
                <div className="rectangle" />
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-2">
                    <div className="text-wrapper-2">Usuário</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-wrapper-3">Faça Login</div>
          </div>
        </div>
        <div className="app-bar">
          <div className="overlap-3">
            <div className="text-wrapper-4">Seja Bem Vindo!!</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login