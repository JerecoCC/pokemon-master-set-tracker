import { useMemo } from "react";
import Select from "../../../components/Select";
import { SelectOption } from "../../../types";

type Props = {
  value: number;
  onChange: (value: any) => void;
}

const CardsPerPageSelect = (props: Props) => {
  const {value, onChange} = props;

  const cardsPerPages: number[] = [4, 9, 12, 16];

  const cardsPerPageOptions: SelectOption[] = useMemo(() => (
    cardsPerPages.map((cardsPerPage: number) => ({
      label: `${cardsPerPage} per page`,
      value: cardsPerPage
    } as SelectOption))
  ), [cardsPerPages])

  return (
    <Select
      className="cards-per-page"
      options={cardsPerPageOptions}
      value={value}
      onChange={onChange}
    />
  )
}

export default CardsPerPageSelect;