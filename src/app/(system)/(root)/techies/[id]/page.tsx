export default function TechiePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <h3>Techie with id - {id} </h3>;
}
