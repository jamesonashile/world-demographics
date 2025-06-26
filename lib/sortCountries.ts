type SortDirection = "ascend" | "descend";

type Demographics = {
    name: string;
    code: string;
    dividendPhase: string;
    demographicShape: string;
    policyScore: number;
  };

  type Sort = {
    column: keyof Demographics;
    scend: SortDirection
  }

  export function sortCountries(countries: Demographics[], sort: Sort): Demographics[]{
    const cloned = [...countries];
    const {column, scend} = sort;

    cloned.sort((a, b) => {
        const valA = a[column].toString();
        const valB = b[column].toString();
        return scend === "ascend" ? valA.localeCompare(valB, undefined, {sensitivity: "base"}) : valB.localeCompare(valA, undefined, {sensitivity: "base"})
      });

      return cloned
  }