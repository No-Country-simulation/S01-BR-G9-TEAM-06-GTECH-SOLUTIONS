import { LoginForm } from "../../components/login/LoginForm";
import { LoginPresentation } from "../../components/login/LoginPresentation";

export function Login() {
  return (
    <div className="min-h-screen bg-slate-100">

      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          justify-center
          px-6
          py-10
        "
      >

        <div
          className="
            grid
            w-full
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-2xl
            lg:grid-cols-2
          "
        >

          {/* Apresentação */}
          <LoginPresentation />

          {/* Formulário */}
          <div
            className="
              flex
              items-center
              justify-center
              p-12
            "
          >

            <div className="w-full max-w-md">

              <div className="mb-10 text-center">

                <h2 className="text-4xl font-bold text-slate-800">
                  Bem-vindo
                </h2>

                <p className="mt-3 text-slate-500">
                  Faça login para acessar sua plataforma.
                </p>

              </div>

              <LoginForm />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}