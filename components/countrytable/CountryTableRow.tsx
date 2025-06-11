"use client";

type Props = {
    
  country: string;
  key: string;
  phase: string;
  shape: string;
  score: number;
};

export default function CountryTableRow({
  country,
  key: countryCode,
  phase,
  shape,
  score,
}: Props) {
  return (
    <tbody>
      <tr>
        <td>{country}</td>
        <td>{countryCode}</td>
        <td>{phase}</td>
        <td>{shape}</td>
        <td>{score}</td>
      </tr>
    </tbody>
  );
}
