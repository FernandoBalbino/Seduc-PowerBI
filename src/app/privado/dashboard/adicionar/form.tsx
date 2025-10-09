"use client";
import { LayoutDashboard, Building2, Link } from "lucide-react";
type Setores = string[];
import { useActionState, useEffect } from "react";
import { mutate } from "swr";
import createDashboard from "./create";

export default function AdicionarDashForm({ setores }: { setores: Setores }) {
  const itens = setores;

  const [state, formAction, isPending] = useActionState(createDashboard, null);
  useEffect(() => {
    if (state?.success && state?.dashboard?.sector) {
      mutate(["dashboards", state.dashboard.sector]);

      mutate((key) => Array.isArray(key) && key[0] === "dashboards");
    }
  }, [state?.success, state?.dashboard?.sector]);
  return (
    <div className="bg-gradient-to-br mt-8 from-gray-50 to-gray-100 w-full min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Criar Dashboard
          </h1>
          <p className="text-gray-600">Adicione um novo dashboard ao sistema</p>
        </div>

        {/* Form Card - ADICIONE action={formAction} */}
        <form
          action={formAction}
          className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-50 rounded-full -ml-24 -mb-24 opacity-50"></div>

          <div className="relative z-10 space-y-6">
            {/* Nome do Dashboard */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <LayoutDashboard className="w-4 h-4 mr-2 text-blue-600" />
                Nome do Dashboard
              </label>
              <input
                type="text"
                required
                name="nome"
                placeholder="Ex: Dashboard de Vendas"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Setor */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4 mr-2 text-purple-600" />
                Setor
              </label>
              <select
                required
                name="setor"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                {itens.map((i) => {
                  return (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* URL do Looker Studio */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Link className="w-4 h-4 mr-2 text-green-600" />
                URL do Dashboard (Looker Studio)
                <span className="ml-2 text-xs font-normal text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Obrigatório
                </span>
              </label>
              <input
                type="url"
                name="url"
                required
                placeholder="https://lookerstudio.google.com/..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cole aqui a URL pública do seu dashboard do Looker Studio
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isPending ? "Criando..." : "Criar Dashboard"}
            </button>

            {/* Mensagens de feedback */}
            {state?.success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                ✓ Dashboard criado com sucesso!
              </div>
            )}
            {state?.error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                ✗ {state.error}
              </div>
            )}
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Dica
          </h4>
          <p className="text-sm text-blue-800">
            Certifique-se de que a URL do Looker Studio está configurada como
            pública antes de adicionar ao sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
