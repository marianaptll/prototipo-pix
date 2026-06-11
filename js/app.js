/* =========================================================
   App bootstrap
   ========================================================= */

(function init() {
  // Restaurar sessão ou setar persona padrão (protótipo sem login)
  State.restore();
  if (!State.persona) State.setPersona(PERSONAS[0]);

  // Garante hash inicial (ignora #/login se já tem persona)
  if (!location.hash || location.hash === '#/login') location.hash = '#/' + Router._homeRoute();

  // Início do roteador
  Router.start();
})();
