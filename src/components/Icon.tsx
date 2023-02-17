interface Props {
  i: string;
}

export default function Icon({ i }: Props) {
  return (
    <span
      className="material-symbols-sharp icon"
      style={{ userSelect: "none" }}
    >
      {i}
    </span>
  );
}
