interface Props {
  i: string;
}

export default function Icon({ i }: Props) {
  return (
    <span className="material-symbols-sharp icon notranslate" style={{ userSelect: "none" }}>
      {i}
    </span>
  );
}
