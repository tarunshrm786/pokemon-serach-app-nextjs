import Link from 'next/link';

export default function Breadcrumb({ pokemonName }) {
  return (
    <div className="mb-4 text-sm">
      <Link href="/">Home</Link> {' > '} 
      <span className="capitalize">{pokemonName}</span>
    </div>
  );
}
