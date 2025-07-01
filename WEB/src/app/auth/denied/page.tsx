import Link from "@/lib/next/link";

function Denied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Aceso restringido</h1>
        <p className="mb-4 text-gray-600">
          No cuentas con las permisos para acceder a esta pagina.
        </p>
        <Link className="text-blue-500 hover:underline" href="/">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Denied;
