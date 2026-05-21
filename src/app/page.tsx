import GerenciarPorteiros from "@/components/sindica/GerenciarPorteiros";

// ADICIONE ESTE BLOCO AQUI:
export const metadata = {
  title: "Gerenciar Porteiros", // Se o seu layout global já estiver configurado, vai aparecer "Home | SysH2" na aba
};

export default function Home() {
  return (
    <GerenciarPorteiros />
  );
}