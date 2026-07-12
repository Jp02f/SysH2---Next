export function getIniciais(nome: string) {
  const partes = nome.trim().split(' ').filter(Boolean);
  const primeira = partes[0]?.[0] || '';
  const segunda = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + segunda).toUpperCase();
}