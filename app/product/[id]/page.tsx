export default function Page({ params }: { params: { id: string } }) {
  return <div>Product Detail — ID: {params.id}</div>;
}
