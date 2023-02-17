import Image from "next/image";

export default function IceCreamContent() {
  return (
    <>
      <p>
        Oh hi, nice thing you found this! Well, since you&apos;re here, take an
        ice cream.
      </p>
      <Image
        width={500}
        height={500}
        objectFit="contain"
        src="/images/ice-cream.jpg"
        alt="Picture of an ice cream."
      />
      <p>I hope you like it! :)</p>
    </>
  );
}
