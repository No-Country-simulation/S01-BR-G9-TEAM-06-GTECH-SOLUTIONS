import { SignupForm } from "../../components/signup/SignupForm";
import { LoginPresentation } from "../../components/login/LoginPresentation";

export function Signup() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
          <LoginPresentation />

          <div className="flex items-center justify-center p-12">
            <div className="w-full max-w-md">
              <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-slate-800">
                  Criar conta
                </h1>

                <p className="mt-3 text-slate-500">
                  Cadastre-se para acessar o IntelliWatts.
                </p>
              </div>

              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}